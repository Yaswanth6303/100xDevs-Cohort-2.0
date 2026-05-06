// ------------------------------------------------------
// Import dependencies
// ------------------------------------------------------
//
// `pg` → Official PostgreSQL client for Node.js.
//        Used to connect, execute SQL, and manage transactions.
//
// `dotenv` → Loads environment variables from your `.env` file
//             into `process.env` at runtime.
//
// Example .env file:
//   DATABASE_URL=postgresql://user:password@localhost:5432/mydb
//
import { Client } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// ------------------------------------------------------
// Define a TypeScript type for combined data
// ------------------------------------------------------
//
// The `UserAndAddress` type represents all the fields required
// to insert a new user along with their address.
//
// This ensures compile-time type checking so that when you call
// `insertUserAndAddress()`, you *must* provide every required field.
type UserAndAddress = {
  username: string;
  email: string;
  password: string;
  city: string;
  country: string;
  street: string;
  pincode: string;
};

// ------------------------------------------------------
// The main function — insertUserAndAddress()
// ------------------------------------------------------
//
// This function inserts a new user and their corresponding address
// into the database in one **transaction**.
//
// A transaction ensures that **either all operations succeed**
// (user + address inserted) OR **none do** (if any error occurs).
//
// This prevents “half-saved” data and maintains **data integrity**.
async function insertUserAndAddress({
  username,
  email,
  password,
  city,
  country,
  street,
  pincode,
}: UserAndAddress) {
  // ------------------------------------------------------
  // Create a new PostgreSQL client connection
  // ------------------------------------------------------
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // ------------------------------------------------------
    // Step 1: Connect to the database
    // ------------------------------------------------------
    await client.connect();

    // ------------------------------------------------------
    // Step 2: Begin a transaction
    // ------------------------------------------------------
    //
    // The 'BEGIN' command tells PostgreSQL to start a new transaction.
    // Any SQL executed after this point will be part of the same transaction
    // until you explicitly COMMIT or ROLLBACK.
    await client.query('BEGIN');

    // ------------------------------------------------------
    // Step 3: Insert a new user into the "users" table
    // ------------------------------------------------------
    //
    // Use parameterized queries (with `$1`, `$2`, etc.) to prevent
    // SQL injection attacks — a best practice.
    //
    // The `RETURNING id` clause makes PostgreSQL return the newly
    // inserted user’s ID immediately, so you can use it in the
    // next query (for inserting their address).
    const insertUserText = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id;
    `;

    // Execute the query and store the result.
    // The result contains the generated user ID.
    const userRes = await client.query(insertUserText, [username, email, password]);
    const userId = userRes.rows[0].id; // Extract the generated user ID

    // ------------------------------------------------------
    // Step 4: Insert the related address record
    // ------------------------------------------------------
    //
    // The foreign key relationship is handled by the `user_id` column
    // in the "addresses" table (linked to `users.id`).
    //
    // Because both inserts happen in the same transaction,
    // they will be treated as one atomic operation.
    const insertAddressText = `
      INSERT INTO addresses (user_id, city, country, street, pincode)
      VALUES ($1, $2, $3, $4, $5);
    `;

    // Execute address insertion, using the `userId` from above.
    await client.query(insertAddressText, [userId, city, country, street, pincode]);

    // ------------------------------------------------------
    // Step 5: Commit the transaction
    // ------------------------------------------------------
    //
    // If both inserts succeed, the transaction is committed.
    // The data is now permanently saved in the database.
    await client.query('COMMIT');

    console.log('User and address inserted successfully');
  } catch (error) {
    // ------------------------------------------------------
    // Step 6: Handle errors and rollback
    // ------------------------------------------------------
    //
    // If *any* error occurs during the transaction, you roll back
    // to the state before the transaction began — meaning no partial data.
    await client.query('ROLLBACK');
    console.error('Error during transaction. Rolled back changes.', error);

    // Rethrow the error so the caller can handle it too
    throw error;
  } finally {
    // ------------------------------------------------------
    // Step 7: Always close the database connection
    // ------------------------------------------------------
    //
    // This runs no matter what (success or failure).
    // It ensures that database connections are properly released
    // and don’t cause memory leaks or connection exhaustion.
    await client.end();
  }
}

// ------------------------------------------------------
// Example usage
// ------------------------------------------------------
//
// Here, we call the function with example data.
// In a real-world app, this data might come from a frontend form
// or API request.
insertUserAndAddress({
  username: 'Jane Doe',
  email: 'jane@gmail.com',
  password: 'jane123',
  city: 'California',
  country: 'USA',
  street: '123 Main St',
  pincode: '90210',
});
