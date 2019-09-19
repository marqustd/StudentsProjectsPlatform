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
    public class TopicArtifactUseCase : UseCase //Todo optimize queries
    {
        private readonly ArtifactsService _artifactsService;
        private readonly PlatformDbContext _db;

        public TopicArtifactUseCase(PlatformDbContext db, ArtifactsService artifactsService)
        {
            _db = db;
            _artifactsService = artifactsService;
        }

        public async Task<IActionResult> AddArtifact(IFormFile file, int subjectId, int topicId, User author)
        {
            var topic = await GetTopic(subjectId, topicId);

            var dtoIn = Mapper.Map<ArtifactDto>(file);
            var dtoOut = _artifactsService.Add(dtoIn);

            var artifact = Mapper.Map<Artifact>(dtoOut);
            var user = _db.Teachers.SingleOrDefault(x => x.Id == author.Id);
            artifact.Author = user;
            topic.TopicToArtifact.Add(new TopicArtifact(topic, artifact));

            await _db.SaveChangesAsync();

            var model = Mapper.Map<ArtifactViewModel>(artifact);
            return Ok(new ApiJsonResponse<ArtifactViewModel>(model));
        }

        public async Task<IActionResult> RemoveArtifact(int subjectId, int topicId, int artifactId)
        {
            var topic = await GetTopic(subjectId, topicId);

            var common = topic.TopicToArtifact.SingleOrDefault(x => x.ArtifactId == artifactId);
            common.Artifact.Obsolete = true;
            common.Artifact.RefreshUpdateOn();
            topic.TopicToArtifact.Remove(common);
            await _db.SaveChangesAsync();
            return Ok(new ApiJsonResponse(artifactId));
        }

        public async Task<ArtifactDto> DownloadArtifact(int subjectId, int sectionId, int artifactId)
        {
            var topics = _db.Topics
                    .Include(x => x.TopicToArtifact)
                    .ThenInclude(x => x.Artifact)
                    .Where(x => x.Subject.Id == subjectId);

            var topic = await _db.Sections
                .Where(x => x.Id == sectionId)
                .Join(topics,
                s => s.Topic,
                t => t,
                (s, t) => t)
                .SingleOrDefaultAsync();

            var artifact = topic.TopicToArtifact
                .FirstOrDefault(x => x.ArtifactId == artifactId)
                .Artifact;

            var dto = _artifactsService.Get(Mapper.Map<ArtifactInfoDto>(artifact));
            dto.ContentType = artifact.ContentType;
            dto.FileName = artifact.Name;
            return dto;
        }

        public async Task<IActionResult> FetchStudentArtifacts(int subjectId, int sectionId)
        {
            var topics = _db.Topics
                .Include(x=>x.TopicToArtifact)
                .ThenInclude(x=>x.Artifact)
                .Where(x => x.Subject.Id == subjectId);

            var topic = await _db.Sections
                .Where(x=>x.Id==sectionId)
                .Join(topics, 
                s => s.Topic, 
                t => t, 
                (s, t) => t)
                .SingleOrDefaultAsync();

            var artifacts = topic.TopicToArtifact.Select(x => x.Artifact);

            var model = Mapper.Map<ArtifactViewModel[]>(artifacts);

            return Ok(new ApiJsonResponse<ArtifactViewModel[]>(model));
        }

        public async Task<IActionResult> FetchArtifacts(int subjectId, int topicId)
        {
            var topic = await GetTopic(subjectId, topicId);

            var artifacts = topic.TopicToArtifact.Select(a => a.Artifact);
            var model = Mapper.Map<ArtifactViewModel[]>(artifacts);

            return Ok(new ApiJsonResponse<ArtifactViewModel[]>(model));
        }

        private async Task<Topic> GetTopic(int subjectId, int topicId)
        {
            var topic = (await _db.Subjects
                    .Include(x => x.Topics)
                    .ThenInclude(y => y.TopicToArtifact)
                    .ThenInclude(z => z.Artifact)
                    .SingleOrDefaultAsync(s => s.Id == subjectId))
                ?.Topics.Single(x => x.Id == topicId);
            ;

            if (topic == null)
            {
                throw new ArgumentException($"Subject with id {subjectId} does not exist");
            }

            return topic;
        }
    }
}