!/bin/sh

# Start Gunicorn server
gunicorn --bind 0.0.0.0:5000 app:app