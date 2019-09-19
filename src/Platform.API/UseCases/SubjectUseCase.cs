using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Platform.Domain;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.Models.Exceptions;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Helpers;
using Platform.Infrastructure.ViewModels.Subject;
using Platform.Infrastructure.ViewModels.Teacher;
using Platform.Utilities;

namespace Platform.API.UseCases
{
    public class SubjectUseCase : UseCase
    {
        private readonly ISubjectsLogic _subjectsLogic;
        private readonly IStudentsLogic _studentsLogic;
        private readonly ISectionsLogic _sectionsLogic;
        private readonly ITeachersLogic _teachersLogic;

        public SubjectUseCase(ISubjectsLogic subjectsLogic,IStudentsLogic studentsLogic, ITeachersLogic teachersLogic, ISectionsLogic sectionsLogic)
        {
            _sectionsLogic = sectionsLogic;
            _subjectsLogic = subjectsLogic;
            _studentsLogic = studentsLogic;
            _teachersLogic = teachersLogic;
        }

        public async Task<IActionResult> GetSubjectForStudentAsync(int studentId, int subjectId)
        {
            var subject = await _subjectsLogic.GetSubjectAsync(subjectId,
                x => x.Include(y => y.TeachersSubjects).ThenInclude(z => z.Teacher));

            if (subject == null)
            {
                throw new NotFoundException($"No Subject with id {subjectId} found");
            }
            
            var model = Mapper.Map<SubjectForStudentViewModel>(subject);
            model.SectionId = await _studentsLogic.GetStudentSignedSectionId(studentId, subjectId);

            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> GetSubjectAsync(int subjectId)
        {
            var subject = await _subjectsLogic.GetSubjectAsync(subjectId,
                x => x.Include(y => y.TeachersSubjects).ThenInclude(z => z.Teacher));

            if (subject == null)
            {
                throw new NotFoundException($"No Subject with id {subjectId} found");
            }

            var model = Mapper.Map<SubjectViewModel>(subject);

            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> FetchTeachersSubjectsAsync(int teacherId, string search, int index, int count)
        {
            var (subjects, totalCount) =
                await _subjectsLogic.FetchTeacherSubjectsAsync(teacherId, search, index, count);
            var models = Mapper.Map<SubjectViewModel[]>(subjects);

            var model = new ArrayViewModel<SubjectViewModel>
            {
                Array = models,
                TotalCount = totalCount
            };
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> FetchSubjectsAsync(string search, int index, int count, bool obsolete)
        {
            Require.NotNull(search, nameof(search));
            var (subjects, totalCount) = await _subjectsLogic.FetchSubjectsAsync(search, index, count, obsolete);

            var models = Mapper.Map<SubjectViewModel[]>(subjects);

            var model = new ArrayViewModel<SubjectViewModel>
            {
                Array = models,
                TotalCount = totalCount
            };
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> FindSubjectsForStudentAsync(int id, string search, int index, int count)
        {
            var (subjects, totalCount) =
              await _subjectsLogic.FindSubjectsForStudentAsync(id, search, index, count);
            var models = Mapper.Map<SubjectViewModel[]>(subjects);

            var model = new ArrayViewModel<SubjectViewModel>
            {
                Array = models,
                TotalCount = totalCount
            };
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> EditSubjectAsync(EditSubjectViewModel subjectModel)
        {
            Require.NotNull(subjectModel, nameof(subjectModel));

            var subject = await _subjectsLogic.EditSubjectAsync(subjectModel);
            var model = Mapper.Map<SubjectViewModel>(subject);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> CreateSubjectAsync(AddSubjectViewModel subjectModel)
        {
            Require.NotNull(subjectModel, nameof(subjectModel));
            subjectModel.Verify();

            var subject = await _subjectsLogic.AddSubjectAsync(subjectModel);
            var model = Mapper.Map<SubjectViewModel>(subject);
            var teacher = (await _subjectsLogic.GetSubjectsTeachersAsync(subject.Id)).FirstOrDefault();
            model.TeacherId = teacher.Id;
            model.TeacherName = teacher.FullName;
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> ObsoleteSubjectAsync(IdViewModel id)
        {
            Require.NotNull(id, nameof(id));

            var subject = await _subjectsLogic.ObsoleteSubjectAsync(id.Id);
            var model = Mapper.Map<SubjectViewModel>(subject);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> RestoreSubjectAsync(IdViewModel id)
        {
            Require.NotNull(id, nameof(id));

            var subject = await _subjectsLogic.RestoreSubjectAsync(id.Id);
            var model = Mapper.Map<SubjectViewModel>(subject);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> AddTeacherToSubjectAsync(AddTeacherToSubjectViewModel addModel)
        {
            Require.NotNull(addModel, nameof(addModel));
            var teacher = await _subjectsLogic.AddTeacherToSubjectAsync(addModel);
            var model = Mapper.Map<TeacherViewModel>(teacher);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> RemoveTeacherFromSubjectAsync(AddTeacherToSubjectViewModel addModel)
        {
            Require.NotNull(addModel, nameof(addModel));
            var teacher = await _subjectsLogic.RemoveTeacherFromSubjectAsync(addModel);
            var model = Mapper.Map<TeacherViewModel>(teacher);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> FetchSubjectTeachersAsync(int subjectId, int index, int count,
            bool obsolete = false)
        {
            var (teachers, totalCount) =
                await _subjectsLogic.FetchSubjectTeachersAsync(subjectId, index, count, obsolete);
            var models = Mapper.Map<TeacherViewModel[]>(teachers);
            var model = new ArrayViewModel<TeacherViewModel>(models, totalCount);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> SignStudentToSubjectAsync(Student student, SubjectSignInModel signModel)
        {
            var subject = await _subjectsLogic.SignStudentToSubjectAsync(student, signModel);
            var model = Mapper.Map<SubjectViewModel>(subject);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> FetchStudentsSubjectsAsync(int studentId, string search, int index, int count)
        {
            var (subjects, totalCount) =
                await _subjectsLogic.FetchStudentsSubjectsAsync(studentId, search, index, count);
            var models = Mapper.Map<SubjectViewModel[]>(subjects);

            var model = new ArrayViewModel<SubjectViewModel>
            {
                Array = models,
                TotalCount = totalCount
            };
            return Ok(new ApiJsonResponse(model));
        }
    }
}