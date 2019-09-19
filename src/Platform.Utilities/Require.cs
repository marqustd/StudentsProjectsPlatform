using System;

namespace Platform.Utilities
{
    public static class Require
    {
        public static void NotNull<TEx>(object obj, string paramName) where TEx : Exception
        {
            if (obj == null)
            {
                throw (Exception) Activator.CreateInstance(typeof(TEx), (object) paramName);
            }
        }

        public static void NotNull(object obj, string paramName)
        {
            NotNull<ArgumentNullException>(obj, paramName);
        }

        public static void NotEmpty(object[] array, string paramName)
        {
            NotNull<ArgumentNullException>(array, paramName);
            if (array.Length == 0)
            {
                throw (Exception) Activator.CreateInstance(typeof(ArgumentException), (object) paramName);
            }
        }

        public static void NotEmpty(string str, string paramName)
        {
            NotNull<ArgumentNullException>(str, paramName);
            if (string.IsNullOrWhiteSpace(str))
            {
                throw (Exception) Activator.CreateInstance(typeof(ArgumentException), (object) paramName);
            }
        }
    }
}