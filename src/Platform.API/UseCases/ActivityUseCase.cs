using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Platform.Domain;
using Platform.Domain.Logic.Interfaces;
using Platform.Domain.Utilities;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Activity;
using Platform.Infrastructure.ViewModels.Comment;

namespace Platform.API.UseCases
{
    public class ActivityUseCase : UseCase
    {
        private readonly IActivitiesLogic _activitiesLogic;

        public ActivityUseCase(IActivitiesLogic activitiesLogic)
        {
            _activitiesLogic = activitiesLogic;
        }

        public async Task<IActionResult> GetActivity(int activityId)
        {
            var activity = await _activitiesLogic.GetActivityAsync(activityId);
            var models = Mapper.Map<ActivityViewModel>(activity);
            return Ok(new ApiJsonResponse(models));
        }

        public async Task<IActionResult> GetActivitiesCommentsAsync(int activityId)
        {
            var comments = await _activitiesLogic.GetActivityCommentsAsync(activityId);
            var models = Mapper.Map<CommentViewModel[]>(comments);
            return Ok(new ApiJsonResponse(models));
        }

        public async Task<IActionResult> AddCommentAsync(AddCommentViewModel model, User user)
        {
            var comments = await _activitiesLogic.AddCommentToActivityAsync(model.ActivityId, model.Content, user);
            var models = Mapper.Map<CommentViewModel[]>(comments);
            return Ok(new ApiJsonResponse(models));
        }

        public async Task<IActionResult> GetActivityForStudent(int studentId, int activityId)
        {
            var vm = await _activitiesLogic.GetActivityForStudent(studentId, activityId);
            
            return Ok(new ApiJsonResponse<ActivityForStudentVewModel>(vm));
        }

        public async Task<IActionResult> CheckAllAsync(CheckAllViewModel model)
        {
            await _activitiesLogic.CheckAllStudents(model);
            return await FetchChecks(model.ActivityId, 0, Settings.PAGE_SIZE);
        }

        public async Task<IActionResult> CheckStudentAsync(CheckViewModel model)
        {
            var vm = await _activitiesLogic.CheckStudent(model);
            return Ok(new ApiJsonResponse(vm));
        }

        public async Task<IActionResult> FetchChecks(int activityId, int index, int count)
        {
            var (vm, amount) = await _activitiesLogic.FetchChecks(activityId, index, count);
            return Ok(new ApiJsonResponse(new ArrayViewModel<CheckedStudentViewModel>(vm, amount)));
        }
    }
}