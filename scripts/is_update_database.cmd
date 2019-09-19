@echo off
pushd %0\..\..\src\Platform.IdentityServer
dotnet restore
dotnet ef database update %1 -c UsersDbContext
popd
set /p DUMMY=Hit ENTER to continue...