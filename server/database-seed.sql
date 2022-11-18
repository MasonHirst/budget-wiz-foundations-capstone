DROP TABLE IF EXISTS incomes;
DROP TABLE IF EXISTS expenses;
DROP TABLE IF EXISTS budget_categories;
DROP TABLE IF EXISTS budgets;
DROP TABLE IF EXISTS users;


CREATE TABLE USERS (
  acc_id SERIAL PRIMARY KEY,
  acc_name VARCHAR(25) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(500) NOT NULL
  );

  CREATE TABLE budgets (
  budget_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  user_id int NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(acc_id)
  );

  CREATE TABLE budget_categories (
  category_id SERIAL PRIMARY KEY,
  budget_id int REFERENCES budgets(budget_id) NOT NULL,
  category_name VARCHAR(255) NOT NULL,
  category_budget DECIMAL NOT NULL
  );

  CREATE TABLE expenses (
  expenses_id SERIAL PRIMARY KEY,
  category_id int REFERENCES budget_categories(category_id) NOT NULL,
  name VARCHAR(255) NOT NULL,
  amount DECIMAL NOT NULL,
  note VARCHAR(500)
  );

  CREATE TABLE incomes (
  incomes_id SERIAL PRIMARY KEY,
  category_id int REFERENCES budget_categories(category_id) NOT NULL,
  name VARCHAR(255) NOT NULL,
  amount DECIMAL NOT NULL,
  note VARCHAR(500)
  );


INSERT INTO users (acc_name, email, password)
    VALUES ('Jack and Jill', 'jack@gmail.com', 'passw0rd'),
    ('Bob and Mary', 'bob@yahoo.com', 'ilovemary');

INSERT INTO budgets (name, user_id)
    VALUES ('Nov 2022 budget', 1),
    ('Jack and Jill december budget', 1),
    ('Bob and Mary january budget', 2),
    ('Bob secret february budget', 2);

INSERT INTO budget_categories (budget_id, category_name, category_budget)
    VALUES (1, 'groceries', 200.57),
    (1, 'rent', 850.00),
    (2, 'food', 410.25),
    (2, 'gas', 89.00),
    (3, 'eating out', 60.01),
    (3, 'traveling', 550.00),
    (4, 'food', 85.00),
    (4, 'costumes', 150.00);

INSERT INTO expenses (category_id, name, amount, note)
    VALUES (1, 'bought milk', 6.57, ''),
    (1, 'cookies', 12.00, 'need cookies with the milk'),
    (2, 'december rent', 500, 'paid rent for december'),
    (3, 'groceries', 37, 'need me some ice cream'),
    (4, 'gas', 67.57, 'gotta fill er up'),
    (5, 'mcdonalds', 55, 'i love big macs on january 21st'),
    (6, 'went to greece', 1200.57, 'Plane tickets to greece'),
    (7, 'got bread for the party', 21, ''),
    (8, 'batman costume', 34, 'gotta look cool');
    
INSERT INTO incomes (category_id, name, amount, note)
    VALUES (1, 'paycheck', 1200, 'payday baby'),
    (2, 'paycheck', 2000, ''),
    (2, 'sold bike', 500, 'sad to see it go'),
    (3, 'payday', 4000, ''),
    (4, 'paycheck', 3450, ''),
    (5, 'car', 5404, 'sold the minivan'),
    (6, 'payday', 1330, ''),
    (7, 'bounty for grogu', 250000, ''),
    (8, 'payday', 9100, 'i get paid alot');


SELECT * FROM users