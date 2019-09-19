using AutoMapper;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Section;

namespace Platform.API.AutoMapper
{
    internal class SectionMapperProfile : Profile
    {
        public SectionMapperProfile()
        {
            CreateMap<Section, SectionViewModel>()
                .ForMember(dest => dest.SectionId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Capacity, opt => opt.MapFrom(src => src.Capacity))
                .ForMember(dest => dest.MembersCount, opt => opt.MapFrom(src => src.StudentsSections.Count))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.TopicId, opt => opt.MapFrom(src => src.Topic.Id))
                .ForMember(dest => dest.TopicName, opt => opt.MapFrom(src => src.Topic.Name))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<Section, SectionExtendedViewModel>()
                .ForMember(dest => dest.SectionId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Capacity, opt => opt.MapFrom(src => src.Capacity))
                .ForMember(dest => dest.MembersCount, opt => opt.MapFrom(src => src.StudentsSections.Count))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.TopicId, opt => opt.MapFrom(src => src.Topic.Id))
                .ForMember(dest => dest.TopicName, opt => opt.MapFrom(src => src.Topic.Name))
                .ForMember(dest => dest.TopicDescription, opt => opt.MapFrom(src => src.Topic.Description))
                .ForAllOtherMembers(opt => opt.Ignore());

        }
    }
}