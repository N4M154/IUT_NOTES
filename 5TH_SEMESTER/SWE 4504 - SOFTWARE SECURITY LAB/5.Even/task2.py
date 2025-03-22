import subprocess
import concurrent.futures

def ping(ip):
    """ Pings the given IP and returns it if the host is active """
    try:
        result = subprocess.run(["ping", "-c", "1", "-W", "1", ip], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if result.returncode == 0:
            return ip
    except Exception as e:
        pass
    return None

def scan_network(subnet):
    """ Scans the given subnet and finds active hosts """
    active_hosts = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=50) as executor:
        futures = {executor.submit(ping, f"{subnet}.{i}"): i for i in range(1, 255)}
        for future in concurrent.futures.as_completed(futures):
            ip = future.result()
            if ip:
                active_hosts.append(ip)

    return active_hosts

if __name__ == "__main__":
    subnet = "192.168.0" # the first three octets of your IP address
    active_hosts = scan_network(subnet)
    print("\nActive Hosts:")
    for host in active_hosts:
        print(host)

# open a terminal and run : sudo python task2.py