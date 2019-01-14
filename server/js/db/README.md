## DATABASE MIGRATION

As QuantEcon evolves with time, so will its existing database. We are currently using `node-migrate` package for writing automatic migration scripts. It will run all the migrations which have not been run yet and skip the completed ones. Migration scripts are stored in migrations folder. 

#### Installation
* Run `npm install` in server folder. 

#### Creating files

* Please use the existing template while creating migration files by running `migrate create test-migrate --template-file migrations/template.js` in `server/js/db`. 

#### Running migrations

* Type `npm run migrate` to run migrations. In case there is an error of  `migrate` command not found, then use `./../../node_modules/migrate/bin/migrate`in `server/js/db`.

**TODO**

- [ ] Integrating migration command to the build process
