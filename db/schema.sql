DROP DATABASE IF EXISTS employer_db;

CREATE DATABASE employees_db;

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
    firName VARCHAR(30) NOT NULL,
    lasName VARCHAR(30) NOT NULL,
    roleId INT,
    managerId INT,
    FOREIGN KEY (roleId)
    REFERENCES role(id)
    ON DELETE SET NULL
);