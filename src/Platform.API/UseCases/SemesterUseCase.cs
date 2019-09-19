using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Platform.Domain;
using Platform.Domain.Logic.Interfaces;
using Platform.Domain.Report;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Semester;
using Platform.Utilities;

namespace Platform.API.UseCases
{
    public class SemesterUseCase : UseCase
    {
        private readonly ISemestersLogic _semestersLogic;
        private readonly IPdfCreator _pdfCreator;

        public SemesterUseCase(ISemestersLogic semestersLogic, IPdfCreator pdfCreator)
        {
            _semestersLogic = semestersLogic;
            _pdfCreator = pdfCreator;
        }

        public async Task<IActionResult> AddSemesterToSubjectAsync(AddSemesterToSubjectViewModel addModel)
        {
            Require.NotNull(addModel, nameof(addModel));

            var semester = await _semestersLogic.AddSemesterToSubjectAsync(addModel);
            var model = Mapper.Map<SemesterViewModel>(semester);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> ObsoleteSemesterAsync(int id)
        {
            var semester = await _semestersLogic.ObsoleteSemesterAsync(id);
            var model = Mapper.Map<SemesterViewModel>(semester);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> RestoreSemesterAsync(int id)
        {
            var semester = await _semestersLogic.RestoreSemesterAsync(id);
            var model = Mapper.Map<SemesterViewModel>(semester);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> EditSemesterAsync(EditSemesterViewModel editModel)
        {
            Require.NotNull(editModel, nameof(editModel));

            var semester = await _semestersLogic.EditSemesterAsync(editModel);
            var model = Mapper.Map<SemesterViewModel>(semester);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> ChangeSemesterStateAsync(ChangeStateViewModel changeStateModel)
        {
            Require.NotNull(changeStateModel, nameof(changeStateModel));

            var semester = await _semestersLogic.ChangeSemesterStateAsync(changeStateModel);
            var model = Mapper.Map<SemesterViewModel>(semester);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> GetSemesterAsync(int semesterId, int subjectId)
        {
            var semester = await _semestersLogic.GetSemesterAsync(semesterId);
            if (semester.Subject.Id != subjectId)
            {
                return BadRequest(new ApiJsonResponse(new ApiJsonError
                {
                    Code = (int) ApiJsonErrorCodes.BadRequest,
                    Message = $"SubjectId {subjectId} does not match semester's subject"
                }));
            }

            var model = Mapper.Map<SemesterViewModel>(semester);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> FetchSemestersAsync(int subjectId, int index, int count)
        {
            var (semesters, totalCount) = await _semestersLogic.FetchSemestersAsync(subjectId, index, count);

            var models = Mapper.Map<SemesterViewModel[]>(semesters);
            return Ok(
                new ApiJsonResponse(
                    new ArrayViewModel<SemesterViewModel>(models, totalCount)));
        }

        public async Task<MemoryStream> PrepareEndReportAsync(int semesterId)
        {
            return await _pdfCreator.CreateSemesterReport(semesterId);
        }
    }
}