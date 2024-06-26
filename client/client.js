const inquirer = require("inquirer");
const client_helper = require("./client_helper");

const mainMenu = () =>
  new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: "list",
          name: "menuChoice",
          message: "What would you like to do?",
          choices: [
            "View all departments",
            "View all roles",
            "View all employees",
            "Add department",
            "Add role",
            "Add employee",
            "Update employee role",
            "Exit",
          ],
        },
      ])
      .then((answers) => {
        resolve(answers);
      })
      .catch((error) => {
        reject(error);
      });
  });

const addDepartment = () => 
  inquirer.prompt([
    {
      type: "input",
      name: "department_name",
      message: "Enter the name of the department:",
    },
  ]);


const addRole = async (department_names) =>
  inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the title of the role:",
    },
    {
      type: "input",
      name: "salary",
      message: "Enter the salary for this role:",
      validate: (input) => {
        if (
          !isNaN(parseFloat(input)) &&
          isFinite(input) &&
          parseFloat(input) > 0
        ) {
          return true;
        } else {
          return "Please enter a valid salary (a positive number).";
        }
      },
    },
    {
      type: "list",
      name: "department",
      choices: department_names,
    },
  ]);

const addEmployee = (managers, roles) =>
  inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Enter the first name of the employee:",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter the last name of the employee:",
    },
    {
      type: "list",
      name: "role",
      choices: roles,
    },
    {
      type: "list",
      name: "manager",
      choices: managers,
    },
  ]);

const updateEmployeeRole = () =>
  inquirer.prompt([
    {
      type: "input",
      name: "employeeToUpdate",
      message: "Enter the name of the employee to update:",
    },
    {
      type: "input",
      name: "newRole",
      message: "Enter the new role for this employee:",
    },
  ]);

// Function to initialize the script
const init = async () => {
  try {
    let userResponses;
    do {
      userResponses = await mainMenu();
      switch (userResponses.menuChoice) {
        case "View all departments":
          // Logic to view all departments
          console.log("Viewing all departments...");
          await client_helper.getDepartments().catch((error) => {
            console.error(
              "An error occurred while fetching departments:",
              error
            );
          });
          break;
        case "View all roles":
          // Logic to view all roles
          console.log("Viewing all roles...");
          await client_helper.getRoles().catch((error) => {
            console.error("An error occurred while fetching roles:", error);
          });
          break;
        case "View all employees":
          // Logic to view all employees
          console.log("Viewing all employees...");
          await client_helper.getEmployees().catch((error) => {
            console.error("An error occurred while fetching employees:", error);
          });
          break;
        case "Add department":
          console.log("Adding a department...");
          const departmentData = await addDepartment();
          await client_helper.addDepartment(departmentData).catch((error) => {
            console.error("An error occurred while adding department:", error);
          });
          break;
        case "Add role":
          // Logic to add a role
          console.log("Adding a role...");
          const departments = await client_helper.getDepartments(false).catch((error) => {
            console.error("An error occurred while fetching departments:", error);
          });
          const department_names = departments.map((dep) => dep.department_name);
          const roleData = await addRole(department_names);
          await client_helper.addRole(roleData).catch((error) => {
            console.error("An error occurred while adding role:", error);
          });
          break;
        case "Add employee":
          // Logic to add an employee
          console.log("Adding an employee...");
          const roles = await client_helper.getRoles(false).catch((error) => {
            console.error("An error occurred while fetching roles:", error);
          });
          const role_names = roles.map((rol) => rol.title);

          const managers = await client_helper.getEmployees(false).catch((error) => {
            console.error("An error occurred while fetching managers:", error);
          });
          const manager_names = managers.map((man) => man.first_name);

          const employeeData = await addEmployee(manager_names, role_names);

          await client_helper.addEmployee(employeeData).catch((error) => {
            console.error("An error occurred while adding employee:", error);
          });
          break;
        case "Update employee role":
          // Logic to update an employee role
          console.log("Updating an employee role...");
          // const updateData = await updateEmployeeRole();
          // console.log("Employee role updated:", updateData);
          break;
        case "Exit":
          console.log("Exiting...");
          break;
      }
    } while (userResponses.menuChoice !== "Exit");
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Initialize the script
init();

module.exports = {
  mainMenu,
  addDepartment,
  addRole,
  addEmployee,
  updateEmployeeRole,
};
