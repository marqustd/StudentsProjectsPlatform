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
using Platform.Infrastructure.ViewModels.Student;
using Platform.Utilities;

namespace Platform.API.UseCases
{
    public class StudentUseCase : UseCase
    {
        private readonly IFileHelper _fileHelper;
        private readonly IStudentsLogic _studentsLogic;

        public StudentUseCase(IStudentsLogic studentsLogic, IFileHelper fileHelper)
        {
            _studentsLogic = studentsLogic;
            _fileHelper = fileHelper;
        }

        public async Task<IActionResult> GetStudentAsync(int id)
        {
            var student = await _studentsLogic.GetStudentAsync(id);
            if (student == null)
            {
                throw new NotFoundException($"No Student with id {id} found");
            }

            var model = Mapper.Map<Student, StudentViewModel>(student);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> FetchStudentsAsync(string search, int index, int count, bool obsolete)
        {
            Require.NotNull(search, nameof(search));
            var (students, totalCount) = await _studentsLogic.FetchStudentsAsync(search, index, count, obsolete);

            var models = Mapper.Map<StudentViewModel[]>(students);

            var model = new ArrayViewModel<StudentViewModel>
            {
                Array = models,
                TotalCount = totalCount
            };
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> EditStudentAsync(EditStudentViewModel editModel)
        {
            Require.NotNull(editModel, nameof(editModel));

            var student = await _studentsLogic.EditStudentAsync(editModel);
            var model = Mapper.Map<StudentViewModel>(student);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> CreateStudentAsync(AddStudentViewModel studentModel)
        {
            Require.NotNull(studentModel, nameof(studentModel));
            studentModel.Verify();

            var student = await _studentsLogic.AddStudentAsync(studentModel);
            var model = Mapper.Map<StudentViewModel>(student);

            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> ObsoleteStudentAsync(int id)
        {
            var student = await _studentsLogic.ObsoleteStudentAsync(id);
            var model = Mapper.Map<StudentViewModel>(student);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> RestoreStudentAsync(IdViewModel id)
        {
            Require.NotNull(id, nameof(id));

            var student = await _studentsLogic.RestoreStudentAsync(id.Id);
            var model = Mapper.Map<StudentViewModel>(student);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> ImportStudentsAsync(IFormFile file)
        {
            var studentModels = _fileHelper.ReadFile<AddStudentViewModel[]>(file);
            var amount = await _studentsLogic.ImportStudentsAsync(studentModels);
            return Ok(new ApiJsonResponse(amount));
        }
    }
}