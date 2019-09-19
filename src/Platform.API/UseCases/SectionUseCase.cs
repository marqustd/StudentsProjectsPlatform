using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Platform.Domain;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Activity;
using Platform.Infrastructure.ViewModels.Comment;
using Platform.Infrastructure.ViewModels.Grade;
using Platform.Infrastructure.ViewModels.Section;
using Platform.Infrastructure.ViewModels.Student;
using Platform.Utilities;

namespace Platform.API.UseCases
{
    public sealed class SectionUseCase : UseCase
    {
        private readonly ISectionsLogic _sectionsLogic;
        private readonly IStudentsLogic _studentsLogic;

        public SectionUseCase(ISectionsLogic sectionsLogic, IStudentsLogic studentsLogic)
        {
            _sectionsLogic = sectionsLogic;
            _studentsLogic = studentsLogic;
        }

        public async Task<IActionResult> AddSectionToTopicAsync(AddSectionViewModel addModel)
        {
            Require.NotNull(addModel, nameof(addModel));

            var section = await _sectionsLogic.AddSectionToTopicAsync(addModel);
            var model = Mapper.Map<SectionViewModel>(section);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> EditSectionAsync(EditSectionViewModel editModel)
        {
            Require.NotNull(editModel, nameof(editModel));

            var section = await _sectionsLogic.EditSectionAsync(editModel);
            var model = Mapper.Map<SectionViewModel>(section);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> AddStudentToSectionAsync(AddStudentToSectionViewModel addModel)
        {
            Require.NotNull(addModel, nameof(addModel));

            var student = await _sectionsLogic.AddStudentToSectionAsync(addModel.StudentId, addModel.SubjectId, addModel.SectionId);
            var vm = new GradeViewModel { Name = student.FullName, StudentId = student.Id };
            return Ok(new ApiJsonResponse<GradeViewModel>(vm));
        }

        public async Task<IActionResult> RemoveStudentFromSectionAsync(AddStudentToSectionViewModel rmModel)
        {
            Require.NotNull(rmModel, nameof(rmModel));

            var student = await _sectionsLogic.RemoveStudentFromSectionAsync(rmModel.StudentId, rmModel.SectionId);
            return Ok(new ApiJsonResponse(student.Id));
        }

        public async Task<IActionResult> GetSectionForStudentAsync(int studentId, int subjectId, int sectionId)
        {
            var section = await _sectionsLogic.GetSectionForStudentAsync(subjectId, sectionId);
            var vm = Mapper.Map<SectionExtendedViewModel>(section);
            vm.IsSignedIn = await _studentsLogic.CheckIfStudentIsInSection(studentId, sectionId);
            vm.Grade = await _studentsLogic.GetSectionGradeForStudent(studentId, sectionId);
            return Ok(new ApiJsonResponse<SectionExtendedViewModel>(vm));
        }

        public async Task<IActionResult> FetchStudentsFromSectionAsync(int sectionId, int index, int count)
        {
            var (students, length) = await _sectionsLogic.FetchStudentsFromSectionAsync(sectionId, index, count);
            return Ok(new ApiJsonResponse(new ArrayViewModel<GradeViewModel>(students, length)));
        }

        public async Task<IActionResult> SearchNewStudents(int semesterId, string search)
        {
            var students = await _sectionsLogic.SearchNewStudents(semesterId, search);
            var model = Mapper.Map<StudentViewModel[]>(students);

            return Ok(new ApiJsonResponse<StudentViewModel[]>(model));
        }

        public async Task<IActionResult> FetchSectionsForStudentAsync(int studentId, int subjectId, int index, int count)
        {
            var (sections, totalCount) = await _sectionsLogic.FetchSectionsForStudentAsync(studentId, subjectId, index, count);

            var models = Mapper.Map<SectionViewModel[]>(sections);
            return Ok(new ApiJsonResponse(new ArrayViewModel<SectionViewModel>
            {
                Array = models,
                TotalCount = totalCount
            }));
        }

        public async Task<IActionResult> FetchSectionsForTeacherAsync( int subjectId, int semesterId, int index, int count)
        {
            var (sections, totalCount) = await _sectionsLogic.FetchSectionsForTeacherAsync(subjectId, semesterId, index, count);

            var models = Mapper.Map<SectionViewModel[]>(sections);
            return Ok(new ApiJsonResponse(new ArrayViewModel<SectionViewModel>
            {
                Array = models,
                TotalCount = totalCount
            }));
        }

        public async Task<IActionResult> GetSectionAsync(int subjectId, int semesterId, int sectionId)
        {
            var section = await _sectionsLogic.GetSectionAsync(subjectId, semesterId, sectionId);
            if (section == null)
                throw new ArgumentException("Such section doesn't exist");

            var model = Mapper.Map<SectionViewModel>(section);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> GetSectionsActivitiesAsync(int sectionId)
        {
            var activities = await _sectionsLogic.GetSectionsActivitiesAsync(sectionId);
            var models = Mapper.Map<ActivityBasicViewModel[]>(activities);
            return Ok(new ApiJsonResponse(models));
        }

        public async Task<IActionResult> GetSectionsDiscussionAsync(int sectionId)
        {
            var comments = await _sectionsLogic.GetSectionsCommentsAsync(sectionId);
            var model = Mapper.Map<CommentViewModel[]>(comments);
            return Ok(new ApiJsonResponse(model));
        }


        public async Task<IActionResult> AddCommentAsync(AddCommentViewModel vm, User user)
        {
            var comments = await _sectionsLogic.AddCommentAsync(vm, user);
            var model = Mapper.Map<CommentViewModel[]>(comments);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> SignInAsync(int studentId, int subjectId, int sectionId)
        {
            await _sectionsLogic.AddStudentToSectionAsync(studentId, subjectId, sectionId);
            return await GetSectionForStudentAsync(studentId, subjectId, sectionId);
        }

        public async Task<IActionResult> SignOutAsync(int studentId, int subjectId, int sectionId)
        {
            await _sectionsLogic.RemoveStudentFromSectionAsync(studentId, sectionId);
            return await GetSectionForStudentAsync(studentId, subjectId, sectionId);
        }
    }
}