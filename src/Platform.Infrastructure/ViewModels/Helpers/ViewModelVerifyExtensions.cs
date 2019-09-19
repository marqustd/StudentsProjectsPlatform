using System;
using System.Collections;
using System.Linq;
using System.Reflection;
using Platform.Infrastructure.ViewModels.Helpers.Attributes;

namespace Platform.Infrastructure.ViewModels.Helpers
{
    /// <summary>
    ///     Extension for <see cref="IViewModelVerify" />.
    ///     Enables verifying view models that implement <see cref="IViewModelVerify" /> interface. Doesn't support: struct.
    /// </summary>
    public static class ViewModelVerifyExtensions
    {
        /// <summary>
        ///     Verifies if view model is correct. Returns void if correct, else throws <see cref="ArgumentException" />
        /// </summary>
        /// <exception cref="ArgumentException">
        ///     If model is not valid throws exception with param name
        /// </exception>
        /// <param name="model"></param>
        /// <returns></returns>
        public static void Verify(this IViewModelVerify model)
        {
            VerifyObject(model);
        }

        private static void VerifyObject(object obj)
        {
            var type = obj.GetType();
            var props = type.GetProperties();

            foreach (var prop in props)
            {
                // Check if value or reference type
                if (prop.PropertyType.IsValueType)
                {
                    CheckValueType(prop, prop.GetValue(obj));
                }
                else
                {
                    CheckReferenceType(prop, prop.GetValue(obj));
                }
            }
        }

        private static void CheckValueType(PropertyInfo prop, object obj)
        {
            var allowsNull = prop.GetCustomAttribute<AllowNullOrEmptyAttribute>() != null;

            var type = prop.PropertyType;
            var underlyingType = Nullable.GetUnderlyingType(type);

            // Check if is nullable
            if (underlyingType != null)
            {
                // Check if null
                if (!allowsNull)
                {
                    if (obj == null)
                    {
                        throw new ArgumentException($"{prop.Name} can't be null", prop.Name);
                    }
                }

                type = underlyingType;
            }

            var propAttributes = prop.GetCustomAttributes();
            var verifiers = propAttributes.Where(a => a.GetType().GetInterfaces().Contains(typeof(IPropertyVerify)));

            foreach (var v in verifiers)
            {
                var exception = typeof(IPropertyVerify)
                    .GetMethods()
                    .FirstOrDefault()
                    .MakeGenericMethod(type)
                    .Invoke(v, new[] {obj});

                if (exception != null)
                {
                    throw exception as ArgumentException;
                }
            }
        }


        private static void CheckReferenceType(PropertyInfo prop, object obj)
        {
            var allowsNull = prop.GetCustomAttribute<AllowNullOrEmptyAttribute>() != null;

            // Check if null
            if (!allowsNull)
            {
                if (obj == null)
                {
                    throw new ArgumentException($"{prop.Name} can't be null", prop.Name);
                }

                // Check for string
                if (obj is string str)
                {
                    CheckString(str, prop.Name);
                    return;
                }
            }
            else if (obj == null)
            {
                return;
            }

            // If property is an array excluding string
            if (!prop.PropertyType.IsEquivalentTo(typeof(string))
                && prop.PropertyType.GetInterfaces().Contains(typeof(IEnumerable)))
            {
                CheckArray(prop, obj);
                return;
            }

            // Get property object's properties
            var propertyProps = prop.PropertyType.GetProperties();

            foreach (var p in propertyProps)
            {
                // Check if value or reference type
                if (prop.PropertyType.IsValueType)
                {
                    CheckValueType(prop, prop.GetValue(obj));
                }
                else
                {
                    CheckReferenceType(prop, prop.GetValue(obj));
                }
            }
        }

        private static void CheckArray(PropertyInfo prop, object obj)
        {
            Type type;
            foreach (var el in (IEnumerable) obj)
            {
                type = el?.GetType();
                if (type == null)
                {
                    throw new ArgumentException($"{prop.Name} item value can't be null", prop.Name);
                }

                if (el is string str)
                {
                    CheckString(str, $"{prop.Name} item");
                }
                else if (!type.IsValueType)
                {
                    VerifyObject(el);
                }

                // If array has value type items, they are not verified
            }
        }

        private static void CheckString(string str, string propName)
        {
            if (string.IsNullOrWhiteSpace(str))
            {
                throw new ArgumentException($"{propName} value can't be null or empty", propName);
            }
        }
    }
}