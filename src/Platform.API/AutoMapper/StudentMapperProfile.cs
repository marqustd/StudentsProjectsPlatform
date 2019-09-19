using AutoMapper;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Student;

namespace Platform.API.AutoMapper
{
    internal class StudentMapperProfile : Profile
    {
        public StudentMapperProfile()
        {
            CreateMap<Student, StudentViewModel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.AlbumNumber, opt => opt.MapFrom(src => src.AlbumNumber))
                .ForMember(dest => dest.MajorId, opt => opt.MapFrom(src => src.Major.Id))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.IsObsolete, opt => opt.MapFrom(src => src.Obsolete))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<Student, StudentBasicViewModel>()
                .ForMember(dest => dest.StudentId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.FullName))
                .ForAllOtherMembers(opt => opt.Ignore());
        }
    }
}