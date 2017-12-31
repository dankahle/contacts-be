# contacts-be  

The backend rest api for the contacts-fe project. This api supports both login/register/authentication and users/contacts apis. json schema is used for post/put body validation, and renders mongoose unrequired. The schemas also doubled use for redoc's json schema based documentation. MongoDB's node native driver was very easy to work with and utilized the same api as mongo's client. 

### features
* confit config file hierarchy affording common config along with environment specific config. This also allows for node-base config as well
* mocha/chai unit testing 
* supertest end-to-end api testing
* tv4/tv4-formats JSON schema validation
* whitelisted CORS to afford separate backend/frontend servers
* morgan logging
* separation of architecture with each section having its own router/business/data layers
* JSON schema api documentation via [redoc](https://github.com/Rebilly/ReDoc)
* JSON schema validation for post/put body
* mongodb node native driver instead of mongoose for simplicity and consistency between database scripts and data layer code
* environment specific mongodb initialization scripts
* cookie based authentication
* login/register api
* users/contacts apis
* http and https capability config controlled
* heroku hosting

mongodb:
* node native driver instead of mongoose
* json schema validation for insert/update
* mlab hosting

### get started  

**clone the project**  
```
git clone https://github.com/dankahle/contacts-be.git
npm install
```
  
**initialize the local mongodb database**
```
npm run seed
```
**start server**
```
npm start (port defaults to 3000, set in config file)
```
**run tests**
```
npm test
```

**view api docs**
```
http://localhost:3000/docs
```

**hitting api with postman**  
1. login to site (or register)
2. grab the contents of the dkAuth cookie
3. create a cookie in postman called dkAuth and paste in the contents from the browser dkAuth cookie


