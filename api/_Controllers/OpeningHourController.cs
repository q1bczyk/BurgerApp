using api._DTOs.OpeningHourDTOs;
using api._Interfaces;
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
        private readonly ITokenservice tokenservice;

        public OpeningHourController(IOpeningHourRepository openingHourRepository, IOpeningHourLocalRepository openingHourLocalRepository, IMapper mapper, ITokenservice tokenservice)
        {
            this.openingHourRepository = openingHourRepository;
            this.openingHourLocalRepository = openingHourLocalRepository;
            this.mapper = mapper;
            this.tokenservice = tokenservice;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<OpeningHour>> AddOpeningHour(OpeningHourPostDTO openingHourPostDTO)
        {
            
            var openingHour = new OpeningHour
            {
                Day = openingHourPostDTO.Day,
                Opened = openingHourPostDTO.Opened,
                Closed = openingHourPostDTO.Closed,
                IsDayOff = openingHourPostDTO.IsDayOff,
            };

            return Ok(openingHour);
        }
    }
}