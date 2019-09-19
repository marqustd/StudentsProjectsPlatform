using System;

namespace Platform.Infrastructure.ViewModels.Helpers.Attributes
{
    /// <summary>
    ///     Used by <see cref="ViewModelVerifyExtensions" />.
    ///     Specifies if ViewModel property can be set to null, also apply if nullable type should be allowed to be null
    /// </summary>
    [AttributeUsage(AttributeTargets.Property)]
    internal sealed class AllowNullOrEmptyAttribute : Attribute
    {
    }
}