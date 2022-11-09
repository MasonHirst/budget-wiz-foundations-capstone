DROP TABLE IF EXISTS incomes;
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS budget_categories;
DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS users;


CREATE TABLE USERS (
  acc_id SERIAL PRIMARY KEY,
  acc_name VARCHAR(25),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(500)
  );

  CREATE TABLE budgets (
  budget_id SERIAL PRIMARY KEY,
  name_1 VARCHAR(25),
  user_id int,
  month_name VARCHAR(255),
  FOREIGN KEY(user_id) REFERENCES users(acc_id)
  );

  CREATE TABLE budget_categories (
  category_id SERIAL PRIMARY KEY,
  budget_id int REFERENCES budgets(budget_id),
  category_name VARCHAR(255),
  category_budget DECIMAL
  );

  CREATE TABLE expenses (
  expenses_id SERIAL PRIMARY KEY,
  category_id int REFERENCES budget_categories(category_id),
  name VARCHAR(255),
  amount DECIMAL,
  note VARCHAR(500)
  );

  CREATE TABLE incomes (
  incomes_id SERIAL PRIMARY KEY,
  category_id int REFERENCES budget_categories(category_id),
  name VARCHAR(255),
  amount DECIMAL,
  note VARCHAR(500)
  );


INSERT INTO users (acc_name, email, password)
    VALUES ('Jack and Jill', 'jack@gmail.com', 'passw0rd'),
    ('Bob and Mary', 'bob@yahoo.com', 'ilovemary');