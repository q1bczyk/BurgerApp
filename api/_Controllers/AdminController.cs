using System.Net;
using System.Net.Mail;
using api._DTOs.AdminDTOs;
using api._Extensions;
using api._Interfaces;
using api._Models;
using api.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;


public class AdminController : BaseApiController
{
    private readonly ILocalRepository localRepository;
    private readonly IContactRepository contactRepository;
    private readonly IAdminRepository adminRepository;
    private readonly IMapper mapper;
    private readonly ITokenservice tokenService;
    private readonly UserManager<Admin> userMenager;

    public AdminController(ILocalRepository localRepository, IContactRepository contactRepository, IAdminRepository adminRepository, IMapper mapper, ITokenservice tokenService, UserManager<Admin> userMenager)
    {
        this.localRepository = localRepository;
        this.contactRepository = contactRepository;
        this.adminRepository = adminRepository;
        this.mapper = mapper;
        this.tokenService = tokenService;
        this.userMenager = userMenager;
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
            Token = tokenService.CreateToken(admin)
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

        ServicePointManager.ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true;

        string senderEmail = "bartekkubik7@gmail.com";
        string senderPassword = "nbmw atok pztp wbjn";
        string recipientEmail = contact.Email;

        var smtpClient = new SmtpClient("smtp.gmail.com")
        {
            Port = 587 ,
            UseDefaultCredentials = false,
            Credentials = new NetworkCredential(senderEmail, senderPassword),
            EnableSsl = true,
        };

        MailMessage mailMessage = new MailMessage(senderEmail, recipientEmail)
        {
            Subject = "ItBurger - Resetowanie hasła",
            Body = resetLink
        };

        smtpClient.Send(mailMessage); 

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
}