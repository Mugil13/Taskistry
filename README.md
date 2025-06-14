## Taskistry - Full Stack Todo Application

Taskistry is a modern, full-stack todo application that helps you manage your tasks efficiently. This was developed as a lab assignment for my course "Internet Programming". Taskistry allows you to create, edit, mark complete and organize your todos pretty well.

## Features

1) Create & Manage Tasks: Add new tasks by typing it in 

2) Task Organization: Manage tasks by assigning complete and incomplete

3) Filtering: View all tasks, only completed, or only pending tasks

4) Task Editing: Modify existing tasks with in-place editing

5) Bulk Actions: Delete all tasks or only completed tasks with one click

6) Basic Task Statistics: See counts for total, completed, and pending tasks

7) Persistent Storage: All tasks are saved to a backend database (MongoDB)

## Technologies Used

Frontend - React (v18+), Axios for API requests and CSS3 
Backend - Node.js & Express and MongoDB along with RESTful API design

## Getting Started

Follow these instructions to set up Taskistry on your local machine.
Make sure you have all the technologies listed above in your machine as well

## Installation

Clone the repository

```
git clone https://github.com/Mugil13/Taskistry.git
cd taskistry
```

Set up the backend

```
cd backend
node index.js
```

Set up the frontend

```
cd frontend
npm start
```

## Additional 

Configure environment variables - Create a .env file in the backend directory:

env
```
MONGODB_URI=your_mongodb_connection_string
PORT=5002
```

Access the application

Open your browser and visit: http://localhost:3000

## Contributing

You are free to contribute to this project. Follow the steps given below

1) Fork the project

2) Create your own features and commit your changes

3) Open a Pull Request
