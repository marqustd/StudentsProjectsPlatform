using System.ComponentModel.DataAnnotations.Schema;

namespace Platform.Infrastructure.Entities
{
    [Table("ActivityChecks")]
    public class ActivityCheck
    {
        public ActivityCheck()
        {
        }

        public ActivityCheck(Student student, Activity activity)
        {
            Student = student;
            Activity = activity;
            StudentId = student.Id;
            ActivityId = activity.Id;
            IsChecked = false;
        }

        public Student Student { get; set; }
        public int StudentId { get; set; }
        public Activity Activity { get; set; }
        public int ActivityId { get; set; }
        public bool IsChecked { get; set; }
    }
}