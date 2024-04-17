const express = require('express');
const { Pool } = require('pg');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const pool = new Pool({
  user: '',
  password: '',
  host: 'localhost',
  database: 'employee_db'
});

pool.connect()
  .then(() => console.log('Connected to the employee_db database!'))
  .catch(err => console.error('Error connecting to database', err));

app.get('/api/departments', (req, res) => {
  pool.query('SELECT * FROM departments', (err, {rows}) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/roles', (req, res) => {
  pool.query('SELECT * FROM roles', (err, {rows}) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

app.get('/api/employees', (req, res) => {
  pool.query('SELECT * FROM employees', (err, {rows}) => {
    if (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(rows);
    }
  });
});

app.post('/api/add-department', (req, res) => {
  const { department_name } = req.body;
  console.log(req.body);
  pool.query('INSERT INTO departments (department_name) VALUES ($1) RETURNING *',
    [department_name],
    (err, {rows}) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(rows[0]);
      }
    });
});

app.post('/api/add-role', (req, res) => {
  const { title, salary, department } = req.body;
  pool.query('SELECT id FROM departments WHERE department_name=$1', [department])
    .then(result => {
      const departmentId = result.rows[0].id;

      pool.query('INSERT INTO roles (title, salary, department_id) VALUES ($1, $2, $3) RETURNING *',
        [title, salary, departmentId],
        (err, { rows }) => {
          if (err) {
            console.error('Error executing query', err);
            res.status(500).json({ error: 'Internal server error' });
          } else {
            res.json(rows[0]);
          }
        });
    })
    .catch(err => {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.post('/api/add-employee', (req, res) => {
  const { first_name, last_name, role, manager } = req.body;

  let roleId;
  pool.query('SELECT id FROM roles WHERE title=$1', [role])
    .then(role_result => {
      roleId = role_result.rows[0].id;
      return pool.query('SELECT id FROM employees WHERE first_name=$1', [manager]);
    })
    .then(manager_result => {
      const managerId = manager_result.rows[0].id;
      return pool.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4) RETURNING *',
        [first_name, last_name, roleId, managerId]);
    })
    .then(({ rows }) => {
      res.json(rows[0]);
    })
    .catch(err => {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});



app.delete('/api/delete-employee/:id', (req, res) => {
  const employeeId = req.params.id;
  pool.query('DELETE FROM employees WHERE employee_id = $1',
    [employeeId],
    (err) => {
      if (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.sendStatus(200);
      }
    });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
