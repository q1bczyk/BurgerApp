using System.Net;
using System.Net.Mail;
using api._Helpers;
using api._Interfaces;
using Microsoft.Extensions.Options;

namespace api._Services
{
    public class SendEmailService : ISendEmailService
    {

        private readonly SmtpClient stmp;
        private readonly string ClientUrl;
        private readonly string EmailSender;
        private readonly int Port;
        public readonly string Key;

        public SendEmailService(IOptions<EmailSenderSettings> config)
        {
            ClientUrl = config.Value.ClientUrl;
            EmailSender = config.Value.EmailSender;
            Key = config.Value.Key;
            Port = config.Value.Port;

            stmp = new SmtpClient("smtp.gmail.com")
            {
                Port = Port,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(EmailSender, Key),
                EnableSsl = true,
            };

        }

        public async Task<bool> SendConfirmOrderEmailAsync(string localSlug, string orderId, string recipientEmail)
        {
            string link = ClientUrl + localSlug + "/potwierdzenie/" + orderId;

            MailMessage mailMessage = new MailMessage(EmailSender, recipientEmail)
            {
                Subject = "ItBurger - status zamówienia",
                Body = "Kliknij w link aby wejść na stronę ze swoim zamówieniem:" + link
            };

            await stmp.SendMailAsync(mailMessage);

            return true;
        }

        public async Task<bool> SendPasswordResetEmailAsync(string recipientEmail, string resetLink)
        {
             MailMessage mailMessage = new MailMessage(EmailSender, recipientEmail)
            {
                Subject = "ItBurger - Resetowanie hasła",
                Body = resetLink
            };

            await stmp.SendMailAsync(mailMessage);

            return true;
        }
    }
}