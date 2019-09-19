﻿using Platform.Infrastructure.ViewModels.Helpers;

namespace Platform.Infrastructure.ViewModels.Activity
{
    public class ActivityViewModel : IViewModelVerify
    {
        public int ActivityId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int ArtifactId { get; set; }
        public string ArtifactName { get; set; }
        public bool IncludeArtifact { get; set; }
        public bool Obsolete { get; set; }
    }
}