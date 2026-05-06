import { Client } from 'pg';

// Async function to update data in a table
async function updateData(id: number, username: string, email: string, password: string) {
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    await client.connect();
    const updateQuery = 'UPDATE users SET (username, email, password) = ($1, $2, $3) WHERE id = $4';
    const values = [username, email, password, id];
    const result = await client.query(updateQuery, values);
    console.log('Update success:', result);
  } catch (err) {
    console.error('Error during the update:', err);
  } finally {
    await client.end();
  }
}

// Example usage
// updateData(4, 'username4', 'user4@example.com', 'user_password').catch(console.error);
updateData(2, 'Yaswanth', 'yaswanth@gmail.com', 'user_password').catch(console.error);