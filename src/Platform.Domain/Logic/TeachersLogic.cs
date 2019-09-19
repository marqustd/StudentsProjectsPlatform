using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Platform.Domain.Logic.Interfaces;
using Platform.Infrastructure;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models.Exceptions;
using Platform.Infrastructure.ViewModels.Account;
using Platform.Infrastructure.ViewModels.User;
using Platform.Utilities;
using Platform.Utilities.Utilities;

namespace Platform.Domain.Logic
{
    internal class TeachersLogic : ITeachersLogic
    {
        private readonly IPlatformRepository _platformRepository;
        private readonly IUsersCommonLogic _usersCommonLogic;

        public TeachersLogic(IPlatformRepository platformRepository, IUsersCommonLogic usersCommonLogic)
        {
            _platformRepository = platformRepository;
            _usersCommonLogic = usersCommonLogic;
        }

        public async Task<int> ImportTeachersAsync(IEnumerable<AddUserViewModel> addTeacherModels)
        {
            var teachers = addTeacherModels.Select(MapModelToTeacher).ToArray();
            await _usersCommonLogic.RegisterRangeAsync(teachers);
            await _platformRepository.AddRangeAsync(teachers);
            return teachers.Length;
        }

        public async Task<Teacher> AddTeacherAsync(AddUserViewModel model)
        {
            Require.NotNull(model, nameof(model));

            var teacher = await _platformRepository.GetForEmailAsync<Teacher>(model.Email);

            if (teacher != null)
            {
                throw new ConflictException($"Teacher with email {model.Email} already exists");
            }

            if (!EmailVerifier.IsFormatCorrect(model.Email))
            {
                throw new ArgumentException("Wrong email format", nameof(model.Email));
            }

            var newTeacher = MapModelToTeacher(model);

            await _usersCommonLogic.RegisterAsync(newTeacher);

            await _platformRepository.AddAsync(newTeacher);
            return newTeacher;
        }

        public async Task<Teacher> ObsoleteTeacherAsync(int id)
        {
            var teacher = await _platformRepository.GetForIdAsync<Teacher>(id);
            if (teacher == null)
            {
                throw new NotFoundException($"No teacher with id {id}");
            }

            teacher.Obsolete = true;
            await _platformRepository.UpdateAsync(teacher);
            return teacher;
        }

        public async Task<Teacher> GetTeacherAsync(int id)
        {
            var teacher = await _platformRepository.GetForIdAsync<Teacher>(id);
            if (teacher == null)
            {
                throw new NotFoundException($"No teacher with id {id}");
            }

            return teacher;
        }

        public async Task<Tuple<IEnumerable<Teacher>, int>> FetchTeachersAsync(string search, int index, int count,
            bool obsolete)
        {
            Require.NotNull(search, nameof(search));

            var teachers = _platformRepository.FindUserForFullName<Teacher>(search);
            if (obsolete)
            {
                var amount = await teachers.CountAsync();
                var filtered = await teachers
                    .OrderBy(a => a.LastName)
                    .Skip(index)
                    .Take(count)
                    .ToListAsync();
                return new Tuple<IEnumerable<Teacher>, int>(filtered, amount);
            }
            else
            {
                var amount = await teachers.Where(s => !s.Obsolete).CountAsync();
                var filtered = await teachers.Where(s => !s.Obsolete)
                    .OrderBy(a => a.LastName)
                    .Skip(index)
                    .Take(count)
                    .ToListAsync();
                return new Tuple<IEnumerable<Teacher>, int>(filtered, amount);
            }
        }

        public async Task<Teacher> EditTeacherAsync(EditUserViewModel editModel)
        {
            Require.NotNull(editModel, nameof(editModel));

            var teacher = await _platformRepository.GetForIdAsync<Teacher>(editModel.Id);

            if (!string.IsNullOrWhiteSpace(editModel.Email))
            {
                if (!EmailVerifier.IsFormatCorrect(editModel.Email))
                {
                    throw new ArgumentException("Wrong email format", nameof(editModel.Email));
                }

                var model = new SystemIdEmailModel
                {
                    Email = editModel.Email,
                    SystemId = teacher.SystemId
                };

                await _usersCommonLogic.ChangeEmailAsync(model);
                teacher.Email = editModel.Email;
            }

            teacher.FirstName = editModel.FirstName ?? teacher.FirstName;
            teacher.LastName = editModel.LastName ?? teacher.LastName;
            await _platformRepository.UpdateAsync(teacher);
            return teacher;
        }

        public async Task<Teacher> RestoreTeacherAsync(int id)
        {
            var teacher = await _platformRepository.GetForIdAsync<Teacher>(id);
            if (teacher == null)
            {
                throw new NotFoundException($"No Teacher with id {id}");
            }

            if (!teacher.Obsolete)
            {
                throw new ConflictException($"Teacher with id {id} is not obsoleted.");
            }

            teacher.Obsolete = false;
            await _platformRepository.UpdateAsync(teacher);
            return teacher;
        }

        public async Task<Teacher> GetTeacherForSystemIdAsync(string systemId)
        {
            Require.NotEmpty(systemId, nameof(systemId));

            var teacher = await _platformRepository.GetUserForSystemIdAsync<Teacher>(systemId);
            if (teacher == null)
            {
                throw new NotFoundException($"No teacher with systemId {systemId}");
            }

            return teacher;
        }

        private static Teacher MapModelToTeacher(AddUserViewModel model)
        {
            return new Teacher
            {
                FirstName = model.FirstName,
                Email = model.Email,
                LastName = model.LastName,
                Obsolete = false
            };
        }
    }
}