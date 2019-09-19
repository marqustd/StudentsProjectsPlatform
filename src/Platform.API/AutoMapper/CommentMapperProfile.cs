using AutoMapper;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Comment;

namespace Platform.API.AutoMapper
{
    internal class CommentMapperProfile : Profile
    {
        public CommentMapperProfile()
        {
            CreateMap<Comment, CommentViewModel>()
                .ForMember(dest => dest.DateTime,
                    opt => opt.MapFrom(src => src.DateTime.ToString("H:mm:ss dd/MM/yyyy")))
                .ForMember(dest => dest.Content, opt => opt.MapFrom(src => src.Content))
                .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.Author.FullName))
                .ForAllOtherMembers(opt => opt.Ignore());
        }
    }
}