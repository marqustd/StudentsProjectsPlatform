﻿using AutoMapper;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.User;

namespace Platform.API.AutoMapper
{
    internal class AdminMapperProfile : Profile
    {
        public AdminMapperProfile()
        {
            CreateMap<Admin, UserViewModel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.IsObsolete, opt => opt.MapFrom(src => src.Obsolete))
                .ForAllOtherMembers(opt => opt.Ignore());
        }
    }
}