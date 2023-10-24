# Flask Recommendation App

This repository contains a Flask application that provides recommendations based on specific criteria. Follow the instructions below to set up the application locally and run it on your machine.

## Setting up Locally

1. Navigate to the project directory:

    ```
    cd packages/recom-server
    ```
2. Create a new virtual environment (ensure you have Python installed):
    
    ```
    python3 -m venv venv
    ```
3. Activate the virtual environment:
- On Windows:
  ```
  venv\Scripts\activate
  ```
- On macOS and Linux:
  ```
  source venv/bin/activate
  ```
4. Install dependencies:
    ```
    pip install -r requirements.txt
    ```
5. Create a new file named `.env` and copy the contents from `.env.local`. You can modify the values in `.env` as needed.

6. Run the Flask application in debug mode:
    ```
    flask run --debug
    ```
Now, the Flask application is running locally and can be accessed at `http://localhost:5000`.

## Running Test

You can make a GET request to `http://localhost:5000/recommendations/get-recommendation` after setting up the application. If everything is done right, you will receive the following response:

```json
{
 "message": "Articles recommendation"
}
```

## Running with Docker

To run the Flask application using Docker, a Dockerfile is provided. Follow these steps:

1. Build the Docker image (ensure you have Docker installed):
    ```
    docker build -t flask-recom-app .
    ```
2. Run the Docker container:
    ```
    docker run -p 5000:5000 flask-recom-app
    ```
The Flask application will be accessible at `http://localhost:5000`.

## Folder Structure
The folder structure of the Flask application is as follows:

```
packages/recom-server
├── apps
│ ├── recommendations
│ │ ├── init.py
│ │ ├── controllers.py
│ │ └── views.py
│ ├── init.py
│ └── utils.py
├── venv
├── .env.local
├── .gitignore
├── app.py
└── requirements.txt
```

- **`apps/recommendations`**: Contains the recommendation module with controllers and views for handling requests related to recommendations.
- **`apps/__init__.py`**: Initializes the Flask application and defines its configurations.
- **`apps/utils.py`**: Utility functions used across the application.
- **`venv`**: Virtual environment folder containing Python dependencies.
- **`.env.local`**: Sample environment variable file with default values. Copy this to `.env` and customize the values as needed.
- **`.gitignore`**: Specifies which files and directories to ignore when pushing to Git.
- **`app.py`**: Main entry point of the Flask application.
- **`requirements.txt`**: Lists all the Python packages required for the project.

Happy coding!