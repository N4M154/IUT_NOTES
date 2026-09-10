from neo4j import GraphDatabase
import os, csv

NEO4J_URI      = "neo4j://127.0.0.1:7687"
NEO4J_USER     = "neo4j"
NEO4J_PASSWORD = "password123"   # password you set when creating instance
CPG_FOLDER     = r"C:/Users/Dell/Desktop/joern-cli/joern-cli/cpg_export"

driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))

def get_type(value):
    try: return int(value)
    except:
        try: return float(value)
        except: return value

def clean_row(row):
    return {k: get_type(v) for k, v in row.items() if v != ""}

def read_csv(filepath):
    with open(filepath, newline='', encoding='utf-8', errors='ignore') as f:
        return list(csv.DictReader(f))

def fix_headers(filepath):
    with open(filepath, encoding='utf-8', errors='ignore') as f:
        content = f.read()
    if not content.strip():
        return False
    lines = content.splitlines()
    headers = lines[0].split(',')
    new_headers = []
    seen = {}
    for i, h in enumerate(headers):
        h = h.strip().strip('"')
        if not h:
            h = f'col_{i}'
        if h in seen:
            seen[h] += 1
            h = f'{h}_{seen[h]}'
        else:
            seen[h] = 0
        new_headers.append(h)
    lines[0] = ','.join(new_headers)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lines))
    return True

def import_nodes(label, data_file):
    if not fix_headers(data_file):
        return 0
    rows = read_csv(data_file)
    if not rows: return 0
    with driver.session() as session:
        for row in rows:
            props = clean_row(row)
            if not props: continue
            props_str = ", ".join([f"n.`{k}` = ${k}" for k in props])
            if 'id' in props:
                query = f"MERGE (n:`{label}` {{`id`: $id}}) SET {props_str}"
            else:
                query = f"CREATE (n:`{label}`) SET {props_str}"
            session.run(query, **props)
    return len(rows)

def import_edges(rel_type, data_file):
    if not fix_headers(data_file):
        return 0
    rows = read_csv(data_file)
    if not rows: return 0
    with driver.session() as session:
        for row in rows:
            props = clean_row(row)
            src = props.pop(':START_ID', None) or props.pop('start', None)
            dst = props.pop(':END_ID', None) or props.pop('end', None)
            if src is None or dst is None:
                keys = list(row.keys())
                src = get_type(row[keys[0]])
                dst = get_type(row[keys[1]])
            props_str = ""
            if props:
                props_str = "{" + ", ".join([f"`{k}`: ${k}" for k in props]) + "}"
            query = f"""
                MATCH (a {{`id`: $src}})
                MATCH (b {{`id`: $dst}})
                MERGE (a)-[r:`{rel_type}` {props_str}]->(b)
            """
            session.run(query, src=src, dst=dst, **props)
    return len(rows)

# ── Clear existing data first ──
print("Clearing existing database...")
with driver.session() as session:
    session.run("MATCH (n) DETACH DELETE n")
print("✓ Cleared\n")

all_files = sorted(os.listdir(CPG_FOLDER))
node_files = [f for f in all_files if f.startswith("nodes_") and f.endswith("_data.csv")]
edge_files = [f for f in all_files if f.startswith("edges_") and f.endswith("_data.csv")]

print(f"Found {len(node_files)} node types, {len(edge_files)} edge types\n")

print("=== Importing Nodes ===")
for filename in node_files:
    label = filename.replace("nodes_", "").replace("_data.csv", "")
    print(f"  {label} ...", end=" ", flush=True)
    try:
        count = import_nodes(label, os.path.join(CPG_FOLDER, filename))
        print(f"✓ ({count})")
    except Exception as e:
        print(f"✗ {e}")

print("\n=== Importing Edges ===")
for filename in edge_files:
    rel_type = filename.replace("edges_", "").replace("_data.csv", "")
    print(f"  {rel_type} ...", end=" ", flush=True)
    try:
        count = import_edges(rel_type, os.path.join(CPG_FOLDER, filename))
        print(f"✓ ({count})")
    except Exception as e:
        print(f"✗ {e}")

driver.close()
print("\n✅ Done!")