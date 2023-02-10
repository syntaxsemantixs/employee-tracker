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
                choices: ['view all departments', 'view all roles', 'view all employees', 'add a department', 'add a role', 'add an employee', 'update an employee role', 'update an employee manager']
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
                if (err) {
                    console.log(err);
                    return startApp();
                } else {
                    console.table(results);
                    return startApp();
                }
            } else if (data.choice === 'add a department') {
                newDepartment();
            } else if (data.choice === 'add a role') {
                newRole();
            } else if (data.choice === 'add a employee') {
                addEmployee();
            } else if (data.choice === 'update employee role') {
                updateRole();
            } else if (data.choice === 'update an employee manager') {
                updateMgrId();
            }
        })
}

const addDepartment = () => {
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

const addRole = () => {
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

            db.promise().query('SELECT id AS FROM department')
                .then(([row, fields]) => {
                    return inquirer.prompt
                        ({
                            type: 'list',
                            name: 'departmentRole',
                            message: 'Select which DEPARTMENT to add the ROLE too:',
                            choices: row.filter(r => !!r.name).map(r => r.name),

                        })
                })
        })
        .then(function(roleDep) {
            let deptId = roleDep.departmentRole
            console.log(currRole)
            console.log(yearlySal)
            console.log(deptId)
            let val = [
                [currRole, yearlySal, deptId]
            ]
            db.query('INSERT INTO role (currRole, yearlySal, deptId) VALUES (?)', val, (err, results) => {
                console.log('Role has been created and added!');
                return startApp();
            })
        })
}

const addEmployee = () => {
    return inquirer.prompt

    ([
        {
            type: 'input',
            name: 'lastName',
            message: 'Please enter your LAST name:'
        },
        {
            type:'input',
            name: 'firstName',
            message: 'Please enter your FIRST name:'
        }
    ])
    .then(function(emptyData) {
        let lName = emptyData.lastName
        let fName = emptyData.
        
        db.promise().query('SELECT roleId AS roleN FROM employee')
        .then(([row, fields]) => {
            return inquirer.prompt({
                type: 'list',
                name: 'whichRole',
                message: 'Select which ROLE to add the EMPLOYEE to:',
                choices: row.filter(a => !!a.currRole),
            })
        })
    })
    .then(function(empRoleData) {
        let roleId = empRoleData.whichRole

        db.promise().query('SELECT managerId FROM employee')
        .then(([row, fields]) => {
            return inquirer.prompt({
                type: 'list',
                name: 'theManager',
                message: 'Select the MANAGER of the employee:',
                choices: row.filter(m => !!m.managerId).map(m => m.managerId),
            })
        })

    })
    .then(function(empManData) {
        let managerId = empManData.theManager
        let empVal = [
            [lName, fName, managerId, roleId]
        ]
        db.query('INSERT INTO employee (lName, fName, managerId, roleId) VALUES (?)', empVal, (err, results) => {
            if(err) {
                console.log(err);
                return startApp();
            } else {
                console.log('Employee and all data has been saved succesfully!');
                return startApp();
            }
        })
    })
}

const updateRole = () => {
    db.promise().query('SELECT fName FROM employee')
    .then(([rows, fields]) => {
        return inquirer.prompt({
            type: 'list',
            name: 'updateName',
            message: 'Select employee to update:',
            choices: rows.filter(u => !!u.fName ).map(u => u.fName),
        })
    })
    .then(function(empNewRole) {
        let nameToUpd = empNewRole.updateName

        db.promise().query('SELECT roleId FROM employee')
        .then(([rows, fields]) => {
            return inquirer.prompt({
                type: 'list',
                name: 'updateRole',
                message: 'SELECT the employees new role',
            })
        })
    })
    .then(function(updateContent) {
        let newCont = updatedContent.updateRole
        let newVal = [
            [newCont]
            [nameToUpd]
        ]
        db.query('UPDATE employee SET roleId = ? WHERE fName ?', newVal, (err, result) => {
            return startApp()
        })
    })
}

startApp();

module.exports = db