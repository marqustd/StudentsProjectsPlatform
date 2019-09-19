using System.ComponentModel.DataAnnotations;

namespace Platform.Infrastructure.Entities
{
    public sealed class StudentSection
    {
        public StudentSection()
        {
        }

        public StudentSection(Student student, Section section, Semester semester, Topic topic, Subject subject)
        {
            Section = section;
            Student = student;
            Subject = subject;
            Topic = topic;
            Semester = semester;
        }

        public Student Student { get; set; }
        public int StudentId { get; set; }
        public Section Section { get; set; }
        public int SectionId { get; set; }

        [Range(2, 5)]
        public int? Grade { get; set; } = null;

        public Subject Subject { get; set; }


        public Topic Topic { get; set; }


        public Semester Semester { get; set; }
    }
}