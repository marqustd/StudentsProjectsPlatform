using AutoMapper;
using Microsoft.AspNetCore.Http;
using Platform.Artifacts.DTO;
using Platform.Infrastructure.ViewModels.Artifact;
using ArtifactEntity = Platform.Infrastructure.Entities.Artifact;

namespace Platform.API.AutoMapper
{
    public class ArtifactMapperProfile : Profile
    {
        public ArtifactMapperProfile()
        {
            CreateMap<ArtifactInfoDto, ArtifactEntity>()
                .ForMember(dest => dest.ContentType, opt => opt.MapFrom(src => src.ContentType))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.FileName))
                .ForMember(dest => dest.Guid, opt => opt.MapFrom(src => src.Guid))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<ArtifactEntity, ArtifactInfoDto>()
                .ForMember(dest => dest.ContentType, opt => opt.MapFrom(src => src.ContentType))
                .ForMember(dest => dest.FileName, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Guid, opt => opt.MapFrom(src => src.Guid))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<IFormFile, ArtifactDto>()
                .ForMember(dest => dest.ContentType, opt => opt.MapFrom(src => src.ContentType))
                .ForMember(dest => dest.FileName, opt => opt.MapFrom(src => src.FileName))
                .ForMember(dest => dest.File, opt => opt.MapFrom(src => src.OpenReadStream()))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<ArtifactEntity, ArtifactViewModel>()
                .ForMember(dest => dest.ArtifactId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForAllOtherMembers(opt => opt.Ignore());
        }
    }
}