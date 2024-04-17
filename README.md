# Employee Tracker

- psql postgres


- postgres=# \i schema.sql 
- psql:schema.sql:1: NOTICE:  table "departments" does not exist, skipping
- DROP TABLE
- psql:schema.sql:2: NOTICE:  table "roles" does not exist, skipping
- DROP TABLE
- psql:schema.sql:3: NOTICE:  table "employees" does not exist, skipping
- DROP TABLE
- DROP DATABASE
- ❯ psql postgres
- psql (14.7 (Homebrew))
- Type "help" for help.
- 
- employee_db=# \i seeds.sql;
- INSERT 0 4
- INSERT 0 4
- INSERT 0 4
- employee_db=# 
- 