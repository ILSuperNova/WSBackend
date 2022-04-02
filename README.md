 
# Backend 

 please see remarks in attached email

## Requirements
 * Have Node v16 or higher installed for better use

```bash
$ git clone {THIS_REPO_URL} server
$ cd server
```
Install dependencies and devDependencies:
```bash
$ yarn install 
```
## Start Server
Configuration environment and change basic credentials:
```bash
$ cp .env.example .env
```

update mongo url with url provided in email

  Start server:
```bash
$ yarn start
```
  Start the development server:

```bash
$ yarn start:watch
```

  View the APIs at: http://localhost:4003

# Postman

Download and import the provided postman collection [./Backend.postman_collection.json]
