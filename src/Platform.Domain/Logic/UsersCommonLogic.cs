using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.IdentityServer;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.Models.Exceptions;
using Platform.Infrastructure.ViewModels.Account;
using Platform.Utilities;

namespace Platform.Domain.Logic
{
    internal class UsersCommonLogic : IUsersCommonLogic
    {
        private readonly IIdentityServerProxy _identityServer;

        public UsersCommonLogic(IIdentityServerProxy identityServer)
        {
            _identityServer = identityServer;
        }

        public async Task ChangeEmailAsync(SystemIdEmailModel model)
        {
            Require.NotNull(model, nameof(model));

            var response = await _identityServer.ChangeEmailAsync(model);
            switch (response.StatusCode)
            {
                case HttpStatusCode.Conflict:
                    throw new ConflictException($"Email {model.Email} already in use.");
                case HttpStatusCode.NotFound:
                    throw new NotFoundException($"No user with systemId {model.SystemId} found");
                default:
                    response.EnsureSuccessStatusCode();
                    break;
            }
        }

        public async Task RegisterAsync<T>(T model) where T : User
        {
            Require.NotNull(model, nameof(model));

            var registerModel = new RegisterViewModel
            {
                Agree = true,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.FirstName,
                Password = "password", //todo HARDCODED PASSOWORD
                ConfirmPassword = "password"
            };

            switch (model)
            {
                case Teacher _:
                    registerModel.Role = SystemRoles.Teacher;
                    break;
                case Admin _:
                    registerModel.Role = SystemRoles.Admin;
                    break;
                case Student _:
                    registerModel.Role = SystemRoles.Student;
                    break;
            }


            var response = await _identityServer.RegisterAsync(registerModel);
            if (response.StatusCode == HttpStatusCode.Conflict)
            {
                throw new ConflictException($"User with email {model.Email} is already registered");
            }

            response.EnsureSuccessStatusCode();

            var jsonResponse = await response.Content.ReadAsStringAsync();


            response.EnsureSuccessStatusCode();
            var apiResponse = JsonConvert.DeserializeObject<ApiJsonResponse>(jsonResponse);
            model.SystemId = apiResponse.Data;
        }

        public async Task RegisterRangeAsync<T>(params T[] models) where T : User
        {
            Require.NotEmpty(models, nameof(models));

            var registerModels = models.Select(model => new RegisterViewModel
            {
                Agree = true,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.FirstName,
                Password = "password", //todo HARDCODED PASSOWORD
                ConfirmPassword = "password"
            }).ToList();

            switch (models.FirstOrDefault())
            {
                case Teacher _:
                {
                    foreach (var model in registerModels)
                    {
                        model.Role = SystemRoles.Teacher;
                    }

                    break;
                }
                case Admin _:
                {
                    foreach (var model in registerModels)
                    {
                        model.Role = SystemRoles.Admin;
                    }

                    break;
                }
                case Student _:
                {
                    foreach (var model in registerModels)
                    {
                        model.Role = SystemRoles.Student;
                    }

                    break;
                }
            }


            var response = await _identityServer.RegisterRangeAsync(registerModels.ToArray());
            response.EnsureSuccessStatusCode();
            var jsonResponse = await response.Content.ReadAsStringAsync();


            response.EnsureSuccessStatusCode();
            var apiResponse = JsonConvert.DeserializeObject<ApiJsonResponse>(jsonResponse);
            SystemIdEmailModel[] systemIds =
                JsonConvert.DeserializeObject<SystemIdEmailModel[]>(JsonConvert.SerializeObject(apiResponse.Data));

            foreach (var model in models)
            {
                model.SystemId = systemIds.FirstOrDefault(s => s.Email == model.Email)?.SystemId;
            }
        }
    }
}