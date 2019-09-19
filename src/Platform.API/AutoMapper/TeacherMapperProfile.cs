using AutoMapper;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Teacher;
using Platform.Infrastructure.ViewModels.User;

namespace Platform.API.AutoMapper
{
    internal class TeacherMapperProfile : Profile
    {
        public TeacherMapperProfile()
        {
            CreateMap<Teacher, UserViewModel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.IsObsolete, opt => opt.MapFrom(src => src.Obsolete))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<Teacher, TeacherViewModel>()
                .ForMember(dest => dest.TeacherId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.FullName))
                .ForAllOtherMembers(opt => opt.Ignore());
        }
    }
}