using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using Platform.UserGenerator.Core.Models;

namespace Platform.UsersGenerator
{
    internal class FileHelper
    {
        public void SaveToFile(string filename, IEnumerable<AddUserViewModel> users)
        {
            using (var file = File.CreateText(filename))
            {
                var serializer = new JsonSerializer();
                serializer.Serialize(file, users);
            }
        }

        public void SaveToFile(string filename, IEnumerable<AddStudentViewModel> students)
        {
            using (var file = File.CreateText(filename))
            {
                var serializer = new JsonSerializer();
                serializer.Serialize(file, students);
            }
        }
    }
}