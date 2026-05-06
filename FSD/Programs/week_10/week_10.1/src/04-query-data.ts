import { Client } from 'pg';

// Async function to query data from a table
async function queryData(email: string) {
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    await client.connect();
    const query = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const result = await client.query(query, values);

    if (result.rows.length > 0) {
      console.log('User found:', result.rows[0]);
    } else {
      console.log('No user found with the given email.');
    }
  } catch (err) {
    console.error('Error during the query:', err);
  } finally {
    await client.end();
  }
}

queryData('yaswanth@example.com').catch(console.error);
