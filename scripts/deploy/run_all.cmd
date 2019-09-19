@echo off
cd %0\..\API\
start cmd /k Platform.API.exe
cd ../IdentityServer
start cmd /k Platform.IdentityServer.exe
cd ../Client
start "" http://localhost:8080
call node server.bundle.js