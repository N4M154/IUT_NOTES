import paramiko
import socket
import threading

ssh_host = '192.168.39.128'
ssh_user = '' # give your kali linux user 
ssh_password = '' # give your kali linux password
web_server_host = '127.0.0.1'
web_server_port = 8080
ssh_port = 9090

client = paramiko.SSHClient()
client.load_system_host_keys()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())

try:
    client.connect(hostname=ssh_host,username=ssh_user,password=ssh_password)
    transport = client.get_transport()

    def forward(local_socket, remote_host, remote_port):
        remote_socket = transport.open_channel(
            'direct-tcpip',(remote_host,remote_port),local_socket.getpeername()
        )
        while True:
            try:
                data = local_socket.recv(1024)
                if len(data) == 0:
                    break
                remote_socket.send(data)
            except Exception as e:
                print(e)
                break
        local_socket.close()
        remote_socket.close()

    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.bind((ssh_host,ssh_port))
    server.listen(5)

    print(f"Tunnel established at http://{ssh_host}:{ssh_port}")
    while True:
        print("atiq")
        local_socket,_ = server.accept()
        print(local_socket)
        threading.Thread(target=forward,args=(local_socket,web_server_host,web_server_port)).start()
except Exception as e:
    print(f"Failed to establish SSH tunnel : {e}")
finally:
    client.close()