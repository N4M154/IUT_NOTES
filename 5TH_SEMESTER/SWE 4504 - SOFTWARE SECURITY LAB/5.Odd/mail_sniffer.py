from scapy.all import sniff
from scapy.layers.inet import TCP
from scapy.layers.l2 import Ether

def packet_callback(packet):
    if packet.haslayer(TCP) and packet[TCP].dport == 25:  # SMTP Port 25
        print("[+] Captured SMTP Packet:")
        print(packet.show())

if __name__ == "__main__":
    print("[+] Sniffing SMTP traffic on Port 25...")
    sniff(filter="tcp port 25", prn=packet_callback, store=0)
