namespace Platform.Infrastructure.Models
{
    public class ApiJsonResponse<TData, TMeta>
        where TData : class
        where TMeta : class
    {
        public ApiJsonResponse()
        {
        }

        public ApiJsonResponse(TData data, TMeta meta = null)
        {
            Data = data;
            Meta = meta;
        }

        public ApiJsonResponse(params ApiJsonError[] errors) : this(null, meta: null)
        {
            Errors = errors;
        }

        public TData Data { get; set; }

        public ApiJsonError[] Errors { get; set; }

        public TMeta Meta { get; set; }
    }

    public class ApiJsonResponse<TData> : ApiJsonResponse<TData, object>
        where TData : class
    {
        public ApiJsonResponse()
        {
        }

        public ApiJsonResponse(TData data) : base(data, null)
        {
        }

        public ApiJsonResponse(params ApiJsonError[] errors) : base(errors)
        {
        }
    }

    public class ApiJsonResponse : ApiJsonResponse<dynamic, dynamic>
    {
        public ApiJsonResponse()
        {
        }

        public ApiJsonResponse(dynamic data, dynamic meta = null) : base(data as object, meta as object)
        {
        }

        public ApiJsonResponse(params ApiJsonError[] errors) : base(errors)
        {
        }
    }
}