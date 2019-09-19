using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models.Exceptions;
using Platform.Infrastructure.ViewModels.Major;
using Platform.Utilities;

namespace Platform.Domain.Logic
{
    internal class MajorsLogic : IMajorsLogic
    {
        private readonly IPlatformRepository _platformRepository;

        public MajorsLogic(IPlatformRepository platformRepository)
        {
            _platformRepository = platformRepository;
        }

        public async Task<Major> AddMajorAsync(AddMajorViewModel model)
        {
            Require.NotNull(model, nameof(model));

            if (await _platformRepository.GetForNameAsync<Major>(model.Name) != null)
            {
                throw new ConflictException($"Major {model.Name} already exists");
            }

            var major = new Major
            {
                Name = model.Name
            };
            await _platformRepository.AddAsync(major);
            return major;
        }

        public async Task<Major> ObsoleteMajorAsync(int id)
        {
            var major = await _platformRepository.GetForIdAsync<Major>(id);
            if (major == null)
            {
                throw new NotFoundException($"No Major with id {id}");
            }

            major.Obsolete = true;
            await _platformRepository.UpdateAsync(major);
            return major;
        }

        public Task<Major> GetMajorAsync(int id)
        {
            return _platformRepository.GetForIdAsync<Major>(id);
        }

        public async Task<Major> EditMajorAsync(MajorViewModel editModel)
        {
            Require.NotNull(editModel, nameof(editModel));

            var major = await _platformRepository.GetForNameAsync<Major>(editModel.Name);

            if (major != null && editModel.Id != major.Id)
            {
                throw new ConflictException($"Major with name {editModel.Name} already exists");
            }

            major = await _platformRepository.GetForIdAsync<Major>(editModel.Id);

            if (major == null)
            {
                throw new NotFoundException($"No Major with id {editModel.Id}");
            }

            major.Name = editModel.Name ?? major.Name;
            await _platformRepository.UpdateAsync(major);
            return major;
        }

        public async Task<Tuple<IEnumerable<Major>, int>> FetchMajorsAsync(string search, int index, int count,
            bool obsolete)
        {
            Require.NotNull(search, nameof(search));
            var majors = _platformRepository.FindForName<Major>(search);
            if (obsolete)
            {
                var amount = await majors.CountAsync();
                var filtered = await majors
                    .OrderBy(a => a.Name)
                    .Skip(index)
                    .Take(count)
                    .ToListAsync();
                return new Tuple<IEnumerable<Major>, int>(filtered, amount);
            }
            else
            {
                var amount = await majors.Where(s => !s.Obsolete).CountAsync();
                var filtered = await majors.Where(s => !s.Obsolete)
                    .OrderBy(a => a.Name)
                    .Skip(index)
                    .Take(count)
                    .ToListAsync();
                return new Tuple<IEnumerable<Major>, int>(filtered, amount);
            }
        }

        public async Task<Major> RestoreMajorAsync(int id)
        {
            var major = await _platformRepository.GetForIdAsync<Major>(id);
            if (major == null)
            {
                throw new NotFoundException($"No Major with id {id}");
            }

            if (!major.Obsolete)
            {
                throw new ConflictException($"Major with id {id} is not obsoleted.");
            }

            major.Obsolete = false;
            await _platformRepository.UpdateAsync(major);
            return major;
        }
    }
}