using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Helpers;
using Platform.API.UseCases;
using Platform.Domain;
using Platform.Domain.Utilities;
using Platform.Infrastructure.ViewModels.Comment;
using Platform.Infrastructure.ViewModels.Section;
using StudentUser = Platform.Infrastructure.Entities.Student;
namespace Platform.API.Areas.Student.Controllers
{
    [Area("Student")]
    [Authorize(Roles = "Student")]
    public class SectionController : AreaController
    {
        private readonly SectionUseCase _sectionUseCase;
        private readonly IUserAssignedHelper _userAssignedHelper;

        public SectionController(
            IUserResolver userResolver,
            IUserAssignedHelper userAssignedHelper,
            SectionUseCase sectionUseCase)
            : base(userResolver)
        {
            _sectionUseCase = sectionUseCase;
            _userAssignedHelper = userAssignedHelper;
        }

        [HttpGet]
        public async Task<IActionResult> Fetch(int subjectId, int index = 0, int count = Settings.PAGE_SIZE)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, subjectId))
                {
                    var student = await GetUser<StudentUser>();
                    return await _sectionUseCase.FetchSectionsForStudentAsync(student.Id, subjectId, index, count);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Get(int subjectId, int sectionId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, subjectId))
                {
                    var student = await GetUser<StudentUser>();

                    return await _sectionUseCase.GetSectionForStudentAsync(student.Id, subjectId, sectionId);
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
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, subjectId))//todo sprawdzanie czy jest w sekcji
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

        [HttpGet]
        public async Task<IActionResult> Discussion(int subjectId, int sectionId)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, subjectId))//todo sprawdzanie czy jest w sekcji
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
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, model.SubjectId))//todo sprawdzanie czy jest w sekcji
                {
                    var user = await GetUser<StudentUser>();

                    return await _sectionUseCase.AddCommentAsync(model, user);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SignIn(SignInOutViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, model.SubjectId))
                {
                    var user = await GetUser<StudentUser>();

                    return await _sectionUseCase.SignInAsync(user.Id, model.SubjectId, model.SectionId);
                }

                return Forbidden();
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> SignOut(SignInOutViewModel model)
        {
            try
            {
                if (await _userAssignedHelper.CheckIfStudentAssignedToSubjectAsync(User, model.SubjectId))
                {
                    var user = await GetUser<StudentUser>();

                    return await _sectionUseCase.SignOutAsync(user.Id, model.SubjectId, model.SectionId);
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