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
    private readonly IMapper mapper;
    private readonly ITokenservice tokenService;

    public AdminController(ILocalRepository localRepository, IMapper mapper, ITokenservice tokenService)
    {
        this.localRepository = localRepository;
        this.mapper = mapper;
        this.tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<LocalGetDTO>> Register(AdminPostDTO adminPostDTO)
    {
        using var hmac = new HMACSHA512();
        
        var contact = new Contact
        {
            City = adminPostDTO.ContactPostDTO.City,
            PostalCode = adminPostDTO.ContactPostDTO.PostalCode,
            Street = adminPostDTO.ContactPostDTO.Street,
            StreetNumber = adminPostDTO.ContactPostDTO.StreetNumber,
            Email = adminPostDTO.ContactPostDTO.Email,
            PhoneNumber = adminPostDTO.ContactPostDTO.PhoneNumber,
        };

        var admin = new Admin
        {
            Password = hmac.ComputeHash(Encoding.UTF8.GetBytes(adminPostDTO.Password)),
            PasswordSalt = hmac.Key,
        };

        var local = new Local
        {
            Name = adminPostDTO.LocalPostDTO.Name,
            Admin = admin,
            Contact = contact,
        };

        await localRepository.AddLocalAsync(local);
        return Ok(mapper.Map<LocalGetDTO>(local));

    }
}