import { Client } from 'pg';

// Async function to fetch user data from the database given an email

const client = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

async function createUserTable() {
  await client.connect();
  try {
    const result = await client.query(
      `
          CREATE TABLE users (
              id SERIAL PRIMARY KEY,
              username VARCHAR(50) UNIQUE NOT NULL,
              email VARCHAR(255) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
          );
          `,
    );
    console.log(result);
  } catch (err) {
    console.error('Error during the creation of the table:', err);
  } finally {
    await client.end();
  }
}

createUserTable();

// Created address table and inserted data using pgcli (or) psql in terminal
// To connect to pgcli (or) psql in terminal (Using Docker for PostgreSQL Image)
// pgcli -h localhost -p 5432 -U postgres -d postgres
// psql -h localhost -p 5432 -U postgres -d postgres

// CREATE TABLE addresses (
//   id SERIAL PRIMARY KEY,
//   user_id INTEGER NOT NULL,
//   city VARCHAR(100) NOT NULL,
//   country VARCHAR(100) NOT NULL,
//   street VARCHAR(255) NOT NULL,
//   pincode VARCHAR(20),
//   created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
// );

// INSERT INTO addresses (user_id, city, country, street, pincode)
// VALUES (2, 'New York', 'USA', '123 Broadway St', '10001');