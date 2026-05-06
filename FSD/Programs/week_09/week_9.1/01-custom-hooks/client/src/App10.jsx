// Using SWR Library with setTimeout

import { useEffect, useState } from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

function Todos() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:3000/todos",
    fetcher
  );

  const [showData, setShowData] = useState(false);

  useEffect(() => {
    // Delay for 3 seconds when component mounts
    const timer = setTimeout(() => {
      setShowData(true);
    }, 3000);

    return () => clearTimeout(timer); // cleanup
  }, []);

  if (error) return <div>Failed to load</div>;

  // Always show "Loading..." for 3 seconds, no matter what
  if (isLoading || !showData) return <div>Loading...</div>;

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

export default Todos;
