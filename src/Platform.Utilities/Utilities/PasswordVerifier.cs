namespace Platform.Utilities.Utilities
{
    public static class PasswordVerifier
    {
        public static bool Verify(string password)
        {
            Require.NotEmpty(password, nameof(password));

            return true;
        }
    }
}