using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Platform.IdentityServer.Controllers;
using Platform.Infrastructure;
using Platform.Infrastructure.IdentityServer;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.ViewModels.Account;
using Platform.Utilities;
using Platform.Utilities.Utilities;

namespace Platform.API.UseCases
{
    public class UserUseCase : Controller
    {
        private readonly IIdentityServerProxy _identityServer;
        private readonly IPlatformRepository _platformRepository;

        public UserUseCase(IPlatformRepository platformRepository, IIdentityServerProxy identityServer)
        {
            _platformRepository = platformRepository;
            _identityServer = identityServer;
        }

        public async Task<IActionResult> Refresh(RefreshTokenViewModel model)
        {
            Require.NotNull(model, nameof(model));

            var refreshResponse = await _identityServer.RefreshAsync(model);

            if (refreshResponse.IsError)
            {
                return Unauthorized(new ApiJsonResponse(new ApiJsonError
                {
                    Code = (int) ApiJsonErrorCodes.Unauthorized,
                    Message = refreshResponse.Error
                }));
            }

            return Ok(new ApiJsonResponse(refreshResponse.Json));
        }

        public async Task<IActionResult> Logout(LogoutViewModel model)
        {
            Require.NotNull(model, nameof(model));

            var tokenResponse = await _identityServer.LogoutAsync(model);

            if (tokenResponse.IsError)
            {
                return Unauthorized(new ApiJsonResponse(new ApiJsonError
                {
                    Message = tokenResponse.Error
                }));
            }

            return Ok(new ApiJsonResponse(tokenResponse.Json));
        }

        public async Task<IActionResult> GoogleRegister(GoogleRegisterViewModel model)
        {
            try
            {
                Require.NotNull(model, nameof(model));

                if (!model.Agree)
                {
                    return BadRequest(new ApiJsonResponse(new ApiJsonError
                    {
                        Message = "You have to agree to terms of agreement",
                        Location = nameof(UserUseCase)
                    }));
                }

                var student = await _platformRepository.GetStudentForAlbumAsync(model.AlbumNumber);
                if (student == null)
                {
                    return NotFound(new ApiJsonResponse(new ApiJsonError
                    {
                        Code = (int) ApiJsonErrorCodes.NotFound,
                        Message = "Album doesn't exists.",
                        Location = nameof(UserUseCase)
                    }));
                }

                if (!student.FirstName.Equals(model.FirstName) ||
                    !student.LastName.Equals(model.LastName))
                {
                    return BadRequest(new ApiJsonResponse(new ApiJsonError
                    {
                        Code = (int) ApiJsonErrorCodes.BadRequest,
                        Message = "First/Last name was incorrect",
                        Location = nameof(UserUseCase)
                    }));
                }

                if (student.Verified)
                {
                    return BadRequest(new ApiJsonResponse(new ApiJsonError
                    {
                        Code = (int) ApiJsonErrorCodes.BadRequest,
                        Message = "Student is already verified.",
                        Location = nameof(UserUseCase)
                    }));
                }

                var response = await _identityServer.GoogleRegisterAsync(model);

                if (response.StatusCode == HttpStatusCode.Conflict)
                {
                    return Conflict(new ApiJsonError
                    {
                        Code = (int) ApiJsonErrorCodes.Conflict,
                        Message = "Email is already in use."
                    });
                }

                response.EnsureSuccessStatusCode();
                var jsonResponse = await response.Content.ReadAsStringAsync();
                JsonConvert.DeserializeObject<ApiJsonResponse>(jsonResponse);
                var json = JsonConvert.DeserializeObject<ApiJsonResponse<SystemIdEmailModel>>(jsonResponse);

                student.SystemId = json.Data.SystemId;
                student.Email = json.Data.Email;
                student.Verified = true;
                await _platformRepository.UpdateAsync(student);

                return Ok(new ApiJsonResponse());
            }
            catch (HttpRequestException e)
            {
                return BadRequest(new ApiJsonResponse(new ApiJsonError
                {
                    Code = (int) ApiJsonErrorCodes.ThirdParty,
                    Message = e.Message,
                    Location = e.Source
                }));
                //todo first check then register
            }
        }

