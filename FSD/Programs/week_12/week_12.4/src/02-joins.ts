// ------------------------------------------------------
// Import dependencies
// ------------------------------------------------------
//
// `pg` (node-postgres) → A Node.js client for PostgreSQL.
// Lets you connect, send queries, and fetch results.
//
// `dotenv` → Loads environment variables (like DATABASE_URL)
// from a `.env` file into process.env.
import { Client } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file.
dotenv.config();

// ------------------------------------------------------
// Create a PostgreSQL client instance
// ------------------------------------------------------
//
// The `Client` class represents a single connection to the DB.
//
// The `connectionString` typically looks like:
//   postgresql://user:password@host:port/database
//
// Example .env file entry:
//   DATABASE_URL=postgresql://postgres:password@localhost:5432/mydb
//
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

// ------------------------------------------------------
// The main async function
// ------------------------------------------------------
//
// We wrap our logic in an async function so we can use
// `await` for cleaner asynchronous handling.
async function main() {
  try {
    // ------------------------------------------------------
    // Step 1: Connect to the database
    // ------------------------------------------------------
    await client.connect();
    console.log('Connected to the database');

    // ------------------------------------------------------
    // Step 2: Execute a JOIN query
    // ------------------------------------------------------
    //
    // This SQL query retrieves data from *both* the `users`
    // and `addresses` tables where their IDs are related.
    //
    // Breakdown of the query:
    //  - `SELECT *`: Select all columns from both tables.
    //  - `FROM users`: Start with the `users` table.
    //  - `JOIN addresses ON users.id = addresses.user_id`:
    //        This combines both tables where each user's ID matches
    //        the corresponding foreign key in the `addresses` table.
    //  - `WHERE users.id = 1`:
    //        Filters the result to only return user with ID = 1.
    //
    // This is a **one-to-one** or **one-to-many relationship**
    // depending on whether one user can have multiple addresses.
    const result = await client.query(`
      SELECT * 
      FROM users
      JOIN addresses ON users.id = addresses.user_id
      WHERE users.id = 1;
    `);

    // ------------------------------------------------------
    // Step 3: Access and display the results
    // ------------------------------------------------------
    //
    // The `.query()` method returns an object:
    // {
    //   rows: [ ... ],        // actual data
    //   rowCount: <number>,   // number of rows returned
    //   command: 'SELECT',    // SQL command type
    //   fields: [...]         // column metadata
    // }
    //
    // `rows` contains the result data as an array of JS objects.
    //
    // Example output:
    // [
    //   {
    //     id: 1,
    //     username: 'John',
    //     email: 'john@example.com',
    //     password: 'john123',
    //     user_id: 1,
    //     city: 'New York',
    //     country: 'USA',
    //     street: '5th Avenue',
    //     pincode: '10001'
    //   }
    // ]
    console.log('Result:', result.rows);
  } catch (error) {
    // ------------------------------------------------------
    // Step 4: Handle errors gracefully
    // ------------------------------------------------------
    //
    // If something goes wrong (connection issue, bad SQL, etc.),
    // this block catches and logs it.
    console.error('Error connecting to the database:', error);
    throw error; // Rethrow for higher-level handling if needed.
  } finally {
    // ------------------------------------------------------
    // Step 5: Close the database connection
    // ------------------------------------------------------
    //
    // Always close the DB connection to prevent memory leaks.
    // `finally` ensures this runs even if an error occurs.
    await client.end();
    console.log('Disconnected from the database');
  }
}

// ------------------------------------------------------
// Execute the main function
// ------------------------------------------------------
//
// `.catch()` handles any unhandled promise rejections.
main().catch(console.error);
