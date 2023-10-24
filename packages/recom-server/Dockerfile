FROM python:3.11.4-slim-buster

# set work directory
WORKDIR /usr/src/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN apt update
RUN apt install python3-pip python3-dev libpq-dev postgresql-contrib -y

# copy project
COPY . .

# install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# grant permission to execute entrypoint.sh
RUN chmod +x entrypoint.sh

CMD [ "bash", "entrypoint.sh" ]