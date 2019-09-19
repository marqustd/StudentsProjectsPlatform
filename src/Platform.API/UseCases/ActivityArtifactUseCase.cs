using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Platform.Artifacts.DTO;
using Platform.Artifacts.Logic;
using Platform.Infrastructure.Data;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.ViewModels.Artifact;

namespace Platform.API.UseCases
{
    public class ActivityArtifactUseCase : UseCase
    {
        private readonly ArtifactsService _artifactsService;
        private readonly PlatformDbContext _db;

        public ActivityArtifactUseCase(PlatformDbContext db, ArtifactsService artifactsService)
        {
            _db = db;
            _artifactsService = artifactsService;
        }

        public async Task<IActionResult> AddArtifact(IFormFile file, User author, int activityId)
        {
            Artifact artifact = null;
            using (var transaction = _db.Database.BeginTransaction())
            {
                try
                {

                    var validArgs = _db.ActivityChecks.Any(x => x.ActivityId == activityId && x.StudentId == author.Id);

                    if (!validArgs)
                    {
                        throw new ArgumentException("Given user has no right for this activity");
                    }

                    var activity = await _db.Activities
                        .Where(x => x.IncludeArtifact)
                        .Include(x => x.Artifact)
                        .FirstOrDefaultAsync(x => x.Id == activityId);

                    var dtoIn = Mapper.Map<ArtifactDto>(file);
                    var dtoOut = _artifactsService.Add(dtoIn);

                    var authorEntity = _db.Students.FirstOrDefault(x=>x.Id==author.Id);

                    artifact = Mapper.Map<Artifact>(dtoOut);
                    artifact.Author = authorEntity;
                    _db.Add<Artifact>(artifact);
                    await _db.SaveChangesAsync();

                    if (activity.Artifact != null)
                    {
                        activity.Artifact.Obsolete = true;
                        activity.Artifact.RefreshUpdateOn();
                    }

                    activity.Artifact = artifact;
                    await _db.SaveChangesAsync();

                    transaction.Commit();
                }
                catch (Exception)
                {
                    transaction.Rollback();
                    throw;
                }
            }

            var model = Mapper.Map<ArtifactViewModel>(artifact);
            return Ok(new ApiJsonResponse<ArtifactViewModel>(model));
        }

        public async Task<ArtifactDto> DownloadActivityArtifact(int activityId)
        {
            var activity = await _db.Activities
                .Include(x => x.Artifact)
                .FirstOrDefaultAsync(x => x.Id == activityId);

            var artifact = activity.Artifact;

            var dto = _artifactsService.Get(Mapper.Map<ArtifactInfoDto>(artifact));
            dto.ContentType = artifact.ContentType;
            dto.FileName = artifact.Name;
            return dto;
        }
    }
}