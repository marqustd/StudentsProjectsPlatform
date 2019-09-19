using System;

namespace Platform.Artifacts.Logic
{
    public class GuidFactory : IGuidFactory
    {
        public string Create()
        {
            return $"{Guid.NewGuid().ToString()}";
        }
    }
}