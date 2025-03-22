import smtplib

def send_email():
    smtp_server = "104.237.130.88"
    smtp_port = 25  # SMTP Port
    from_email = "namisa.najah.raisa@gmail.com"
    to_email = "namisaraisa2003@gmail.com"
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
