using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Platform.Infrastructure.Entities;

namespace Platform.Infrastructure
{
    public interface IPlatformRepository
    {
        Task SaveChanges();
        Task<Student> GetStudentForAlbumAsync(int albumNumber);
        Task<int> UpdateAsync<T>(T obj) where T : PlatformEntity;
        Task<int> AddAsync<T>(T obj) where T : PlatformEntity;
        Task<int> AddRangeAsync<T>(params T[] entities) where T : PlatformEntity;

        /// <param name="id">Entity id</param>
        /// <param name="expression">Extender for query, could be used to pass Include()</param>
        Task<T> GetForIdAsync<T>(int id, Func<IQueryable<T>, IQueryable<T>> expression = null) where T : PlatformEntity;

        Task<T> GetForEmailAsync<T>(string email) where T : User;
        Task<T> GetForNameAsync<T>(string name) where T : PlatformEntityWithName;
        IQueryable<T> FindForName<T>(string search) where T : PlatformEntityWithName;
        IQueryable<T> FindUserForFullName<T>(string search) where T : User;
        Task<T> GetUserForSystemIdAsync<T>(string systemId) where T : User;
        Task<int> RemoveAsync<T>(T entity) where T : PlatformEntity;
        EntityEntry GetEntityEntry<T>(T entity) where T : class;
    }
}