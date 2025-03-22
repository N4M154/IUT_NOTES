import paramiko
import socket
import threading

ssh_host = '192.168.174.124'  # IP of your Kali machine
ssh_user = 'namisa'  # Your Kali Linux username
ssh_password = '123456789'  # Your Kali Linux password
web_server_host = '127.0.0.1'  # Localhost address for web server
web_server_port = 8080  # Web server port
ssh_port = 9090  # Local port for SSH tunnel

client = paramiko.SSHClient()
client.load_system_host_keys()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    # Establish SSH connection
    client.connect(hostname=ssh_host, username=ssh_user, password=ssh_password)
    transport = client.get_transport()

    def forward(local_socket, remote_host, remote_port):
        remote_socket = transport.open_channel(
            'direct-tcpip', (remote_host, remote_port), local_socket.getpeername()
        )
        while True:
            try:
                data = local_socket.recv(1024)
                if len(data) == 0:
                    break
                remote_socket.send(data)
            except Exception as e:
                print(f"Error: {e}")
                break
        local_socket.close()
        remote_socket.close()

    # Set up a server to listen for incoming local connections (localhost:9090)
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind(('127.0.0.1', ssh_port))  # Bind to localhost on port 9090
    server.listen(5)

    print(f"Tunnel established at http://127.0.0.1:{ssh_port}")
    
    # Accept incoming connections and start a new thread for each one
    while True:
        local_socket, _ = server.accept()
        print(f"Accepted connection from {local_socket.getpeername()}")
        threading.Thread(target=forward, args=(local_socket, web_server_host, web_server_port)).start()

except Exception as e:
    print(f"Failed to establish SSH tunnel: {e}")
finally:
    client.close()