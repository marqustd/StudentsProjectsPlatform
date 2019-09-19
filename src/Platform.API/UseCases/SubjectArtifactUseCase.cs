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
    public class SubjectArtifactUseCase : UseCase
    {
        private readonly ArtifactsService _artifactsService;
        private readonly PlatformDbContext _db;

        public SubjectArtifactUseCase(PlatformDbContext db, ArtifactsService artifactsService)
        {
            _db = db;
            _artifactsService = artifactsService;
        }

        public async Task<IActionResult> AddArtifact(IFormFile file, int subjectId, User author)
        {
            var subject = await GetSubject(subjectId);

            var dtoIn = Mapper.Map<ArtifactDto>(file);
            var dtoOut = _artifactsService.Add(dtoIn);
            var artifact = Mapper.Map<Artifact>(dtoOut);

            var user = _db.Teachers.SingleOrDefault(x => x.Id == author.Id);
            artifact.Author = user;
            subject.SubjectToArtifacts.Add(new SubjectArtifact(subject, artifact));
            await _db.SaveChangesAsync();

            var model = Mapper.Map<ArtifactViewModel>(artifact);
            return Ok(new ApiJsonResponse<ArtifactViewModel>(model));
        }

        public async Task<IActionResult> RemoveArtifact(int subjectId, int artifactId)
        {
            var subject = await GetSubject(subjectId);

            var common = subject.SubjectToArtifacts.SingleOrDefault(x => x.ArtifactId == artifactId);
            common.Artifact.Obsolete = true;
            common.Artifact.RefreshUpdateOn();
            subject.SubjectToArtifacts.Remove(common);
            await _db.SaveChangesAsync();
            return Ok(new ApiJsonResponse(artifactId));
        }

        public async Task<ArtifactDto> DownloadArtifact(int subjectId, int artifactId)
        {
            var subject = await GetSubject(subjectId);

            var artifact = subject.SubjectToArtifacts
                .Select(x => x.Artifact)
                .SingleOrDefault(y => y.Id == artifactId);

            var dto = _artifactsService.Get(Mapper.Map<ArtifactInfoDto>(artifact));
            dto.ContentType = artifact.ContentType;
            dto.FileName = artifact.Name;
            return dto;
        }


        public async Task<IActionResult> FetchArtifacts(int subjectId)
        {
            var subject = await GetSubject(subjectId);

            var artifacts = subject.SubjectToArtifacts.Select(a => a.Artifact);
            var model = Mapper.Map<ArtifactViewModel[]>(artifacts);

            return Ok(new ApiJsonResponse<ArtifactViewModel[]>(model));
        }

        private async Task<Subject> GetSubject(int subjectId)
        {
            var subject = await _db.Subjects
                .Include(x => x.SubjectToArtifacts)
                .ThenInclude(y => y.Artifact)
                .SingleOrDefaultAsync(s => s.Id == subjectId);

            if (subject == null)
            {
                throw new ArgumentException($"Subject with id {subjectId} does not exist");
            }

            return subject;
        }
    }
}