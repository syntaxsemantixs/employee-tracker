DROP DATABASE IF EXISTS employer_db;

CREATE DATABASE employer_db;

USE employer_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    currRole VARCHAR(30),
    yearlySal INT,
    deptId INT,
    FOREIGN KEY (deptId)
    REFERENCES department(id)
    ON DELETE SET NULL 
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    lName VARCHAR(30) NOT NULL,
    fName VARCHAR(30) NOT NULL,
    roleId INT,
    FOREIGN KEY (roleId)
    REFERENCES role(id)
    ON DELETE SET NULL
);