## Task Manager
### Project Setup

```bash
# install project
$ git clone https://github.com/thehardikchaturvedi/task-management-mern-application.git
# open app directory
$ cd task-management-mern-application


# setup and install dependencies for frontend
$ cd frontend && npm install
# frontend start
$ npm start


# setup and install dependencies for backend
$ cd backend && yarn install
# set database credentials
# make .env file
# paste code .env.example file to .env file
# provide database credentials in .env file
# run database migrations (Table)
$ npx sequelize-cli db:migrate 
# backend start
$ npm start
```