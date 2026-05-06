import { Client } from 'pg';

const client = new Client({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// Async function to insert data into the users table
async function insertData() {
  await client.connect();
  try {
    // This is insecure way to insert data into the database
    // We should use parameterized query to prevent SQL injection
    // We should use a library like pg-promise, knex, objection, sequelize, typeorm to insert data into the database
    const result = await client.query(
      `
            INSERT INTO users (username, email, password) VALUES ('Yaswanth', 'yaswanth@example.com', 'yaswanth_password');
        `,
    );
    console.log(result);
  } catch (err) {
    console.error('Error during the insertion:', err);
  } finally {
    await client.end();
  }
}

insertData();
