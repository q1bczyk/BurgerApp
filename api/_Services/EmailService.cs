using System;
using System.Net;
using System.Net.Mail;

public class EmailService
{
    private readonly string senderEmail = "bartekkubik7@gmail.com";
    private readonly string senderPassword = "";    
    private string recipientEmail;

    public EmailService(string recipientEmail)
    {
        this.recipientEmail = recipientEmail;
    } 

    public async Task SendMail()
    {
        var smtpClient = new SmtpClient("smtp.gmail.com")
        {
            Port = 465,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential(senderEmail, senderPassword),
            EnableSsl = true
        };
        
        MailMessage mailMessage = new MailMessage(senderEmail, recipientEmail);
            mailMessage.Subject = "ItBurger";
            mailMessage.Body = "Treść wiadomości";

         smtpClient.Send(mailMessage);
    }
}