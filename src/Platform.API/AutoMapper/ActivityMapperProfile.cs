using AutoMapper;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Activity;

namespace Platform.API.AutoMapper
{
    internal class ActivityMapperProfile : Profile
    {
        public ActivityMapperProfile()
        {
            CreateMap<Activity, ActivityViewModel>()
                .ForMember(dest => dest.ActivityId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.IncludeArtifact, opt => opt.MapFrom(src => src.IncludeArtifact))
                .ForMember(dest => dest.ArtifactName, opt => opt.MapFrom(src => src.Artifact.Name))
                .ForMember(dest => dest.ArtifactId, opt => opt.MapFrom(src => src.Artifact.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Obsolete, opt => opt.MapFrom(src => src.Obsolete))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<Activity, ActivityBasicViewModel>()
                .ForMember(dest => dest.ActivityId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForAllOtherMembers(opt => opt.Ignore());
        }
    }
}