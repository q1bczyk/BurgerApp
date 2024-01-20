using System.Security.Cryptography;
using System.Text;
using api._Dto;
using api.Controllers;
using Microsoft.AspNetCore.Mvc;

public class AdminController : BaseApiController
{
    private readonly DataContext context;
    
    public AdminController(DataContext context)
    {
        this.context = context;
    }

     [HttpPost("register")]
        public async Task<ActionResult<string>> Register(AdminPostDTO adminPostDTO)
        {
            using var hmac = new HMACSHA512();

            try{
                var contact = new Contact
            {
                City = adminPostDTO.ContactPostDTO.City,
                PostalCode = adminPostDTO.ContactPostDTO.PostalCode,
                Street = adminPostDTO.ContactPostDTO.Street,
                StreetNumber = adminPostDTO.ContactPostDTO.StreetNumber,
                Email = adminPostDTO.ContactPostDTO.Email,
                PhoneNumber = adminPostDTO.ContactPostDTO.PhoneNumber,
            };

            context.Contacts.Add(contact);
            await context.SaveChangesAsync();

            var admin = new Admin
            {
                Password = hmac.ComputeHash(Encoding.UTF8.GetBytes(adminPostDTO.Password)),
                PasswordSalt = hmac.Key,
            };

            context.Admins.Add(admin);
            await context.SaveChangesAsync();

            var local = new Local
            {
                Name = adminPostDTO.LocalPostDTO.Name,
                Admin = admin,
                Contact = contact,
            };

            context.Locals.Add(local);
            await context.SaveChangesAsync();

             return "Sukces";
            } catch(Exception ex)
            {
                return BadRequest();
            }


        }
}