using System.ComponentModel;

namespace Platform.Infrastructure.Models
{
    public enum ApiJsonErrorCodes
    {
        [Description("Invalid data")] BadRequest = 400,

        [Description("Unauthorized")] Unauthorized = 401,

        [Description("Conflict")] Conflict = 409,

        [Description("Third party software error")]
        ThirdParty = 599,

        [Description("Unknown error")] Unknown = 601,

        [Description("Not found")] NotFound = 404,
        [Description("Forbidden action")] Forbidden = 403
    }
}