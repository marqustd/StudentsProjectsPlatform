@echo off
SET dbPath=
SET sqlServerName=.

pushd "%0/../../"
SET identityServerBackupPath=%cd%/src/DbBackups/IdentityServer.bak
SET platformBackupPath=%cd%/src/DbBackups/Platform.bak
echo Deleting old databases...
sqlcmd -E -S %sqlServerName% -Q "IF EXISTS(select * from sys.databases where name='Platform') BEGIN; alter database Platform set single_user with rollback immediate; DROP DATABASE Platform; END;"
sqlcmd -E -S %sqlServerName% -Q "IF EXISTS(select * from sys.databases where name='IdentityServer') BEGIN; alter database IdentityServer set single_user with rollback immediate; DROP DATABASE IdentityServer; END;"

echo.
echo Restoring Platform database...
sqlcmd -E -S %sqlServerName% -Q "RESTORE DATABASE Platform FROM DISK='%platformBackupPath%' WITH MOVE 'Platform' TO '%dbPath%\Platfrom.mdf', MOVE 'Platform_log' TO '%dbPath%\Platform_log.ldf'"

echo.
echo Restoring IdentityServer database...
sqlcmd -E -S %sqlServerName% -Q "RESTORE DATABASE IdentityServer FROM DISK='%identityServerBackupPath%' WITH MOVE 'IdentityServer' TO '%dbPath%\IdentityServer.mdf', MOVE 'IdentityServer_log' TO '%dbPath%\IdentityServer_log.ldf'"

echo.
echo Database restore FINISHED 
echo.
popd
set /p DUMMY=Hit ENTER to continue...