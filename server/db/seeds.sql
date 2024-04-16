-- Insert dummy values into departments table
INSERT INTO departments (department_name) VALUES
  ('Engineering'),
  ('Marketing'),
  ('Sales'),
  ('Finance');

-- Insert dummy values into roles table
INSERT INTO roles (title, salary, department_id) VALUES
  ('Software Engineer', 80000.00, 1),
  ('Marketing Manager', 75000.00, 2),
  ('Sales Representative', 60000.00, 3),
  ('Financial Analyst', 70000.00, 4);

-- Insert dummy values into employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Michael', 'Johnson', 3, 1),
  ('Emily', 'Williams', 4, NULL);
