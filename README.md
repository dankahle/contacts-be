# contacts-be  

The backend rest api for the contacts-fe project

### features
* redoc documentation from json schema
* tv4 json schema validation
* mongodb node native driver for mongo access
* node-base project (separate repo) for shared node functionality
* confit config file environment specific heirarchy

### todo

### get started  
**seed mongodb database** (assumes a local instance)
```bash
bash seed-db.sh
```
**start server**
```bash
node server.js port (port defaults to 3000)
```
**view api docs**
```bash
http://localhost:port/docs
```

### issues
* json schema api docs won't allow sub schemas in "path" section
* json schema can't be shared by post/put/results cause can't easily remove id property for post definition
* json schema put can't restrict additionalProperties (false) in its current "allOf" form

