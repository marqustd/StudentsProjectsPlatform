using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Platform.Domain;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.Models.Exceptions;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Helpers;
using Platform.Infrastructure.ViewModels.Major;
using Platform.Utilities;

namespace Platform.API.UseCases
{
    public class MajorUseCase : UseCase
    {
        private readonly IMajorsLogic _majorsLogic;

        public MajorUseCase(IMajorsLogic majorsLogic)
        {
            _majorsLogic = majorsLogic;
        }

        public async Task<IActionResult> EditMajorAsync(MajorViewModel majorModel)
        {
            Require.NotNull(majorModel, nameof(majorModel));

            await _majorsLogic.EditMajorAsync(majorModel);
            var major = await _majorsLogic.GetMajorAsync(majorModel.Id);
            var model = Mapper.Map<MajorViewModel>(major);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> GetMajorAsync(int id)
        {
            var major = await _majorsLogic.GetMajorAsync(id);
            if (major == null)
            {
                throw new NotFoundException($"No Major with id {id} found");
            }

            var model = Mapper.Map<Major, MajorViewModel>(major);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> FetchMajorsAsync(string search, int index, int count, bool obsolete)
        {
            Require.NotNull(search, nameof(search));
            var (majors, totalCount) = await _majorsLogic.FetchMajorsAsync(search, index, count, obsolete);

            var models = Mapper.Map<MajorViewModel[]>(majors);

            var model = new ArrayViewModel<MajorViewModel>
            {
                Array = models,
                TotalCount = totalCount
            };
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> CreateMajorAsync(AddMajorViewModel majorModel)
        {
            Require.NotNull(majorModel, nameof(majorModel));
            majorModel.Verify();

            var major = await _majorsLogic.AddMajorAsync(majorModel);
            var model = Mapper.Map<MajorViewModel>(major);

            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> ObsoleteMajorAsync(int id)
        {
            var major = await _majorsLogic.ObsoleteMajorAsync(id);
            var model = Mapper.Map<MajorViewModel>(major);
            return Ok(new ApiJsonResponse(model));
        }

        public async Task<IActionResult> RestoreMajorAsync(IdViewModel id)
        {
            Require.NotNull(id, nameof(id));

            var major = await _majorsLogic.RestoreMajorAsync(id.Id);
            var model = Mapper.Map<MajorViewModel>(major);
            return Ok(new ApiJsonResponse(model));
        }
    }
}