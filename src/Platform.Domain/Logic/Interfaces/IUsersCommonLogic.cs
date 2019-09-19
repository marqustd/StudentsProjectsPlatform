using System.Threading.Tasks;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.ViewModels.Account;

namespace Platform.Domain.Logic.Interfaces
{
    internal interface IUsersCommonLogic
    {
        Task ChangeEmailAsync(SystemIdEmailModel model);
        Task RegisterAsync<T>(T model) where T : User;
        Task RegisterRangeAsync<T>(params T[] models) where T : User;
    }
}