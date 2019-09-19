using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Platform.API.Controllers.Abstracts;
using Platform.API.UseCases;
using Platform.Infrastructure.ViewModels.Account;

namespace Platform.API.Controllers
{
    public class AccountController : ApiController
    {
        private readonly UserUseCase _userUseCase;

        public AccountController(UserUseCase userUseCase)
        {
            _userUseCase = userUseCase;
        }

        [HttpPost]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginViewModel model)
        {
            try
            {
                return await _userUseCase.GoogleLogin(model);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> GoogleRegister([FromBody] GoogleRegisterViewModel model)
        {
            try
            {
                return await _userUseCase.GoogleRegister(model);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel model)
        {
            try
            {
                return await _userUseCase.Register(model);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Refresh([FromBody] RefreshTokenViewModel model)
        {
            try
            {
                return await _userUseCase.Refresh(model);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            try
            {
                return await _userUseCase.Login(model);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Logout([FromBody] LogoutViewModel model)
        {
            try
            {
                return await _userUseCase.Logout(model);
            }
            catch (Exception e)
            {
                return HandleException(e);
            }
        }
    }
}