using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Helpers;
using Platform.API.UseCases;
using Platform.Domain;
using Platform.Domain.Utilities;
using Platform.Infrastructure.ViewModels.Comment;
using Platform.Infrastructure.ViewModels.Grade;
using Platform.Infrastructure.ViewModels.Section;
using Platform.Infrastructure.ViewModels.Student;

namespace Platform.API.Areas.Teacher.Controllers
{
    [Area("Teacher")]
    [Authorize(Roles = "Teacher")]
    public class SectionController : AreaController
    {
        private readonly GradeUseCase _gradeUseCase;
        private readonly SectionUseCase _sectionUseCase;
        private readonly IUserAssignedHelper _userAssignedHelper;
        private readonly IUserResolver _userResolver;

        public SectionController(
            IUserResolver userResolver,
            IUserAssignedHelper userAssignedHelper,
            SectionUseCase sectionUseCase,
            GradeUseCase gradeUseCase)
        {
            _userResolver = userResolver;
            _sectionUseCase = sectionUseCase;
            _userAssignedHelper = userAssignedHelper;
            _gradeUseCase = gradeUseCase;
        }

        [HttpPost]
        public async Task<IActionResult> Add(AddSectionViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _sectionUseCase.AddSectionToTopicAsync(model);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPatch]
        public async Task<IActionResult> Edit(EditSectionViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _sectionUseCase.EditSectionAsync(model);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Students(int subjectId, int sectionId, int index = 0,
            int count = Settings.PAGE_SIZE)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _sectionUseCase.FetchStudentsFromSectionAsync(sectionId, index, count);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> SearchStudents(int semesterId, string search)
        {
            try
            {
                return await _sectionUseCase.SearchNewStudents(semesterId, search);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Student(AddStudentToSectionViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _sectionUseCase.AddStudentToSectionAsync(model);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteStudent(AddStudentToSectionViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _sectionUseCase.RemoveStudentFromSectionAsync(model);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Fetch(int subjectId, int semesterId, int index = 0,
            int count = Settings.PAGE_SIZE)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _sectionUseCase.FetchSectionsForTeacherAsync(subjectId, semesterId, index, count);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get(int subjectId, int semesterId, int sectionId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _sectionUseCase.GetSectionAsync(subjectId, semesterId, sectionId);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Activities(int sectionId, int subjectId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _sectionUseCase.GetSectionsActivitiesAsync(sectionId);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Grade(GradeSectionViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    return await _gradeUseCase.GradeSectionAsync(model);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Discussion(int subjectId, int sectionId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, subjectId))
                {
                    return await _sectionUseCase.GetSectionsDiscussionAsync(sectionId);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Comment(AddCommentViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfTeacherAssignedToSubjectAsync(User, model.SubjectId))
                {
                    var user = await _userResolver.GetUserAsync<Infrastructure.Entities.Teacher>(User);
                    return await _sectionUseCase.AddCommentAsync(model, user);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }
    }
}