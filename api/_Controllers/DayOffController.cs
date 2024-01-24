using System.IdentityModel.Tokens.Jwt;
using api._DTOs.DayOffDTOs;
using api._Extensions;
using api._Interfaces;
using api.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

[Authorize]
public class DayOffController : BaseApiController
{
    
    private readonly IDayOffRepository dayOffRepository;
    private readonly IDayOffLocalRepository dayOffLocalRepository;
    private readonly IMapper mapper;
    
    public DayOffController(IDayOffRepository dayOffRepository, IDayOffLocalRepository dayOffLocalRepository, IMapper mapper)
    {
        this.dayOffRepository = dayOffRepository;
        this.dayOffLocalRepository = dayOffLocalRepository;
        this.mapper = mapper;
    }

    [HttpPost]
    public async Task<ActionResult<DayOffGetDTO>> AddDayOff(DayOffPostDTO dayOffPostDTO)
    {
        var localId = HttpContext.User.FindFirst(JwtRegisteredClaimNames.Name)?.Value;

        if(DayOffExtensions.IsPastData(dayOffPostDTO.Date) == true)
            return UnprocessableEntity("Date is past date!");
        
        if(await dayOffLocalRepository.DayOffExist(dayOffPostDTO.Date, localId) == true)
            return Conflict("This date has already existed!");

        var dayOff = await dayOffRepository.GetDayOffByDate(dayOffPostDTO.Date);

        if(dayOff == null)
        {
            dayOff = new DayOff
            {
                Date = dayOffPostDTO.Date,
            };
             await dayOffRepository.AddDayOff(dayOff);
        }
        
        var dayOffLocal = new DayOffLocal
        {
            LocalId = localId,
            DayOffId = dayOff.Id
        };

        await dayOffLocalRepository.AddDayOffLocalAsync(dayOffLocal);

        return Ok(mapper.Map<DayOffGetDTO>(dayOff));
        
    }
}