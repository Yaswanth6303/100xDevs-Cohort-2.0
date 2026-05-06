// Relationships

// ------------------------------------------------------
// 1️⃣ Importing dependencies
// ------------------------------------------------------
//
// `pg` → Official PostgreSQL client for Node.js.
// It allows you to connect, run SQL queries, and manage results.
//
// `dotenv` → Loads environment variables from a `.env` file
// into `process.env`, so you can safely store secrets like DB URLs.
import { Client } from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// ------------------------------------------------------
// 2️⃣ Database connection setup
// ------------------------------------------------------
//
// The `Client` class from `pg` represents a single connection to the database.
//
// The `connectionString` can include all credentials and connection info in one string.
//
// Example of a DATABASE_URL in .env file:
//   DATABASE_URL=postgresql://username:password@localhost:5432/mydatabase
//
// This allows you to keep your sensitive credentials outside your source code.
const client = new Client({
  connectionString: process.env.DATABASE_URL, // Read from environment variable
});

// ------------------------------------------------------
// 3️⃣ Defining an async main function
// ------------------------------------------------------
//
// Using an async function allows us to use `await` for cleaner asynchronous
// operations (connect → query → disconnect).
async function main() {
  try {
    // ------------------------------------------------------
    // 🟢 Step 1: Connect to the database
    // ------------------------------------------------------
    await client.connect();
    console.log('✅ Connected to the database');

    // ------------------------------------------------------
    // 🟠 Step 2: Run a SQL query
    // ------------------------------------------------------
    //
    // In this example, you are selecting address details for a particular user.
    //
    // Suppose your database has two tables:
    //
    //   users
    //   ├── id (PK)
    //   ├── name
    //   └── email
    //
    //   addresses
    //   ├── id (PK)
    //   ├── user_id (FK → users.id)
    //   ├── city
    //   ├── country
    //   ├── street
    //   └── pincode
    //
    // Here, we’re fetching address info for `user_id = 1`.
    //
    // This demonstrates a **one-to-one or one-to-many relationship**,
    // depending on how many addresses a user can have.
    const result = await client.query(
      'SELECT city, country, street, pincode FROM addresses WHERE user_id = 1;',
    );

    // ------------------------------------------------------
    // 🟣 Step 3: Work with query results
    // ------------------------------------------------------
    //
    // The `.query()` method returns an object with properties like:
    //   - rows: the actual result rows (array of objects)
    //   - rowCount: number of rows returned
    //   - command: SQL command executed (SELECT, INSERT, etc.)
    //
    // For example:
    // result.rows might look like:
    // [
    //   { city: 'New York', country: 'USA', street: '5th Avenue', pincode: '10001' },
    //   { city: 'Boston', country: 'USA', street: 'Harvard St', pincode: '02138' }
    // ]
    console.log(result.rows);

    // ------------------------------------------------------
    // 🟡 Optional: Handling relationships (example conceptually)
    // ------------------------------------------------------
    //
    // If you also want to include user data along with address details,
    // you could perform a SQL JOIN like this:
    //
    // const result = await client.query(`
    //   SELECT users.name, users.email, addresses.city, addresses.country
    //   FROM users
    //   JOIN addresses ON users.id = addresses.user_id
    //   WHERE users.id = 1;
    // `);
    //
    // This combines both tables into a single query result,
    // demonstrating a **relational JOIN** between users and addresses.
  } catch (error) {
    // ------------------------------------------------------
    // 🔴 Step 4: Error handling
    // ------------------------------------------------------
    //
    // Any connection, query, or SQL syntax error will be caught here.
    console.error('❌ Error connecting to the database', error);
    throw error; // Rethrow for debugging / higher-level handling
  } finally {
    // ------------------------------------------------------
    // ⚪ Step 5: Close the database connection
    // ------------------------------------------------------
    //
    // Always close the connection in `finally` to ensure it runs
    // even if an error occurs.
    await client.end();
    console.log('🔒 Disconnected from the database');
  }
}

// ------------------------------------------------------
// 4️⃣ Execute the main function
// ------------------------------------------------------
//
// Because `main` is async, we handle any top-level errors
// using `.catch()` to prevent unhandled promise rejections.
main().catch(console.error);
