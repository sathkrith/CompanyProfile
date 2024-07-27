# Company Profile Application

This project is a web application that displays a list of companies and their locations. The frontend is built with React, and the backend is built with FastAPI. The application uses Nginx to serve the React app and proxy API requests to the FastAPI backend.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Setup

### 1. Clone the Repository

git clone https://github.com/sathkrith/CompanyProfile.git <br>
cd CompanyProfile

### 2. Build and run the application
docker-compose up --build

### 3. Open localhost:3000 in your browser
hit http://localhost:3000 

### 4. Profit!!!.
<br>

## Additonal Notes:
### 1. Running without docker.
The application is configured to run with nginx proxy, running frontend and backend seperately will not work.<br>
You will have to change backend api urls to match with frontend for it to work without nginx.
### 2. Swagger docs
Hit http://localhost:8000/docs for swagger UI
### 3. Running tests
To run tests; for backend, move to backend/app directory and run pytest. <br>
For frontend, move to frontend and run npm test. <br>
You will have to install required files before running tests.<br>
Backend: pip install -r requirements. txt in backend folder.<br>
fronend: npm install in frontend folder.




