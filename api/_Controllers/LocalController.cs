using api._DTOs.LocalDTOs;
using api.Controllers;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace api._Controllers
{
    public class LocalController : BaseApiController
    {
        private readonly ILocalRepository localRepository;
        private readonly IMapper mapper;

        public LocalController(ILocalRepository localRepository, IMapper mapper)
        {
            this.localRepository = localRepository;
            this.mapper = mapper;
        }

        [HttpGet()]
        public async Task<ActionResult<List<LocalGetDTO>>> GetLocals()
        {
            var locals = await localRepository.GetLocalsAsync();
            return Ok(mapper.Map<List<LocalGetDTO>>(locals));
        }

        [HttpGet("{slug}")]
        public async Task<ActionResult<LocalGetDTO>> IsLocalExist(string slug)
        {
            var local = await localRepository.GetLocalBySlugAsync(slug);
            
            if(local == null)
                return NotFound("Local doesn't exist!");

            return Ok(mapper.Map<LocalGetDTO>(local));
        }
    }
}