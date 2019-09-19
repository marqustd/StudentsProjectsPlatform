using System;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Platform.API.AutoMapper;
using Platform.API.Helpers;
using Platform.API.Services;
using Platform.Infrastructure.Data;
using Platform.Utilities.Helpers;
using Swashbuckle.AspNetCore.Swagger;

namespace Platform.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            Env = env;
        }

        public IConfiguration Configuration { get; }
        public IHostingEnvironment Env { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            AppSettingsHelper.Init(Configuration);
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddDbContext<PlatformDbContext>(o => o.UseSqlServer(Configuration["ConnectionStrings:Platform"]));

            services.AddAuthentication(opts =>
                {
                    opts.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    opts.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddCookie()
                .AddJwtBearer("Bearer", options =>
                {
                    options.Authority = AppSettingsHelper.IdentityServerUrl;
                    options.Audience = AppSettingsHelper.ApiScopeName;
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };
                });

            if (Env.IsDevelopment())
            {
                services.AddMvc(opts => { opts.Filters.Add(new AllowAnonymousFilter()); });
                services.AddTransient<IUserAssignedHelper, DevelopUserAssignedHelper>();
                services.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1", new Info { Title = "Slope Api", Version = "v0.0.0.0.0.0.0.0.0.1 XD" });
                });
            }
            else
            {
                services.AddTransient<IUserAssignedHelper, UserAssignedHelper>();
            }

            AutoMapperInitializer.Initialize();

            services.RegisterServices();

            services.AddCors(options =>
            {
                options.AddPolicy("default", policy =>
                {
                    policy
                        .WithOrigins(AppSettingsHelper.ClientUrl)
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .AllowAnyMethod();
                });
            });
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (!env.IsDevelopment())
            {
                //app.UseHttpsRedirection();
            }
            else
            {
                app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "Slope API version very beta"); });
                // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.), 
                // specifying the Swagger JSON endpoint.
                app.UseSwagger();
                using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
                {
                    DataSeeder.Seed(scope.ServiceProvider);
                }
            }

            app.UseAuthentication();
            app.UseCors("default");
            app.UseMvc();
        }
    }
}