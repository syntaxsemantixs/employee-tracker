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
    .then(function(data) {
        if(data.choice === 'view all departments') {
            db.query('SELECT * FROM department', function(err, results) {
                if(err) {
                    console.log(err);
                    return startApp();
                } else{
                    console.table(results);
                    return startApp();
                }
            })
        } else if(data.choice === 'view all roles') {
            db.query('SELECT * FROM role', function(err,results) {
                if(err) {
                    console.log(err);
                    return startApp();
                } else {
                    console.table(results);
                    return startApp();
                }
            })
        } else if(data.choice === 'view all employees') {
            if(err) {
                console.log(err);
                return startApp();
            } else {
                console.table(results);
                return startApp();
            }
        } else if(data.choice === 'add a department') {
            newDepartment();
        } else if(data.choice === 'add a role') {
            newRole();
        } else if(data.choice === 'add a employee') {
            addEmployee();
        } else if(data.choice === 'update employee role') {
            updateRole();
        } else if(data.choice === 'update an employee manager') {
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
            message: 'Enter the NAME of the DEPARTMENT:',
        }
    ])
    .then(function(dep) {
        const newDept = new department (dep.departmentName)

        const name = newDept.name

        db.query('INSERT INTO department (name) VALUES(?)', name, (err, results) => {
            if(err) {
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
            message: 'Enter the NAME of the ROLE:',
        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter th SALARY of the ROLE:',
        }
    ])
}
