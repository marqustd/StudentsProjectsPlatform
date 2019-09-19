using AutoMapper;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Major;

namespace Platform.API.AutoMapper
{
    internal class MajorMapperProfile : Profile
    {
        public MajorMapperProfile()
        {
            CreateMap<Major, MajorViewModel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.IsObsolete, opt => opt.MapFrom(src => src.Obsolete))
                .ForAllOtherMembers(opt => opt.Ignore());
        }
    }
}