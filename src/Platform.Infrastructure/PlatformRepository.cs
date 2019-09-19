using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Platform.Infrastructure.Data;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models.Exceptions;
using Platform.Utilities;

namespace Platform.Infrastructure
{
    internal class PlatformRepository : IPlatformRepository
    {
        private readonly PlatformDbContext _dbContext;

        public PlatformRepository(PlatformDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Task<Student> GetStudentForAlbumAsync(int albumNumber)
        {
            return _dbContext.Students.FirstOrDefaultAsync(s => s.AlbumNumber == albumNumber);
        }

        public Task<int> UpdateAsync<T>(T obj) where T : PlatformEntity
        {
            Require.NotNull(obj, nameof(obj));

            var set = _dbContext.Set<T>();
            set.Update(obj);
            return _dbContext.SaveChangesAsync();
        }

        public async Task<int> AddAsync<T>(T obj) where T : PlatformEntity
        {
            Require.NotNull(obj, nameof(obj));

            var set = _dbContext.Set<T>();
            await set.AddAsync(obj);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<int> AddRangeAsync<T>(params T[] entities) where T : PlatformEntity
        {
            Require.NotEmpty(entities, nameof(entities));

            var set = _dbContext.Set<T>();
            await set.AddRangeAsync(entities);
            return await _dbContext.SaveChangesAsync();
        }

        public async Task<T> GetForIdAsync<T>(int id, Func<IQueryable<T>, IQueryable<T>> expression = null)
            where T : PlatformEntity
        {
            var query = _dbContext.Set<T>().AsQueryable();
            if (expression != null)
            {
                query = expression(query);
            }

            var entity = await query.FirstOrDefaultAsync(e => e.Id == id);
            if (entity == null)
            {
                throw new NotFoundException($"No {typeof(T).Name} with id {id} found");
            }

            return entity;
        }

        public Task<T> GetForEmailAsync<T>(string email) where T : User
        {
            Require.NotNull(email, nameof(email));

            var set = _dbContext.Set<T>();
            return set.AsNoTracking().FirstOrDefaultAsync(e => e.Email == email);
        }

        public Task<T> GetForNameAsync<T>(string name) where T : PlatformEntityWithName
        {
            Require.NotNull(name, nameof(name));

            var set = _dbContext.Set<T>();
            return set.AsNoTracking().FirstOrDefaultAsync(e => e.Name == name);
        }

        public IQueryable<T> FindForName<T>(string search) where T : PlatformEntityWithName
        {
            Require.NotNull(search, nameof(search));

            var set = _dbContext.Set<T>();
            var result = set.AsNoTracking().Where(e => e.Name.Contains(search, StringComparison.OrdinalIgnoreCase));
            return result;
        }

        public IQueryable<T> FindUserForFullName<T>(string search) where T : User
        {
            Require.NotNull(search, nameof(search));

            var set = _dbContext.Set<T>();
            var result = set.AsNoTracking().Where(e => e.FullName.Contains(search, StringComparison.OrdinalIgnoreCase));
            return result;
        }

        public Task<T> GetUserForSystemIdAsync<T>(string systemId) where T : User
        {
            Require.NotEmpty(systemId, nameof(systemId));

            var set = _dbContext.Set<T>();
            return set.FirstOrDefaultAsync(e => e.SystemId == systemId);
        }

        public Task<int> RemoveAsync<T>(T entity) where T : PlatformEntity
        {
            var set = _dbContext.Set<T>();
            set.Remove(entity);
            return _dbContext.SaveChangesAsync();
        }

        public EntityEntry GetEntityEntry<T>(T entity) where T : class
        {
            return _dbContext.Entry(entity);
        }

        public async Task SaveChanges()
        {
            await _dbContext.SaveChangesAsync();
        }
    }
}