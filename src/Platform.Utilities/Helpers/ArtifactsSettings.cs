namespace Platform.Utilities.Helpers
{
    public struct ArtifactsSettings
    {
        public ArtifactsSettings(string maximumFileSize, string serverDirectory)
        {
            MaximumFileSize = long.Parse(maximumFileSize);
            ServerDirectory = serverDirectory;
        }

        public long MaximumFileSize { get; }
        public string ServerDirectory { get; }
    }
}