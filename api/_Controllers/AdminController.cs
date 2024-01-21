using System.Security.Cryptography;
using System.Text;
using api._DTOs.AdminDTOs;
using api._DTOs.LocalDTOs;
using api._Interfaces;
using api.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

public class AdminController : BaseApiController
{
    private readonly ILocalRepository localRepository;
    private readonly IContactRepository contactRepository;
    private readonly IAdminRepository adminRepository;
    private readonly IMapper mapper;
    private readonly ITokenservice tokenService;

    public AdminController(ILocalRepository localRepository, IContactRepository contactRepository, IAdminRepository adminRepository, IMapper mapper, ITokenservice tokenService)
    {
        this.localRepository = localRepository;
        this.contactRepository = contactRepository;
        this.adminRepository = adminRepository;
        this.mapper = mapper;
        this.tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<AdminLoggedDTO>> Login(AdminLoginDTO adminLoginDTO)
    {
        var contact = await contactRepository.FindContactByEmail(adminLoginDTO.Email);
        
        if(contact == null)
            return Unauthorized("Wrong email or password!");
        
        var admin = await adminRepository.FindAdminByLocalId(contact.LocalId);

        using var hmac = new HMACSHA512(admin.PasswordSalt);
        var computeHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(adminLoginDTO.Password));

        for(int i = 0; i < computeHash.Length; i++)
                if(computeHash[i] != admin.Password[i])
                    return Unauthorized("Wrong email or password!");

        return new AdminLoggedDTO
        {
            Token = tokenService.CreateToken(admin)
        };
            
    }

    [HttpPost("password-reset")]
    public async Task<ActionResult<string>> PasswordReset(PasswordResetDTO passwordResetDTO)
    {
        var contact = await contactRepository.FindContactByEmail(passwordResetDTO.Email);
        
        if(contact == null)
            return NotFound();

        EmailService emailService = new EmailService(contact.Email);
        
        await emailService.SendMail();

        return Ok("Succes!");

    }
}