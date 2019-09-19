@echo off
echo Adding IdentityServer migration: %1
pushd %0\..\..\src
dotnet ef migrations add %1 -c UsersDbContext -p Platform.IdentityServer/Platform.IdentityServer.csproj -o Data/Users
popd
set /p DUMMY=Hit ENTER to continue...