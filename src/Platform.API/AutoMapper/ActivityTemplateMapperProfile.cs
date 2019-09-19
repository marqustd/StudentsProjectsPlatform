using AutoMapper;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.ActivityTemplate;

namespace Platform.API.AutoMapper
{
    internal class ActivityTemplateMapperProfile : Profile
    {
        public ActivityTemplateMapperProfile()
        {
            CreateMap<ActivityTemplate, ActivityTemplateViewModel>()
                .ForMember(dest => dest.ActivityId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.IncludeArtifact, opt => opt.MapFrom(src => src.IncludeArtifact))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Obsolete, opt => opt.MapFrom(src => src.Obsolete))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<ActivityTemplate, ActivityTemplateBasicViewModel>()
                .ForMember(dest => dest.ActivityId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForAllOtherMembers(opt => opt.Ignore());
        }
    }
}