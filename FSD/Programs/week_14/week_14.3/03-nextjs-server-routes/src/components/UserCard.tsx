import axios from "axios";

type Data = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

// Here browser is sending data to the Next.js server and the Next.js server is hitting the API route.
// And the API route is returning the data to the Next.js server. And the Next.js server is returning the data to the
// browser. (We should not do like this, Eventually we will fix this)
const fetchData = async () => {
  // This is for testing the loading state.
  // Uncomment this to test the loading state.
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const response = await axios.get<{ message: string; data: Data[] }>(
    "http://localhost:3000/api/user"
  );
  return response.data.data;
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
