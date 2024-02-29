namespace api._Interfaces
{
    public interface ISendEmailService
    {
        Task<bool> SendConfirmOrderEmailAsync(string localSlug, string orderId, string recipientEmail);
        Task<bool> SendPasswordResetEmailAsync(string recipientEmail, string resetLink);
    }
}