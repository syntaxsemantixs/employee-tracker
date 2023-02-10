INSERT INTO department (name)
VALUES
("Customer Service"),
("Sales"),
("IT"),
("Marketing"),
("Logistics");

INSERT INTO role (currRole, yearlySal, deptId)
VALUES
("Customer Care Representative", 31200, 1),
("Account Manager", 60000, 2),
("Software Engineer", 80000, 3),
("Product Manager",70000, 4),
("Logistics Coordinator", 55000, 5);

INSERT INTO employee (lName, fName, roleId, managerId)
VALUES
("Berger", "Brian", 1, 5),
("James", "Michele", 2, 5),
("Ormeno", "Gerardo", 3, 5),
("Dempsey", "William", 4, 3),
("Den", "Jeff", 5, NULL);