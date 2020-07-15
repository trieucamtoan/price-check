# Run in local
## Prerequisite
- python3
- pip
- pipenv
- node
- postgresql
## Setting up postgres db
http://zetcode.com/springboot/postgresql/
Go to this link to setup the postgresql with the following parameters
- user: testuser
- Shall the new role be a superuser? (y/n) n
- Shall the new role be allowed to create databases? (y/n) y
- Shall the new role be allowed to create more new roles? (y/n) n
- Password: 123  
- db: testdb
## Running backend
- In project folder, run command: `pipenv install` and `pipenv shell`
- cd to /backend
- Open `settings.py` and change the setting for the database (the steps are there)
- Run command `python3 manage.py runserver` to start backend server
## Running frontend
- cd to /frontend
- Run command: `npm install` to install all dependencies
- Run command: `npm start` to start frontend server
# Run in production mode
- cd to the project folder
- Run command: `docker-compose build && docker-compose up`
- Navigate to http://localhost:3000 to see the frontend