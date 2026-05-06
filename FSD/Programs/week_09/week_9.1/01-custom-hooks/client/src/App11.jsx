// Using swr library -> refreshInterval underhood using setInterval

import useSWR from "swr";
import axios from "axios";

const App9 = () => {
  return <Todos />;
};

const fetcher = async (url) => {
  const response = await axios.get(url);
  const json = await response.data;
  return json;
};

function Todos() {
  const { data, error, isLoading, isValidating } = useSWR(
    "http://localhost:3000/todos",
    fetcher,
    {
      refreshInterval: 3000, // re-fetch every 3 seconds
      dedupingInterval: 2000, // ignore duplicate calls for 2s
      loadingTimeout: 3000, // after 3s, mark request as "slow"
    }
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading && !data) return <div>Loading...</div>;
  if (isValidating) return <div>Validating...</div>;

  return (
    <div className="p-4">
      {data.todos.map((todo) => (
        <div key={todo.id}>
          <h3>{todo.title}</h3>
          <p>{todo.description}</p>
        </div>
      ))}
      <div className="pt-2 text-lg font-bold">
        You have {data.todos.length} todos!
      </div>
    </div>
  );
}

export default App9;
