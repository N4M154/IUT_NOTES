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
    target_domain = "nostarch.com" # or google.com
    target_ip = get_target_ip(target_domain)

    if target_ip:
        print(f"[+] Sniffing packets from {target_domain} ({target_ip})...")
        sniff(filter=f"ip src {target_ip}", prn=lambda packet: packet_callback(packet, target_ip), store=0, count=1)  # Capture only one packet
    else:
        print("[Error] Exiting script.")

if __name__ == '__main__':
    main()
    
    
# open a terminal and run : sudo python simple_sniffer.py
# open another terminal and run : nostarch.com || google.com