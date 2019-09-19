using AutoMapper;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Semester;

namespace Platform.API.AutoMapper
{
    internal class SemesterMapperProfile : Profile
    {
        public SemesterMapperProfile()
        {
            CreateMap<Semester, SemesterViewModel>()
                .ForMember(dest => dest.SemesterId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.State, opt => opt.MapFrom(src => (int) src.State))
                .ForMember(dest => dest.SemesterName, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.MajorName, opt => opt.MapFrom(src => src.Major.Name))
                .ForMember(dest => dest.MajorId, opt => opt.MapFrom(src => src.Major.Id))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password))
                .ForMember(dest => dest.Obsolete, opt => opt.MapFrom(src => src.Obsolete))
                .ForAllOtherMembers(opt => opt.Ignore());
        }
    }
}