# Running locally

## Prerequisite
- python3
- pip
- pipenv
- node
- postgresql
## Setting up postgres db
http://zetcode.com/springboot/postgresql/

Go to this link to setup the postgresql with the following parameters

Please only look at the postgresql section

- user: testuser
- Shall the new role be a superuser? (y/n) n
- Shall the new role be allowed to create databases? (y/n) y
- Shall the new role be allowed to create more new roles? (y/n) n
- Password: 123  
- db: testdb

## Running backend
- Open up a terminal in the project folder
- Run command: `pipenv install` and `pipenv shell`
    - for mac users :  if you havent installed brew first run `pip3 install pipenv` then `brew install pipenv` 
- cd to /backend/backend
- Open `settings.py` and change the setting for the database (the steps are there)
- Run command `python3 manage.py runserver` to start backend server

## Running frontend
- Open up another terminal in the project folder
- cd to /frontend
- Run command: `npm install` to install all dependencies
- Run command: `npm start` to start frontend server

# Running in production mode
- cd to the project folder
- Run command: `docker-compose build && docker-compose up`
- Navigate to http://localhost:3000 to see the frontend