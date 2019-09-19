using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Platform.Domain;
using Platform.Domain.Logic.Interfaces;
using Platform.Domain.Utilities;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Grade;

namespace Platform.API.UseCases
{
    public class GradeUseCase : UseCase
    {
        private readonly ISectionsLogic _sectionsLogic;
        private readonly IStudentsLogic _studentsLogic;

        public GradeUseCase(IStudentsLogic studentsLogic, ISectionsLogic sectionsLogic)
        {
            _studentsLogic = studentsLogic;
            _sectionsLogic = sectionsLogic;
        }

        public async Task<IActionResult> GradeStudentAsync(GradeStudentViewModel model)
        {
            var grade = await _studentsLogic.GradeStudentAsync(model);
            return Ok(new ApiJsonResponse(grade));
        }

        public async Task<IActionResult> GradeSectionAsync(GradeSectionViewModel model)
        {
            await _sectionsLogic.GradeSectionAsync(model);
            var (vm, count) =
                await _sectionsLogic.FetchStudentsFromSectionAsync(model.SectionId, 0, Settings.PAGE_SIZE);
            return Ok(new ApiJsonResponse(new ArrayViewModel<GradeViewModel>(vm, count)));
        }
    }
}