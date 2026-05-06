import prisma from "../db";

// Browser sent the request to the Next.js server and the Next.js server is hitting Next.js API route.
// Next.js API route is returning the data to the Next.js server.
// Next.js server is returning the data to the browser.
// Which is unnecessary because the Next.js server is already fetching the data from the database.

// The correct way to fetch data from the database is to use the Prisma client.
const fetchData = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    return [];
  } finally {
    await prisma.$disconnect();
  }
};

export const UserCard = async () => {
  const data = await fetchData();

  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded flex flex-col gap-4">
          {data.map((user) => (
            <div key={user.id}>
              <div>
                <b>Name:</b> {user.name}
              </div>
              <div>
                <b>Email:</b> {user.email}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
