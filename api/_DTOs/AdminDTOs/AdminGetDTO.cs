namespace api._DTOs.AdminDTOs
{
    public class AdminGetDTO
    {
        public string Id { get; set; }
        public string Password { get; set; }
        public string PasswordSalt { get; set; }
    }
}