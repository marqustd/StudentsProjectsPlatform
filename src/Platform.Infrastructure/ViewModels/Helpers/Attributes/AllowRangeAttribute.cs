using System;

namespace Platform.Infrastructure.ViewModels.Helpers.Attributes
{
    /// <summary>
    ///     Used by <see cref="ViewModelVerifyExtensions" />.
    ///     Specifies numberic range of property.
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    public sealed class AllowRangeAttribute : Attribute, IPropertyVerify
    {
        private readonly double from;
        private readonly double to;

        public AllowRangeAttribute(double from, double to)
        {
            this.from = from;
            this.to = to;
        }

        public ArgumentException VerifyProperty<T>(T value)
        {
            if (value is int
                || value is double
                || value is float
                || value is sbyte
                || value is byte
                || value is short
                || value is ushort
                || value is uint
                || value is long
                || value is ulong
                || value is decimal)
            {
                var val = Convert.ToDouble(value);
                return from <= val && val <= to
                    ? null
                    : new ArgumentException($"Value is invalid. Valid value range is {from}-{to}", nameof(value));
            }

            return new ArgumentException("Value is not a number", nameof(value));
        }
    }
}