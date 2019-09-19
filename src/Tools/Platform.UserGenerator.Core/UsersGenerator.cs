using System;
using System.Collections.Generic;
using Platform.UserGenerator.Core.Extensions;
using Platform.UserGenerator.Core.Models;

namespace Platform.UserGenerator.Core
{
    public interface IUsersGenerator
    {
        IEnumerable<AddStudentViewModel> GenerateStudents(List<string> firstName, List<string> lastNames, int amount);
        IEnumerable<AddUserViewModel> GenerateTeachers(List<string> firstName, List<string> lastNames, int amount);
    }

    public class UsersGenerator : IUsersGenerator
    {
        public IEnumerable<AddStudentViewModel> GenerateStudents(List<string> firstName, List<string> lastNames,
            int amount)
        {
            var random = new Random();
            for (var i = 0; i < amount; i++)
            {
                var name = firstName[random.Next(0, firstName.Count - 1)];
                var lastName = lastNames[random.Next(0, lastNames.Count - 1)];
                var album = random.Next(100000, 999999);

                yield return new AddStudentViewModel
                {
                    AlbumNumber = album,
                    FirstName = name,
                    LastName = lastName,
                    MajorId = random.Next(1, 3)
                };
            }
        }

        public IEnumerable<AddUserViewModel> GenerateTeachers(List<string> firstName, List<string> lastNames,
            int amount)
        {
            var random = new Random();
            for (var i = 0; i < amount; i++)
            {
                var name = firstName[random.Next(0, firstName.Count - 1)];
                var lastName = lastNames[random.Next(0, lastNames.Count - 1)];

                yield return new AddUserViewModel
                {
                    FirstName = name,
                    LastName = lastName,
                    Email = name.ToLower().ToUnicode() + "." + lastName.ToLower().ToUnicode() +
                            $"{random.Next(1000, 9999)}@gmail.com"
                };
            }
        }
    }
}