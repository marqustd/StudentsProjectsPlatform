using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Forms;
using Platform.UserGenerator.Core;
using Platform.UserGenerator.Core.Models;

namespace Platform.UsersGenerator
{
    /// <summary>
    ///     Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private readonly List<string> firstNames = new List<string>
        {
            "Marek", "Wojciech", "Piotr", "Łukasz",
            "Weronika", "Marta", "Matylda", "Kamil",
            "Michał", "Ewa", "Justyna", "Anna",
            "Ewelina", "Przemysław", "Maciej", "Igor",
            "Konrad", "Bartek", "Kasia", "Przemek",
            "Katarzyna", "Wiktoria", "Natalia", "Seweryn",
            "Anna", "Jan", "Bartosz", "Patryk",
        };

        private readonly List<string> lastNames = new List<string>
        {
            "Krasucki", "Kulas", "Kaczorowski", "Naumowicz",
            "Grzegorzek", "Szczepanek", "Andrysiak", "Zaliczenie",
            "Dotnet", "Pączek", "Kabała", "Studio",
            "Generator", "Soszka", "Śmigiel", "Nowak",
            "Kowalski", "Połomski", "Wolański", "Kraszewski",
            "Jodłowski", "Budziszewski", "Nagórski", "Niziołek",
            "Rychel", "Stasiewicz", "Rico", "Ebisz",
            "Elerodo", "Telewizor", "Laptop", "Stół",
            "Adidas", "Tworkowski", "Drzwi", "Biegun",
            "Uchman", "Maryniak", "Michałek", "Nawrocki",
            "Orłowski", "Rosłaniec", "Śnieżek", "Kawecki",
            "Socha", "Kasiński", "Kraśniewski", "Loch",
            "Balcerak", "Sokalski", "Sowa", "Bronk",
        };

        private readonly IUsersGenerator usersGenerator = new UserGenerator.Core.UsersGenerator();
        private IEnumerable<AddStudentViewModel> students;

        private IEnumerable<AddUserViewModel> teachers;

        public MainWindow()
        {
            InitializeComponent();
            tbFirstNames.Text = ListToString(firstNames);
            tbLastNames.Text = ListToString(lastNames);
        }

        private string ListToString(IEnumerable<string> list)
        {
            return list.Aggregate(string.Empty, (current, el) => current + el + "\n");
        }

        private IEnumerable<string> StringToList(string toList)
        {
            return toList.Split(new[] {"\n"}, StringSplitOptions.RemoveEmptyEntries).ToList();
        }

        private string UsersToString(IEnumerable<AddUserViewModel> users)
        {
            return users.Aggregate(string.Empty,
                (current, el) => current + el.FirstName + " " + el.LastName + " " + el.Email + "\n");
        }

        private string UsersToString(IEnumerable<AddStudentViewModel> users)
        {
            return users.Aggregate(string.Empty,
                (current, el) => current + el.FirstName + " " + el.LastName + " " + el.AlbumNumber + "\n");
        }

        private void OnGenerateButton_Click(object sender, RoutedEventArgs e)
        {
            if (radioStudents.IsChecked.Value)
            {
                students = usersGenerator.GenerateStudents(firstNames, lastNames, int.Parse(tbAmount.Text));
                tbUsers.Text = UsersToString(students);
            }
            else
            {
                teachers = usersGenerator.GenerateTeachers(firstNames, lastNames, int.Parse(tbAmount.Text));
                tbUsers.Text = UsersToString(teachers);
            }
        }

        private void OnSaveButton_Click(object sender, RoutedEventArgs e)
        {
            if (radioStudents.IsChecked.Value)
            {
                var saveDialog = new SaveFileDialog
                {
                    Filter = "JSON|*.json",
                    Title = "Please select a json file.",
                    FileName = "students"
                };
                if (saveDialog.ShowDialog() == System.Windows.Forms.DialogResult.OK)
                {
                    new FileHelper().SaveToFile(saveDialog.FileName, students);
                }
            }
            else
            {
                var saveDialog = new SaveFileDialog
                {
                    Filter = "JSON|*.json",
                    Title = "Please select a json file.",
                    FileName = "teachers"
                };
                if (saveDialog.ShowDialog() == System.Windows.Forms.DialogResult.OK)
                {
                    new FileHelper().SaveToFile(saveDialog.FileName, teachers);
                }
            }
        }
    }
}