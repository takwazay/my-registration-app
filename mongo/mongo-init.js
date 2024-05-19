// mongo-init.js

// Connect to the database
var conn = new Mongo();
var db = conn.getDB("myregistrationdb");

// Create a collection with a schema
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["firstName", "lastName"], 
      properties: {
        firstName: {
          bsonType: "string",
          description: "User's name",
        },
        lastName: {
          bsonType: "string",
          description: "User's last name",
        },
        email: {
          bsonType: "string",
          // pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "User's email address",
        },
        dateOfBirth: {
          bsonType: "string",
          description: "User's birthday",
        },
        city: {
          bsonType: "string",
          description: "User's city",
        },
        postalCode: {
          bsonType: "string",
          description: "User's postalCode",
        },
      },
    },
  },
});

db.createUser({
  user: "admin",
  pwd: "admin",
  roles: ["readWrite", "dbAdmin"],
});
