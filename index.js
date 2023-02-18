const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table');
const department = require('./js/department');
const employee = require('./js/employee');
const role = require('./js/role')

const db = mysql.createConnection(
    {
        host: '127.0.0.1',
        user: 'root',
        password: 'Kosenrufu2030!',
        database: 'employer_db'
    },
    console.log('Access Granted: You have successfully entered the database.')
);

const startApp = () => {
    return inquirer.prompt

        ([
            {
                type: 'list',
                name: 'choice',
                message: 'Please choose from the selection below:',
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update employee role',]
            }
        ])
        .then(function (data) {
            if (data.choice === 'view all departments') {
                db.query('SELECT * FROM department', function (err, results) {
                    if (err) {
                        console.log(err);
                        return startApp();
                    } else {
                        console.table(results);
                        return startApp();
                    }
                })
            } else if (data.choice === 'view all roles') {
                db.query('SELECT * FROM role', function (err, results) {
                    if (err) {
                        console.log(err);
                        return startApp();
                    } else {
                        console.table(results);
                        return startApp();
                    }
                })
            } else if (data.choice === 'view all employees') {
                db.query('SELECT * FROM employee', function (err, results) {
                    if (err) {
                        console.log(err);
                        return startApp();
                    } else {
                        console.table(results);
                        return startApp();
                    }
                })
            } else if (data.choice === 'add a department') {
                newDepartment();
            } else if (data.choice === 'add a role') {
                newRole();
            } else if (data.choice === 'add an employee') {
                newEmployee();
            } else if (data.choice === 'update employee role') {
                updateRole();
            }
        })
}

const newDepartment = () => {
    return inquirer.prompt

        ([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Please enter the NAME of the DEPARTMENT:',
            }
        ])
        .then(function (dep) {
            const newDept = new department(dep.departmentName)

            const name = newDept.name

            db.query('INSERT INTO department (name) VALUES(?)', name, (err, results) => {
                if (err) {
                    console.log(err)
                    return startApp();
                } else {
                    console.log('New department has been added.')
                    return startApp();
                }
            })

        })
}

const newRole = () => {
    return inquirer.prompt

        ([
            {
                type: 'input',
                name: 'roleName',
                message: 'Please enter the NAME of the ROLE:',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Please enter the SALARY of the ROLE:',
            }
        ])
        .then(function (roleData) {
            let currRole = roleData.roleName
            let yearlySal = roleData.salary

            db.promise().query('SELECT id AS name FROM department')
                .then(([row, fields]) => {
                    return inquirer.prompt({
                        type: 'list',
                        name: 'departmentRole',
                        message: 'Select which DEPARTMENT to add the Role too:',
                        choices: row.filter(r => !!r.name).map(r => r.name),
                    })
                })
                .then(function (roleDep) {
                    let deptId = roleDep.departmentRole
                    console.log(currRole)
                    console.log(yearlySal)
                    console.log(deptId)
                    let val = [
                        [currRole, yearlySal, deptId]
                    ]
                    db.query('INSERT INTO role (currRole, yearlySal, deptId) VALUES (?)', val, (err, results) => {
                        if (err) { // if error, and error will display and you will be returned to the first question
                            console.log(err);
                            return startApp();
                        } else {
                            console.log('Role has been created and added!');
                            return startApp();
                        }
                    })
                })
        })
}
const newEmployee = () => {
    return inquirer.prompt

        ([
            {
                type: 'input',
                name: 'lastName',
                message: 'Please enter your LAST name:'
            },
            {
                type: 'input',
                name: 'firstName',
                message: 'Please enter your FIRST name:'
            },
        ])
        .then(function (newData) {
            let lName = newData.lastName
            let fName = newData.firstName

            db.promise().query('SELECT roleId AS currRole FROM employee')
                .then(([row, fields]) => {
                    return inquirer.prompt({
                        type: 'list',
                        name: 'whichRole',
                        message: 'Select which ROLE to add the EMPLOYEE to:',
                        choices: row.filter(a => !!a.currRole).map(a => a.currRole),
                    })
                })
                .then(function (empRoleData) {
                    let roleId = empRoleData.whichRole
                    let empVal = [
                        [lName, fName, roleId]
                    ]

                    db.query('INSERT INTO employee (lName, fName, roleId) VALUES (?)', empVal, (err, results) => {
                        if (err) {
                            console.log(err);
                            return startApp();
                        } else {
                            console.log('Role has been created and added!');
                            return startApp();
                        }
                    })
                })
        })
}

const updateRole = () => {
    db.promise().query('SELECT fName FROM employee')
        .then(([rows, fields]) => {
            return inquirer.prompt({
                type: 'list',
                name: 'fName',
                message: 'Select employees role to update:',
                choices: rows.filter(u => !!u.fName).map(u => u.fName),
            })
        })
        .then(function (empNewRole) {
            let nameUpdate = empNewRole.fName

            db.promise().query('SELECT roleId FROM employee')
                .then(([rows, fields]) => {
                    return inquirer.prompt({
                        type: 'list',
                        name: 'roleId',
                        message: 'SELECT the employees new role',
                        choices: rows.filter(z => !!z.roleId).map(z => z.roleId),
                    })
                })
                .then(function (updateContent) {
                    const {roleId} = updateContent
                    // const {fName} = empNewRole
                    console.log(roleId)
                    console.log(nameUpdate)
                    // let newVal = {,
                    //     nameUpdate
                    // }
                    db.query(`UPDATE employee SET roleId = ? WHERE fName = ?`,[roleId, nameUpdate], (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(result.affectedRows + " record(s) updated");
                            console.log(result)
                            return startApp();
                        }
                        return startApp()
                    })

                })
        })
}

startApp();

module.exports = db