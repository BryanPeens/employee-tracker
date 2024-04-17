class ClientHelper {
  // Function to handle GET requests
  async get(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
      return { error: "Error fetching data" };
    }
  }

  // Function to handle POST requests
  async post(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Error posting data:", error);
      return { error: "Error posting data" };
    }
  }

  // Function to handle DELETE requests
  async remove(url) {
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return true;
    } catch (error) {
      console.error("Error deleting data:", error);
      return { error: "Error deleting data" };
    }
  }

  // GET departments request
  async getDepartments(showTable = true) {
    const departments = await this.get("http://localhost:3001/api/departments");
    if (showTable) {
      console.table(departments);      
    }
    return departments;
  }

  // GET roles request
  async getRoles(showTable = true) {
    const roles = await this.get("http://localhost:3001/api/roles");
    if (showTable) {
      console.table(roles);   
    }
    return roles;
  }

  // GET employees request
  async getEmployees(showTable = true) {
    const employees = await this.get("http://localhost:3001/api/employees");
    if (showTable) {
      console.table(employees);   
    }
    return employees;
  }

  // POST department
  async addDepartment(departmentData) {
    const newDepartment = await this.post(
      "http://localhost:3001/api/add-department",
      departmentData
    );
    console.table([newDepartment]);
    return newDepartment;
  }

  // POST role
  async addRole(roleData) {
    const newRole = await this.post(
      "http://localhost:3001/api/add-role",
      roleData
    );
    console.table([newRole]);
    return newRole;
  }

  // POST employee
  async addEmployee(employeeData) {
    const newEmployee = await this.post(
      "http://localhost:3001/api/add-employee",
      employeeData
    );
    console.table([newEmployee]);
    return newEmployee;
  }

  // DELETE request example
  async updateEmployee(employeeId) {
    const success = await remove(
      `http://localhost:3001/api/delete-employee/${employeeId}`
    );
    if (success) {
      console.log("Employee deleted successfully");
    } else {
      console.log("Failed to delete employee");
    }
  }
}
module.exports = new ClientHelper();
