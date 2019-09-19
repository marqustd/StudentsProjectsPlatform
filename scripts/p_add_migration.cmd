@echo off
echo Adding Platform migration: %1
pushd %0\..\..\src
dotnet ef migrations add %1 -c PlatformDbContext -p Platform.Infrastructure/Platform.Infrastructure.csproj -s Platform.API/Platform.API.csproj -o Data/Migrations
popd
set /p DUMMY=Hit ENTER to continue...