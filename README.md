# HOW TO START
#### System requirements:
- Visual Studio 2017 (v15.9) or later
- nodejs 10.16.0
- SQL server 17 or later
- .NET Core SDK 2.2.300 https://dotnet.microsoft.com/download/dotnet-core/2.2

#### Steps:
1. Check if you have installed everything above
2. Change sql server name in appsetting.json from 
- Platform.IdentityServer project:
"Identity":"Data Source=`<SQL_SERVER_NAME>`;Database=IdentityServer;Integrated Security=True;Trusted_Connection=True MultipleActiveResultSets=true;"
- Platfrom.API project::
"Platform":"Data Source=`<SQL_SERVER_NAME>`;Database=Platform;Integrated Security=True;Trusted_Connection=True;MultipleActiveResultSets=true;"
3. Execute script from folder `scripts` in given order (some of them might take more than a minute):
    - build.cmd
    - p_update_database.cmd
    - is_update_database.cmd
    - run_all.cmd
4. Client will run on http://localhost:8080

# DEPLOY EXE FILES
#### Steps:
1. Check if you meet system requirements
2. Change sql server name in appsetting.json from 
- Platform.IdentityServer project:
"Identity":"Data Source=`<SQL_SERVER_NAME>`;Database=IdentityServer;Integrated Security=True;Trusted_Connection=True MultipleActiveResultSets=true;"
- Platfrom.API project::
"Platform":"Data Source=`<SQL_SERVER_NAME>`;Database=Platform;Integrated Security=True;Trusted_Connection=True;MultipleActiveResultSets=true;"
3. Make sure SQL server has access to DbBackup folder or restore databases manually and skip step 4.
4. Go to folder `scripts`:
    - edit restore_backup.cmd script (2nd, 3rd line)

    |Field|Comment|
    |---|---|
    |SET sqlServerName=`<SQL_SERVER_NAME>`|For default server name use: '.' |
    |SET dbPath=`<PATH_TO_DATABASE_FILES>`|Make sure SQL server has access to given dbPath, example: C:\Users\admin|

    - run scripts
        - ./deploy.cmd,
        - ./restore_backup.cmd
5. Go into dist folder and run run_all.cmd script.
6. Client will run on http://localhost:8080

# DEVELOPMENT
## SCRIPTS
- build.cmd - build backend + frontend projects
- restore_backup.cmd - restore prepared backup with basic data
- is_add_migration.cmd `<MIGRATION NAME>` - add migration to identity server db context
- p_add_migration.cmd `<MIGRATION NAME>` - add migration to platform db context
- is_update_database.cmd `<MIGRATION NAME>` - update identity server database (migration name is not obligatory)
- p_update_database.cmd `<MIGRATION NAME>` - update platform database (migration name is not obligatory)
- is_remove_migration - remove last identity server migration
- p_remove_migration - remove last platform migration
- run_all.cmd - runs the whole project
- start_api.cmd - runs platform api
- start_client.cmd - runs frontend
- start_is4.cmd - runs identity server

# TEST USERS
1. Teacher
    - email: teacher@local.host
    - password: Teacher1
2. Admin
    - email: admin@local.host
    - password: Admin1
3. Student
    - email: student@local.host
    - password: Student1