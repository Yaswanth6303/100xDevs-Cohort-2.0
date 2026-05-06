import { Client } from 'pg';

// Async function to fetch user data and their address together
async function getUserDetailsWithAddress(userId: string) {
  const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    await client.connect();
    const query = `
            SELECT u.id, u.username, u.email, a.city, a.country, a.street, a.pincode
            FROM users u
            JOIN addresses a ON u.id = a.user_id
            WHERE u.id = $1
        `;
    const result = await client.query(query, [userId]);

    if (result.rows.length > 0) {
      console.log('User and address found:', result.rows[0]);
    } else {
      console.log('No user or address found with the given ID.');
    }
  } catch (err) {
    console.error('Error during fetching user and address:', err);
  } finally {
    await client.end();
  }
}

getUserDetailsWithAddress('2').catch(console.error);