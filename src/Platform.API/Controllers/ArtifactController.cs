using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Controllers.Abstracts;
using Platform.Artifacts.DTO;
using Platform.Artifacts.Logic;

namespace Platform.API.Controllers
{
    /// <summary>
    ///     For testing purposes
    /// </summary>
    public class ArtifactController : ApiController
    {
        private readonly ArtifactsService _artifactsService;

        public ArtifactController(ArtifactsService artifactsService)
        {
            _artifactsService = artifactsService;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Add(IFormFile file)
        {
            _artifactsService.Add(Mapper.Map<ArtifactDto>(file));
            return Ok();
        }
    }
}