using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Platform.Domain;
using Platform.Domain.Logic.Interfaces;
using Platform.Domain.Utilities;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.Models.Exceptions;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Helpers;
using Platform.Infrastructure.ViewModels.User;
using Platform.Utilities;

namespace Platform.API.UseCases
{
    public class TeacherUseCase : UseCase
    {
        private readonly IFileHelper _fileHelper;
        private readonly ITeachersLogic _teachersLogic;

        public TeacherUseCase(ITeachersLogic teachersLogic, IFileHelper fileHelper)
        {
            _teachersLogic = teachersLogic;
            _fileHelper = fileHelper;
        }

        public async Task<IActionResult> GetTeacherAsync(int id)
        {
            var teacher = await _teachersLogic.GetTeacherAsync(id);
            if (teacher == null)
            {
                throw new NotFoundException($"No teacher with id {id} found");
            }

            var model = Mapper.Map<Teacher, UserViewModel>(teacher);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> FetchTeachersAsync(string search, int index, int count, bool obsolete)
        {
            Require.NotNull(search, nameof(search));

            var (teachers, totalCount) = await _teachersLogic.FetchTeachersAsync(search, index, count, obsolete);

            var models = Mapper.Map<UserViewModel[]>(teachers);

            var model = new ArrayViewModel<UserViewModel>
            {
                Array = models,
                TotalCount = totalCount
            };
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> EditTeacherAsync(EditUserViewModel editModel)
        {
            Require.NotNull(editModel, nameof(editModel));

            var teacher = await _teachersLogic.EditTeacherAsync(editModel);
            var model = Mapper.Map<UserViewModel>(teacher);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> CreateTeacherAsync(AddUserViewModel teacherModel)
        {
            Require.NotNull(teacherModel, nameof(teacherModel));
            teacherModel.Verify();

            var teacher = await _teachersLogic.AddTeacherAsync(teacherModel);
            var model = Mapper.Map<UserViewModel>(teacher);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> ObsoleteTeacherAsync(IdViewModel id)
        {
            Require.NotNull(id, nameof(id));

            var teacher = await _teachersLogic.ObsoleteTeacherAsync(id.Id);
            var model = Mapper.Map<UserViewModel>(teacher);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> ImportTeachersAsync(IFormFile file)
        {
            var teacherModels = _fileHelper.ReadFile<AddUserViewModel[]>(file);
            var amount = await _teachersLogic.ImportTeachersAsync(teacherModels);
            return Ok(new ApiJsonResponse(amount));
        }

        public async Task<IActionResult> RestoreTeacherAsync(IdViewModel id)
        {
            Require.NotNull(id, nameof(id));

            var teacher = await _teachersLogic.RestoreTeacherAsync(id.Id);
            var model = Mapper.Map<UserViewModel>(teacher);
            return Ok(new ApiJsonResponse(model));
        }
    }
}