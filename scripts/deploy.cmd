@echo off
pushd "%0/../.."

mkdir dist
cd ./dist
del /f /q /s *.* > nul
mkdir Client
mkdir API
mkdir IdentityServer
cd ..
echo Deploying API...
dotnet publish ./src/Platform.API/Platform.API.csproj -c Release -o ../../dist/API
echo.
echo Deploying IdentityServer4...
dotnet publish ./src/Platform.IdentityServer/Platform.IdentityServer.csproj -c Release -o ../../dist/IdentityServer
echo.
echo Copying files...
cd "%0/../deploy/"
copy run_all.cmd "%0/../../dist/run_all.cmd"
copy run_client.cmd "%0/../../dist/Client/run_client.cmd"
cd ../../src/Platform.Client/
call npm i
echo.
echo Deploying client...
echo Server...
echo.
call npm run deploy-server
echo.
echo Client...
call npm run deploy-client

echo Deploy FINISHED
popd
set /p DUMMY=Hit ENTER to continue...