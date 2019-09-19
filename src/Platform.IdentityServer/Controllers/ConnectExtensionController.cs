using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Platform.IdentityServer.Models;
using Platform.IdentityServer.Services;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.ViewModels.Account;
using Platform.Utilities.Utilities;
using static IdentityServer4.IdentityServerConstants;
using GoogleRegisterViewModel = Platform.IdentityServer.Models.GoogleRegisterViewModel;

namespace Platform.IdentityServer.Controllers
{
    [Authorize(LocalApi.PolicyName)]
    [Route("connect/[action]")]
    public class
        ConnectExtensionController : Controller // todo add api authorization http://docs.identityserver.io/en/latest/topics/add_apis.html
    {
        private readonly UserManager<AppUser> userManager;

        public ConnectExtensionController(UserManager<AppUser> userManager)
        {
            this.userManager = userManager;
        }

        [HttpPost]
        public async Task<IActionResult> GoogleRegister([FromBody] GoogleRegisterViewModel model)
        {
            var payload = await GoogleJsonWebSignature.ValidateAsync(model.GoogleTokenId);
            var googleId = payload.Subject;
            var email = payload.Email;

            if (EmailVerifier.IsEmailTaken(email, userManager))
            {
                return Conflict(new ApiJsonResponse
                {
                    Errors = new[]
                    {
                        new ApiJsonError
                        {
                            Message = "Email is already in use",
                            Location = nameof(ConnectExtensionController)
                        }
                    }
                });
            }

            var googleUserManager = new GoogleUserManager(userManager);
            var user = await googleUserManager.Create(
                model.FirstName,
                model.LastName,
                model.AlbumNumber,
                googleId,
                email);

            if (user == null)
            {
                return BadRequest(new ApiJsonResponse(new ApiJsonError
                {
                    Code = (int) ApiJsonErrorCodes.BadRequest,
                    Message = "SERVER ERROR: Can't create student user",
                    Location = nameof(Register)
                }));
            }

            return Ok(new ApiJsonResponse(new SystemIdEmailModel
            {
                Email = user.Email,
                SystemId = user.Id
            }));
        }

        [HttpPost]
        public async Task<IActionResult> RegisterRange([FromBody] IEnumerable<RegisterViewModel> models)
        {
            try
            {
                var users = new List<SystemIdEmailModel>();
                var errors = new List<SystemIdEmailModel>();

                foreach (var model in models)
                {
                    var user = new AppUser();

                    if (!EmailVerifier.IsFormatCorrect(model.Email))
                    {
                        errors.Add(new SystemIdEmailModel
                        {
                            Email = model.Email,
                            SystemId = "Wrong email format"
                        });
                        break;
                    }

                    if (EmailVerifier.IsEmailTaken(model.Email, userManager))
                    {
                        errors.Add(new SystemIdEmailModel
                        {
                            Email = model.Email,
                            SystemId = "Email is already taken."
                        });
                        break;
                    }

                    user.UserName = model.Email;
                    user.Email = model.Email;
                    user.EmailConfirmed = true;

                    user.PasswordHash = userManager.PasswordHasher.HashPassword(user, model.Password);

                    // Create account
                    var result = await userManager.CreateAsync(user);
                    if (result.Succeeded)
                    {
                        result = await userManager.AddToRoleAsync(user,
                            model.Role.ToString());
                        if (result.Succeeded)
                        {
                            users.Add(new SystemIdEmailModel
                            {
                                Email = model.Email,
                                SystemId = user.Id
                            });
                        }
                    }
                }

                if (errors.Count == 0)
                {
                    return new OkObjectResult(new ApiJsonResponse(users));
                }

                if (users.Count != 0)
                {
                    return new OkObjectResult(new ApiJsonResponse(users, errors));
                }

                return new BadRequestObjectResult(new ApiJsonResponse(errors.Select(e => new ApiJsonError
                {
                    Code = (int) ApiJsonErrorCodes.BadRequest,
                    Message = e.Email + " : " + e.SystemId
                })));
            }
            catch (Exception e)
            {
                return BadRequest(new ApiJsonResponse(new ApiJsonError
                {
                    Code = (int) ApiJsonErrorCodes.BadRequest,
                    Message = "Unknown error occured",
                    Location = e.Source
                }));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            try
            {
                var user = new AppUser();

                if (!EmailVerifier.IsFormatCorrect(model.Email))
                {
                    return BadRequest(new ApiJsonResponse(new ApiJsonError
                    {
                        Code = (int) ApiJsonErrorCodes.BadRequest,
                        Message = "Wrong email format",
                        Location = nameof(ConnectExtensionController)
                    }));
                }

                if (EmailVerifier.IsEmailTaken(model.Email, userManager))
                {
                    return Conflict(new ApiJsonResponse(new ApiJsonError
                    {
                        Code = (int) ApiJsonErrorCodes.Conflict,
                        Message = "Email is already in use",
                        Location = nameof(ConnectExtensionController)
                    }));
                }

                user.UserName = model.Email;
                user.Email = model.Email;
                user.EmailConfirmed = true;

                user.PasswordHash = userManager.PasswordHasher.HashPassword(user, model.Password);

                // Create account
                var result = await userManager.CreateAsync(user);
                if (result.Succeeded)
                {
                    result = await userManager.AddToRoleAsync(user,
                        model.Role.ToString());
                    if (result.Succeeded)
                    {
                        return Ok(new ApiJsonResponse
                        {
                            Data = user.Id
                        });
                    }
                }

                return BadRequest(new ApiJsonResponse(
                    result.Errors.Select(error => new ApiJsonError
                        {Message = error.Description, Location = nameof(userManager)}).ToArray()));
            }
            catch (Exception e)
            {
                return BadRequest(new ApiJsonResponse(new ApiJsonError
                {
                    Code = (int) ApiJsonErrorCodes.BadRequest,
                    Message = "Unknown error occured",
                    Location = e.Source
                }));
            }
        }

        [HttpPost]
        public async Task<IActionResult> Email([FromBody] SystemIdEmailModel model)
        {
            var user = await userManager.Users.FirstOrDefaultAsync(u => u.Id == model.SystemId);
            if (user == null)
            {
                return NotFound(new ApiJsonResponse(new ApiJsonError
                {
                    Code = (int) ApiJsonErrorCodes.NotFound,
                    Message = $"No user with {model.SystemId} found."
                }));
            }

            if (user.Email != model.Email)
            {
                if (!EmailVerifier.IsFormatCorrect(model.Email))
                {
                    return BadRequest(new ApiJsonResponse(new ApiJsonError
                    {
                        Code = (int) ApiJsonErrorCodes.BadRequest,
                        Message = "Wrong email format."
                    }));
                }

                if (EmailVerifier.IsEmailTaken(model.Email, userManager, user.Id))
                {
                    return Conflict(new ApiJsonResponse(new ApiJsonError
                    {
                        Code = (int) ApiJsonErrorCodes.Conflict,
                        Message = "Email already in use."
                    }));
                }

                user.Email = model.Email;
            }

            await userManager.UpdateAsync(user);
            return Ok();
        }
    }
}