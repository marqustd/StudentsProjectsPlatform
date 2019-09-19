using System;

namespace Platform.Infrastructure.ViewModels.Helpers.Attributes
{
    /// <summary>
    ///     Used by <see cref="ViewModelVerifyExtensions" />.
    ///     Specifies that property has to be positive number
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    internal sealed class PositiveNumberAttribute : Attribute, IPropertyVerify
    {
        public ArgumentException VerifyProperty<T>(T value)
        {
            if (value is sbyte
                || value is byte
                || value is short
                || value is ushort
                || value is int
                || value is uint
                || value is long
                || value is ulong
                || value is float
                || value is double
                || value is decimal)
            {
                return Convert.ToDouble(value) > 0
                    ? null
                    : new ArgumentException("Value is not a positive number", nameof(value));
            }

            return new ArgumentException("Value is not a number", nameof(value));
        }
    }
}