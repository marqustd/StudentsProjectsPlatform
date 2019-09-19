using AutoMapper;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Topic;

namespace Platform.API.AutoMapper
{
    internal class TopicMapperProfile : Profile
    {
        public TopicMapperProfile()
        {
            CreateMap<Topic, TopicViewModel>()
                .ForMember(dest => dest.TopicId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Obsolete, opt => opt.MapFrom(src => src.Obsolete))
                .ForAllOtherMembers(opt => opt.Ignore());
        }
    }
}