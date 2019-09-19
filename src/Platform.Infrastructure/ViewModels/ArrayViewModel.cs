using System.Collections.Generic;
using Platform.Infrastructure.ViewModels.Helpers;

namespace Platform.Infrastructure.ViewModels
{
    public class ArrayViewModel<T> : IViewModelVerify where T : class
    {
        public ArrayViewModel()
        {
        }

        public ArrayViewModel(IEnumerable<T> objects, int count)
        {
            Array = objects;
            TotalCount = count;
        }

        public IEnumerable<T> Array { get; set; }
        public int TotalCount { get; set; }
    }
}