using System.IdentityModel.Tokens.Jwt;
using api._DTOs.OpeningHourDTOs;
using api._Interfaces;
using api._Services;
using api.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api._Controllers
{

    public class OpeningHourController : BaseApiController
    {
        private readonly IOpeningHourRepository openingHourRepository;
        private readonly IOpeningHourLocalRepository openingHourLocalRepository;
        private readonly IMapper mapper;
        private readonly IFileService fileService;

        public OpeningHourController(IOpeningHourRepository openingHourRepository, IOpeningHourLocalRepository openingHourLocalRepository, IMapper mapper, IFileService fileService)
        {
            this.openingHourRepository = openingHourRepository;
            this.openingHourLocalRepository = openingHourLocalRepository;
            this.mapper = mapper;
            this.fileService = fileService;
        }

        [AllowAnonymous]
        [HttpGet("")]

        [HttpGet("{id}")]
        public async Task<ActionResult<OpeningHourGetDTO>> GetOpeningHour(string id,   OpeningHourPostDTO openingHourPostDTO)
        {
            var localId = HttpContext.User.FindFirst(JwtRegisteredClaimNames.Name)?.Value;

            var openingHour = await openingHourLocalRepository.GetOpeningHourLocalByIdAsync(id, localId);

            if(openingHour == null)
                return NotFound("Data with this id does not exist!");

            return Ok(mapper.Map<OpeningHourGetDTO>(openingHour));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<OpeningHourGetDTO>> EditOpeningHour(string id, OpeningHourPostDTO openingHourPostDTO)
        {
            var localId = HttpContext.User.FindFirst(JwtRegisteredClaimNames.Name)?.Value;
            
            
            var openingHour = await openingHourLocalRepository.GetOpeningHourLocalByIdAsync(id, localId);

            if(openingHour == null)
                return NotFound("Data with this id does not exist!");
            
            openingHour.Opened = openingHourPostDTO.Opened;
            openingHour.Closed = openingHourPostDTO.Closed;
            openingHour.IsDayOff = openingHourPostDTO.IsDayOff;

            openingHourRepository.Update(openingHour);
            openingHourRepository.SaveAllAsync();

            return Ok(mapper.Map<OpeningHourGetDTO>(openingHour)); 
        }

    }

}