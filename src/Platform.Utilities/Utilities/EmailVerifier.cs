using System;
using System.Linq;
using System.Net.Mail;
using Microsoft.AspNetCore.Identity;

namespace Platform.Utilities.Utilities
{
    public class EmailVerifier
    {
        public static bool IsFormatCorrect(string email)
        {
            Require.NotEmpty(email, nameof(email));

            try
            {
                var adr = new MailAddress(email);
                return adr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        public static bool IsEmailTaken<T>(string email, UserManager<T> userManager, string systemId = null)
            where T : IdentityUser
        {
            Require.NotEmpty(email, nameof(email));
            var checkSystemId = new Func<IdentityUser, bool>(user => systemId == null ? true : user.Id != systemId);

            return userManager.Users.Any(u =>
                email.Equals(u.Email, StringComparison.OrdinalIgnoreCase) && checkSystemId(u));
        }
    }
}