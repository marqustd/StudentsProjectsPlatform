using System.Linq;
using AutoMapper;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Subject;

namespace Platform.API.AutoMapper
{
    internal class SubjectMapperProfile : Profile
    {
        public SubjectMapperProfile()
        {
            CreateMap<Subject, SubjectViewModel>()
                .ForMember(dest => dest.SubjectId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.IsObsolete, opt => opt.MapFrom(src => src.Obsolete))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.TeacherId,
                    opt => opt.MapFrom(src => src.TeachersSubjects.ToList().FirstOrDefault().TeacherId))
                .ForMember(dest => dest.TeacherName,
                    opt => opt.MapFrom(src => src.TeachersSubjects.ToList().FirstOrDefault().Teacher.FullName))
                .ForAllOtherMembers(opt => opt.Ignore());

            CreateMap<Subject, SubjectForStudentViewModel>()
               .ForMember(dest => dest.SubjectId, opt => opt.MapFrom(src => src.Id))
               .ForMember(dest => dest.SubjectName, opt => opt.MapFrom(src => src.Name))
               .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
               .ForMember(dest => dest.TeacherId,
                   opt => opt.MapFrom(src => src.TeachersSubjects.ToList().FirstOrDefault().TeacherId))
               .ForMember(dest => dest.TeacherName,
                   opt => opt.MapFrom(src => src.TeachersSubjects.ToList().FirstOrDefault().Teacher.FullName))
               .ForAllOtherMembers(opt => opt.Ignore());
            
        }
    }
}