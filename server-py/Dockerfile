# Use Python 3.9 as the base image
FROM python:3.12

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /py-server

# Install FastAPI, uvicorn, mysql-connector-python, and python-dotenv
RUN pip install --no-cache-dir fastapi==0.68.0 uvicorn==0.15.0 mysql-connector-python==8.0.28 python-dotenv==0.19.1

# Copy the rest of the application code into the container
COPY . .

