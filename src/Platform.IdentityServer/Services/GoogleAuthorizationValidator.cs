using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Google.Apis.Auth;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Identity;
using Platform.IdentityServer.Models;

namespace Platform.IdentityServer.Services
{
    public class GoogleAuthorizationValidator : IExtensionGrantValidator
    {
        private readonly SignInManager<AppUser> signInManager;
        private readonly UserManager<AppUser> userManager;

        public GoogleAuthorizationValidator(
            SignInManager<AppUser> signInManager,
            UserManager<AppUser> userManager)
        {
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        public string GrantType => "google_token";

        public async Task ValidateAsync(ExtensionGrantValidationContext context)
        {
            context.Result.CustomResponse = new Dictionary<string, object>();
            try
            {
                // Validate token
                var tokenId = context.Request.Raw["token_id"];
                var payload = await GoogleJsonWebSignature.ValidateAsync(tokenId);
                var googleId = payload.Subject;

                var googleUser = userManager.Users.FirstOrDefault(u => u.GoogleId.Equals(googleId));
                if (googleUser == null)
                {
                    context.Result.IsError = true;
                    context.Result.Error = "User is not verified";
                    context.Result.CustomResponse.Add("Message", "User doesn't exist");
                    return;
                }

                var claims = await userManager.GetClaimsAsync(googleUser);

                context.Result = new GrantValidationResult(googleUser.Id, "google_token", claims);
            }
            catch (Exception e)
            {
                context.Result.IsError = true;
                context.Result.Error = e.Message;
                context.Result.CustomResponse.Add("Message", "Server error");
            }
        }
    }
}