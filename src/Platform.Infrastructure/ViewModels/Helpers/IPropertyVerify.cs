using System;

namespace Platform.Infrastructure.ViewModels.Helpers
{
    /// <summary>
    ///     Used by <see cref="VerifyExtensions" />. Interface used for creating view model validation attributes
    /// </summary>
    public interface IPropertyVerify
    {
        /// <summary>
        ///     Used to verify property of view model
        /// </summary>
        /// <typeparam name="T">Type of object to verify</typeparam>
        /// <param name="value">Object to verify</param>
        /// <returns>
        ///     Null if verified properly else returns <see cref="ArgumentException" />
        /// </returns>
        ArgumentException VerifyProperty<T>(T value);
    }
}