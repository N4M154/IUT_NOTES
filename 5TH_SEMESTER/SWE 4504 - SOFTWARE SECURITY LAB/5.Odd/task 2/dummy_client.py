import smtplib

def send_email():
    smtp_server = " " # check the ip
    smtp_port = 25  # SMTP Port
    from_email = " " # mail address
    to_email = " " # mail address
    subject = "Test Email"
    body = "This is a test email sent via Python."

    message = f"Subject: {subject}\n\n{body}"

    try:
        print(f"Connecting to {smtp_server}:{smtp_port}...")
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.sendmail(from_email, to_email, message)
        print(f"[+] Email sent to {to_email}.")
    except Exception as e:
        print(f"[Error] {e}")
    finally:
        if 'server' in locals():  # Ensure server is defined before calling quit
            server.quit()

# Run the function
send_email()


