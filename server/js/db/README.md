## DATABASE MIGRATION

As QuantEcon evolves with time, so will its existing database. We are currently using `node-migrate` package for writing automatic migration scripts. It will run all the migrations which have not been run yet and skip the completed ones. Migration scripts are stored in migrations folder. 


#### Creating migration file

Please use the existing template while creating migration files by typing `migrate create test-migrate --template-file migrations/template.js`. In case there is an error of  `migrate` command not found, then use `./../../node_modules/migrate/bin/migrate`.


#### Running migrations

Type `npm run migrate` to run migrations. 

**TODO**

1. Integrating migration command to the build process