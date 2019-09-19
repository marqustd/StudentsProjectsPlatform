namespace Platform.UserGenerator.Core.Extensions
{
    public static class StringExtensions
    {
        public static string ToUnicode(this string value)
        {
            var replace = value.Replace("ł", "l");
            replace = replace.Replace("ą", "a");
            replace = replace.Replace("ę", "e");
            replace = replace.Replace("ć", "c");
            replace = replace.Replace("ż", "z");
            replace = replace.Replace("ź", "z");
            replace = replace.Replace("ś", "s");
            replace = replace.Replace("ń", "n");
            replace = replace.Replace("ó", "o");
            return replace;
        }
    }
}