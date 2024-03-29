using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;
using api._DTOs.AdminDTOs;
using api._DTOs.ContactDTOs;
using api._DTOs.LocalDTOs;
using api._Extensions;
using api._Interfaces;
using api._Models;
using api.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


public class AdminController : BaseApiController
{
    private readonly ILocalRepository localRepository;
    private readonly IContactRepository contactRepository;
    private readonly IAdminRepository adminRepository;
    private readonly IMapper mapper;
    private readonly ITokenservice tokenService;
    private readonly UserManager<Admin> userMenager;
    private readonly ISendEmailService sendEmailService;

    public AdminController(ILocalRepository localRepository, IContactRepository contactRepository, IAdminRepository adminRepository, IMapper mapper, ITokenservice tokenService, UserManager<Admin> userMenager, ISendEmailService sendEmailService)
    {
        this.localRepository = localRepository;
        this.contactRepository = contactRepository;
        this.adminRepository = adminRepository;
        this.mapper = mapper;
        this.tokenService = tokenService;
        this.userMenager = userMenager;
        this.sendEmailService = sendEmailService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AdminLoggedDTO>> Login(AdminLoginDTO adminLoginDTO)
    {
        var contact = await contactRepository.FindContactByEmail(adminLoginDTO.Email);
        
        if(contact == null)
            return Unauthorized("Wrong email or password!");
        
        var admin = await adminRepository.FindAdminByLocalId(contact.LocalId);

        if(AdminMethodsExtension.DecryptPassword(adminLoginDTO.Password, admin.PasswordSalt, admin.Password) == false)
            return Unauthorized("Wrong email or password!");            

        return new AdminLoggedDTO
        {
            Token = tokenService.CreateToken(admin.LocalId),
        };
            
    }

    [HttpPost("forget-password")]
    public async Task<ActionResult<string>> ForgetPassword(PasswordForgotDTO passwordForgotDTO)
    {
        var contact = await contactRepository.FindContactByEmail(passwordForgotDTO.Email);
        
        if(contact == null)
            return NotFound();

        var admin = await adminRepository.FindAdminByLocalId(contact.LocalId);

        if (admin.SecurityStamp == null)
        {
            admin.SecurityStamp = Guid.NewGuid().ToString();
            await userMenager.UpdateAsync(admin);
        }

        var token = await userMenager.GeneratePasswordResetTokenAsync(admin);
        var resetLink = Url.Action("PasswordReset", "Admin", new { token, email = contact.Email }, Request.Scheme, Request.Host.ToUriComponent());

        string recipientEmail = contact.Email;
        ServicePointManager.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;

        await sendEmailService.SendPasswordResetEmailAsync(contact.Email, resetLink);

        return Ok($"Password Changed request is sent on Email {recipientEmail}");

    }

    [HttpGet("password-reset")]
    public async Task<ActionResult<string>> PasswordReset(string token, string email)
    {
        var model = new PasswordResetDTO {Email = email, Token = token};
        return Ok(model);
    }

    [HttpPut("password-reset")]
    public async Task<ActionResult<string>> ChangePassword(PasswordResetDTO passwordResetDTO)
    {
        var contact = await contactRepository.FindContactByEmail(passwordResetDTO.Email);

        var admin = await adminRepository.FindAdminByLocalId(contact.LocalId);

        var resetPasswordResult = await userMenager.ResetPasswordAsync(admin, passwordResetDTO.Token, passwordResetDTO.Password);

        if(!resetPasswordResult.Succeeded)
        {
            var errors = resetPasswordResult.Errors;
            return BadRequest("Password reset failed: " + string.Join(", ", errors.Select(e => e.Description)));
        }

        if(passwordResetDTO.Password != passwordResetDTO.RepetedPassword)
            return UnprocessableEntity("Password and repeted password is diffrent!");

        HashedPasswordModel newPassword = AdminMethodsExtension.PasswordHash(passwordResetDTO.Password);

        admin.Password = newPassword.HashedPassword;
        admin.PasswordSalt = newPassword.Key;
        
        adminRepository.Update(admin);
        await adminRepository.SaveAllAsync();

        return Ok("Password reset succes!");
    }

    [Authorize]
    [HttpGet("contact")]
    public async Task<ActionResult<ContactGetDTO>> GetContact()
    {
        var localId = HttpContext.User.FindFirst(JwtRegisteredClaimNames.Name)?.Value;

        var contact = await contactRepository.FindContactByLocalIdAsync(localId);

        if(contact == null)
            return NotFound();

        return Ok(mapper.Map<ContactGetDTO>(contact));
    }

    [Authorize]
    [HttpPut("contact")]
    public async Task<ActionResult<ContactGetDTO>> EditContact(ContactPostDTO contactPostDTO)
    {
        var localId = HttpContext.User.FindFirst(JwtRegisteredClaimNames.Name)?.Value;

        var contact = await contactRepository.FindContactByLocalIdAsync(localId);

        if(contact == null)
            return NotFound();

        contact.Email = contactPostDTO.Email;
        contact.City = contactPostDTO.City;
        contact.PostalCode = contactPostDTO.PostalCode;
        contact.Street = contactPostDTO.Street;
        contact.StreetNumber = contactPostDTO.StreetNumber;
        contact.PhoneNumber = contactPostDTO.PhoneNumber;

        contactRepository.Update(contact);
        await contactRepository.SaveAllAsync();

        return Ok(mapper.Map<ContactGetDTO>(contact));
    }

    [Authorize]
    [HttpGet("local")]
    public async Task<ActionResult<ContactGetDTO>> GetLocal()
    {
        var localId = HttpContext.User.FindFirst(JwtRegisteredClaimNames.Name)?.Value;

        var local = await localRepository.GetLocalById(localId);

        if(local == null)
            return NotFound();

        return Ok(mapper.Map<LocalGetDTO>(local));
    }

}