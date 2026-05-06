// Using swr library

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
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/todos",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  
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
