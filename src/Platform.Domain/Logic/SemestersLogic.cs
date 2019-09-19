using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Platform.Domain.Logic.Interfaces;
using Platform.Domain.Utilities;
using Platform.Infrastructure;
using Platform.Infrastructure.Dal;
using Platform.Infrastructure.Entities;
using Platform.Infrastructure.Models;
using Platform.Infrastructure.Models.Exceptions;
using Platform.Infrastructure.ViewModels;
using Platform.Infrastructure.ViewModels.Semester;
using Platform.Utilities;

namespace Platform.Domain.Logic
{
    internal class SemestersLogic : ISemestersLogic
    {
        private readonly IDateTimeProvider _dateTimeProvider;
        private readonly IPlatformRepository _platformRepository;
        private readonly ISubjectsDal _subjectsDal;

        public SemestersLogic(IPlatformRepository platformRepository, ISubjectsDal subjectsDal,
            IDateTimeProvider dateTimeProvider)
        {
            _platformRepository = platformRepository;
            _subjectsDal = subjectsDal;
            _dateTimeProvider = dateTimeProvider;
        }

        public async Task<Semester> AddSemesterToSubjectAsync(AddSemesterToSubjectViewModel model)
        {
            Require.NotNull(model, nameof(model));
            Require.NotEmpty(model.Password, nameof(model.Password));

            var subject = await _subjectsDal.GetSubjectWithSemestersAsync(model.SubjectId);

            if (subject.Semesters.FirstOrDefault(s => s.Password == model.Password && !s.Obsolete) != null)
            {
                throw new ConflictException("There already is a semester with this password");
            }

            var major = await _platformRepository.GetForIdAsync<Major>(model.MajorId);

            var semester = new Semester
            {
                Major = major,
                Password = model.Password,
                Year = _dateTimeProvider.Today.Year,
                Season = _dateTimeProvider.SeasonNow
            };

            await _platformRepository.AddAsync(semester);
            subject.Semesters.Add(semester);
            await _platformRepository.UpdateAsync(subject);
            return semester;
        }

        public Task<Semester> GetSemesterAsync(int semesterId)
        {
            return _platformRepository.GetForIdAsync<Semester>(semesterId,
                x => x.Include(y => y.Subject).Include(z => z.Major));
        }

        public async Task<Semester> ObsoleteSemesterAsync(int id)
        {
            var semester = await _platformRepository.GetForIdAsync<Semester>(id);

            if (semester.Obsolete)
            {
                throw new ConflictException($"Semester with id {id} is already obsoleted");
            }

            semester.Obsolete = true;
            await _platformRepository.UpdateAsync(semester);
            return semester;
        }

        public async Task<Semester> RestoreSemesterAsync(int id)
        {
            var semester = await _platformRepository.GetForIdAsync<Semester>(id);

            if (!semester.Obsolete)
            {
                throw new ConflictException($"Semester with id {id} is not obsoleted");
            }

            semester.Obsolete = false;
            await _platformRepository.UpdateAsync(semester);
            return semester;
        }

        public async Task<Semester> ChangeSemesterStateAsync(ChangeStateViewModel model)
        {
            Require.NotNull(model, nameof(model));

            var semester = await _platformRepository.GetForIdAsync<Semester>(model.SemesterId, 
                x => x.Include(y => y.Major));

            if (semester.State == (State)model.State)
            {
                throw new ConflictException($"Semester with id {model.SemesterId} has already state {model.State}");
            }

            semester.State = (State)model.State;
            await _platformRepository.UpdateAsync(semester);
            return semester;
        }

        public async Task<Semester> EditSemesterAsync(EditSemesterViewModel model)
        {
            Require.NotNull(model, nameof(model));

            var semester = await _platformRepository.GetForIdAsync<Semester>(model.Id);

            semester.State = model.State ?? semester.State;
            semester.Password = string.IsNullOrWhiteSpace(model.Password) ? semester.Password : model.Password;

            await _platformRepository.UpdateAsync(semester);
            return semester;
        }

        public async Task<(IEnumerable<Semester>, int)> FetchSemestersAsync(int subjectId, int index, int count)
        {
            var semesters = _subjectsDal.GetSubjectsSemesters(subjectId);
            var amount = await semesters.CountAsync();
            var filtered = await semesters
                .OrderBy(a => a.Id) // Cant order by calculated value [name] before executing query
                .Skip(index)
                .Take(count)
                .ToListAsync();
            return (filtered, amount);
        }
    }
}