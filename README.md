# Prerequisites
* Node JS version 10+
* Docker installed

# Quickstart
Install dependencies:
```
$ npm i
```

Install `nodemon` globally (optional):
```
$ npm install -g nodemon
```

Initialize the mysql docker container:
```
$ npm run db
```

Login to the docker container (password is set to `root`):
```
docker exec -it mysql -p
```

Initialize the database from the command line:
```
mysql> CREATE DATABASE DATA_MODELS
```

Exit mysql and docker container. Run project with `nodemon`:
```
$ nodemon main.js
```

Or if you prefer, run with node:
```
$ node main.js
```

# Building the database

There's not concept of data migrations as of writing this, the database is initialized based off of the SQL files in `/schema`, which are referenced by `db.js` in the `init()` function. 

After making modifications to the schema, you should only need to delete the mysql docker container and re-run it (using the steps above).
