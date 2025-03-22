# from scapy.all import sniff, DNS, DNSQR, IP, UDP
# from scapy.layers.l2 import Ether  # Import Ether for Ethernet layer details
# import socket

# def get_target_ip(domain):
#     try:
#         return socket.gethostbyname(domain)
#     except socket.gaierror:
#         print("[Error] Unable to resolve domain.")
#         return None

# def packet_callback(packet):
#     # Check if the packet is DNS and has the necessary layers
#     if packet.haslayer(DNS):
#         if packet[DNS].qr == 0:  # This means it's a query (not a response)
#             print("###[ Ethernet ]###")
#             print(f"dst = {packet[Ether].dst}")
#             print(f"src = {packet[Ether].src}")
#             print(f"type = {packet[Ether].type}")

#             print("###[ IPv6 ]###")
#             print(f"version = {packet[IP].version}")
#             print(f"tc = {packet[IP].tos}")
#             print(f"fl = {packet[IP].flags}")
#             print(f"plen = {packet[IP].len}")
#             print(f"nh = {packet[IP].proto}")
#             print(f"hlim = {packet[IP].ttl}")
#             print(f"src = {packet[IP].src}")
#             print(f"dst = {packet[IP].dst}")

#             print("###[ UDP ]###")
#             print(f"sport = {packet[UDP].sport}")
#             print(f"dport = {packet[UDP].dport}")
#             print(f"len = {packet[UDP].len}")
#             print(f"chksum = {packet[UDP].chksum}")

#             print("###[ DNS ]###")
#             print(f"id = {packet[DNS].id}")
#             print(f"qr = {packet[DNS].qr}")
#             print(f"opcode = {packet[DNS].opcode}")
#             print(f"aa = {packet[DNS].aa}")
#             print(f"tc = {packet[DNS].tc}")
#             print(f"rd = {packet[DNS].rd}")
#             print(f"ra = {packet[DNS].ra}")
#             print(f"z = {packet[DNS].z}")
#             print(f"ad = {packet[DNS].ad}")
#             print(f"cd = {packet[DNS].cd}")
#             print(f"rcode = {packet[DNS].rcode}")
#             print(f"qdcount = {packet[DNS].qdcount}")
#             print(f"qname = {packet[DNSQR].qname.decode()}")

#             return True  # Stops after receiving one DNS packet

# if __name__ == "__main__":
#     target_domain = "nostarch.com"
#     target_ip = get_target_ip(target_domain)

#     if target_ip:
#         print(f"[+] Sniffing packets for {target_domain} ({target_ip})...")

#         # Start sniffing for DNS traffic
#         sniff(filter="udp and port 53", prn=packet_callback, store=0, count=1)  # Stop after one packet
#     else:
#         print("[Error] Exiting script.")


from scapy.all import sniff, IP
import socket

# Function to get the IP address of google.com
def get_target_ip(domain):
    try:
        return socket.gethostbyname(domain)
    except socket.gaierror:
        print("[Error] Unable to resolve domain.")
        return None

# Callback function to handle sniffed packets
def packet_callback(packet, target_ip):
    if IP in packet:
        # Check if the packet's source IP matches google.com IP
        if packet[IP].src == target_ip:
            print(packet.show())  # Show the packet details

# Main function to start sniffing
def main():
    target_domain = "nostarch.com"
    target_ip = get_target_ip(target_domain)

    if target_ip:
        print(f"[+] Sniffing packets from {target_domain} ({target_ip})...")
        sniff(filter=f"ip src {target_ip}", prn=lambda packet: packet_callback(packet, target_ip), store=0, count=1)  # Capture only one packet
    else:
        print("[Error] Exiting script.")

if __name__ == '__main__':
    main()