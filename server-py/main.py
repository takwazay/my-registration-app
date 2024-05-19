from fastapi import FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
import os
from typing import List

app = FastAPI()

# Get MySQL connection details from environment variables
mysql_host = os.environ.get("MYSQL_HOST")
mysql_user = os.environ.get("MYSQL_USER")
mysql_password = os.environ.get("MYSQL_ROOT_PASSWORD")
mysql_database = os.environ.get("MYSQL_DATABASE")

# MySQL connection
db = mysql.connector.connect(
    host=mysql_host,
    user=mysql_user,
    port=3306,
    password=mysql_password,
    database=mysql_database
)
cursor = db.cursor()

# CORS middleware
origins = ["http://localhost:3000", "http://127.0.0.1:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)

# Pydantic model for user
class User(BaseModel):
    firstName: str
    lastName: str
    email: str
    dateOfBirth: str
    city: str
    postalCode: str

# Pydantic model for desired user format
class UserResponse(BaseModel):
    id: str
    firstName: str
    lastName: str
    email: str
    dateOfBirth: str
    city: str
    postalCode: str


@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}

# Route to get all users
@app.get("/users", response_model=List[UserResponse])
async def get_users():
    query = "SELECT id, firstName, lastName, email, dateOfBirth, city, postalCode FROM users"
    cursor.execute(query)
    users = cursor.fetchall()

    if not users:
        return []

    return [{"id": user[0], "firstName": user[1], "lastName": user[2], "email": user[3], "dateOfBirth":str(user[4]), "city": user[5], "postalCode": user[6]} for user in users]


# Route to create a new user
@app.post("/users")
async def create_user(user: User):
    user_data = dict(user)
    query = "INSERT INTO users (firstName, lastName, email, dateOfBirth, city, postalCode) VALUES (%s, %s, %s, %s, %s, %s)"
    values = (user_data["firstName"], user_data["lastName"], user_data["email"], user_data["dateOfBirth"], user_data["city"], user_data["postalCode"])
    cursor.execute(query, values)
    db.commit()
    return {"message": "User created successfully", "user_id": cursor.lastrowid}

# Route to delete a user
@app.delete("/users/{user_id}")
async def delete_user(user_id: int):
 
    query = "DELETE FROM users WHERE id = %s"
    values = (user_id,)
    cursor.execute(query, values)
    if cursor.rowcount == 0:
        raise HTTPException(status_code=404, detail="User not found")

    db.commit()
    return {"message": "User deleted successfully", "user_id": user_id}
