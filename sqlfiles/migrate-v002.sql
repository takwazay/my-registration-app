USE myregistrationdb;
CREATE TABLE users
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100),
    lastName VARCHAR(100),
    email VARCHAR(255),
    dateOfBirth DATE,
    city VARCHAR(255),
    postalCode VARCHAR(255)
);