const inquirer = require("inquirer");

const mainMenu = () => new Promise((resolve, reject) => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'menuChoice',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        }
    ]).then((answers) => {
        resolve(answers);
    }).catch((error) => {
        reject(error);
    });
});

const addDepartment = () => inquirer.prompt([
    {
        type: 'input',
        name: 'departmentName',
        message: 'Enter the name of the department:'
    }
]);

const addRole = () => inquirer.prompt([
    {
        type: 'input',
        name: 'roleTitle',
        message: 'Enter the title of the role:'
    },
    {
        type: 'input',
        name: 'roleSalary',
        message: 'Enter the salary for this role:',
        validate: (input) => {
            if (!isNaN(parseFloat(input)) && isFinite(input) && parseFloat(input) > 0) {
                return true;
            } else {
                return 'Please enter a valid salary (a positive number).';
            }
        }
    },
    {
        type: 'input',
        name: 'department',
        message: 'Enter the department for this role:'
    }
]);

// const addEmployee = (roles, employees) => inquirer.prompt([
//     {
//         type: 'input',
//         name: 'firstName',
//         message: 'Enter the first name of the employee:'
//     },
//     {
//         type: 'input',
//         name: 'lastName',
//         message: 'Enter the last name of the employee:'
//     },
//     {
//         type: 'list',
//         name: 'role',
//         message: 'Select the role for this employee:',
//         choices: roles.map(role => role.title)
//     },
//     {
//         type: 'list',
//         name: 'manager',
//         message: 'Select the manager for this employee:',
//         choices: employees.map(employee => `${employee.first_name} ${employee.last_name}`)
//     }
// ]);

const addEmployee = () => inquirer.prompt([
    {
        type: 'input',
        name: 'firstName',
        message: 'Enter the first name of the employee:'
    },
    {
        type: 'input',
        name: 'lastName',
        message: 'Enter the last name of the employee:'
    },
    {
        type: 'input',
        name: 'role',
        message: 'Enter the role for this employee:'
    },
    {
        type: 'input',
        name: 'manager',
        message: 'Enter the manager for this employee:'
    }
]);

// const updateEmployeeRole = (employees, roles) => inquirer.prompt([
//     {
//         type: 'list',
//         name: 'employeeToUpdate',
//         message: 'Select the employee to update:',
//         choices: employees.map(employee => `${employee.first_name} ${employee.last_name}`)
//     },
//     {
//         type: 'list',
//         name: 'newRole',
//         message: 'Select the new role for this employee:',
//         choices: roles.map(role => role.title)
//     }
// ]);

const updateEmployeeRole = () => inquirer.prompt([
    {
        type: 'input',
        name: 'employeeToUpdate',
        message: 'Enter the name of the employee to update:'
    },
    {
        type: 'input',
        name: 'newRole',
        message: 'Enter the new role for this employee:'
    }
]);

// Function to log user responses
const logResponses = (responses) => {
    console.log("\n--- Your Responses ---");
    Object.entries(responses).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
    });
    console.log("----------------------\n");
};

// Function to initialize the script
const init = async () => {
    try {
        let userResponses;
        do {
            userResponses = await mainMenu();
            switch (userResponses.menuChoice) {
                case 'View all departments':
                    // Logic to view all departments
                    console.log("Viewing all departments...");
                    break;
                case 'View all roles':
                    // Logic to view all roles
                    console.log("Viewing all roles...");
                    break;
                case 'View all employees':
                    // Logic to view all employees
                    console.log("Viewing all employees...");
                    break;
                case 'Add a department':
                    // Logic to add a department
                    console.log("Adding a department...");
                    const departmentData = await addDepartment();
                    console.log("Department added:", departmentData);
                    break;
                case 'Add a role':
                    // Logic to add a role
                    console.log("Adding a role...");
                    const roleData = await addRole();
                    console.log("Role added:", roleData);
                    break;
                case 'Add an employee':
                    // Logic to add an employee
                    console.log("Adding an employee...");
                    const employeeData = await addEmployee();
                    console.log("Employee added:", employeeData);
                    break;
                case 'Update an employee role':
                    // Logic to update an employee role
                    console.log("Updating an employee role...");
                    const updateData = await updateEmployeeRole();
                    console.log("Employee role updated:", updateData);
                    break;
                case 'Exit':
                    console.log("Exiting...");
                    break;
            }
        } while (userResponses.menuChoice !== 'Exit');
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Initialize the script
init();

module.exports = {
    mainMenu,
    addDepartment,
    addRole,
    addEmployee,
    updateEmployeeRole
};
