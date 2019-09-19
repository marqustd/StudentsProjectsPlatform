@echo off
pushd %0\..\..\src\Platform.Infrastructure
dotnet restore
dotnet ef database update %1 -c PlatformDbContext -s ..\Platform.API\Platform.API.csproj
popd
set /p DUMMY=Hit ENTER to continue...