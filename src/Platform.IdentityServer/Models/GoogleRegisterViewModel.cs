namespace Platform.IdentityServer.Models
{
    public class GoogleRegisterViewModel
    {
        public string GoogleTokenId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string AlbumNumber { get; set; }
        public bool Agree { get; set; }
    }
}