        public async Task<IActionResult> GoogleLogin(GoogleLoginViewModel model)
        {
            Require.NotNull(model, nameof(model));

            var response = await _identityServer.GoogleLoginAsync(model);

            if (!response.IsError)
            {
                return Ok(new ApiJsonResponse(response.Json));
            }

            return BadRequest(new ApiJsonResponse(new ApiJsonError
            {
                Code = (int) ApiJsonErrorCodes.BadRequest,
                Message = response.TryGet("Message")
            }));
        }

        public async Task<IActionResult> Login(LoginViewModel model)
        {
            Require.NotNull(model, nameof(model));

            var response = await _identityServer.LoginAsync(model);

            if (!response.IsError)
            {
                return Ok(new ApiJsonResponse(response.Json));
            }

            return BadRequest(new ApiJsonResponse(new ApiJsonError
            {
                Code = (int) ApiJsonErrorCodes.BadRequest,
                Message = response.TryGet("Message")
            }));
        }

        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            try
            {
                Require.NotNull(model, nameof(model));
                model.Role = SystemRoles.Student;
                // Check agree
                if (!model.Agree)
                {
                    return BadRequest(new ApiJsonResponse(new ApiJsonError
                    {
                        Code = (int) ApiJsonErrorCodes.BadRequest,
                        Message = "You have to agree to terms of agreement",
                        Location = nameof(ConnectExtensionController)
                    }));
                }

                if (!model.Password.Equals(model.ConfirmPassword))
                {
                    return BadRequest(new ApiJsonResponse(new ApiJsonError
                    {
                        Code = (int) ApiJsonErrorCodes.BadRequest,
                        Message = "Invalid confirm password",
                        Location = nameof(ConnectExtensionController)
                    }));
                }

                if (!PasswordVerifier.Verify(model.Password)) //todo ipasswordvalidators
                {
                    return BadRequest(new ApiJsonResponse(new ApiJsonError
                    {
                        Code = (int) ApiJsonErrorCodes.BadRequest,
                        Message = "Minimum password requirements are not met",
                        Location = nameof(ConnectExtensionController)
                    }));
                }

                if (!EmailVerifier.IsFormatCorrect(model.Email))
                {
                    return BadRequest(new ApiJsonResponse(new ApiJsonError
                    {
                        Code = (int) ApiJsonErrorCodes.BadRequest,
                        Message = "Invalid email format",
                        Location = nameof(ConnectExtensionController)
                    }));
                }

                // Check album number
                var student = await _platformRepository.GetStudentForAlbumAsync(model.AlbumNumber);
                if (student == null)
                {
                    return NotFound(new ApiJsonResponse(new ApiJsonError
                    {
                        Code = (int) ApiJsonErrorCodes.NotFound,
                        Message = "Album doesn't exist.",
                        Location = nameof(ConnectExtensionController)
                    }));
                }

                if (!student.FirstName.Equals(model.FirstName) ||
                    !student.LastName.Equals(model.LastName))
                {
                    return BadRequest(new ApiJsonResponse(new ApiJsonError
                    {
                        Code = (int) ApiJsonErrorCodes.BadRequest,
                        Message = "First/Last name was incorrect",
                        Location = nameof(ConnectExtensionController)
                    }));
                }

                if (student.Verified)
                {
                    return BadRequest(new ApiJsonResponse(new ApiJsonError
                    {
                        Code = (int) ApiJsonErrorCodes.BadRequest,
                        Message = "Student is already verified.",
                        Location = nameof(ConnectExtensionController)
                    }));
                }

                var response = await _identityServer.RegisterAsync(model);
                var jsonResponse = await response.Content.ReadAsStringAsync();

                if (response.StatusCode == HttpStatusCode.Conflict)
                {
                    return new ConflictResult(); //todo get more info from identity
                }

                response.EnsureSuccessStatusCode();
                student.Verified = true;
                var apiResponse = JsonConvert.DeserializeObject<ApiJsonResponse>(jsonResponse);
                student.SystemId = apiResponse.Data;
                student.Verified = true;
                await _platformRepository.UpdateAsync(student);
                return Ok(new ApiJsonResponse());
            }
            catch (HttpRequestException e)
            {
                return BadRequest(new ApiJsonResponse(new ApiJsonError
                {
                    Code = (int) ApiJsonErrorCodes.ThirdParty,
                    Message = e.Message,
                    Location = e.Source
                }));
                //todo first check then register
            }
        }
    }
}