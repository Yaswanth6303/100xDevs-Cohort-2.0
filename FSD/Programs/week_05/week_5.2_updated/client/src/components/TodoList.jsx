import { useEffect, useState } from "react";
import axios from "axios";
import TodoItem from "./TodoItem";

function TodoList({ todos, setTodos, loading, error, fetchTodos }) {
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/todos";

  const onMarkCompleted = async (id) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/completed`, {
        _id: id,
      });
      const result = response.data;
      if (result.success) {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, completed: true } : todo
          )
        );
        return { success: true };
      }
      return { success: false, message: result.message };
    } catch (err) {
      return { success: false, message: "Error updating todo" };
    }
  };

  const onDeleteTodo = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}`, {
        data: { _id: id },
      });
      const result = response.data;
      if (result.success) {
        setTodos(todos.filter((todo) => todo._id !== id));
        return { success: true };
      }
      return { success: false, message: result.message };
    } catch (err) {
      return { success: false, message: "Error deleting todo" };
    }
  };

  const onEditTodo = async (id, title, description) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/edit`, {
        _id: id,
        title,
        description,
      });
      const result = response.data;
      if (result.success) {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, title, description } : todo
          )
        );
        return { success: true };
      }
      return { success: false, message: result.message };
    } catch (err) {
      return { success: false, message: "Error updating todo" };
    }
  };

  const completedTodos = todos.filter((todo) => todo.completed);
  const pendingTodos = todos.filter((todo) => !todo.completed);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            color: "#2c3e50",
            margin: "0",
            fontSize: "1.8rem",
          }}
        >
          Your Todos
        </h2>
        <button
          onClick={fetchTodos}
          style={{
            backgroundColor: "#27ae60",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Refresh
        </button>
      </div>

      {loading && (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            fontSize: "18px",
            color: "#666",
          }}
        >
          Loading todos...
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: "#ffebee",
            color: "#c62828",
            padding: "15px",
            borderRadius: "8px",
            marginBottom: "20px",
            border: "1px solid #ffcdd2",
          }}
        >
          {error}
        </div>
      )}

      {todos.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "40px",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <p
            style={{
              color: "#7f8c8d",
              fontSize: "1.2rem",
              margin: "0",
            }}
          >
            No todos yet. Create your first todo above!
          </p>
        </div>
      ) : (
        <>
          {/* Pending Todos */}
          {pendingTodos.length > 0 && (
            <div style={{ marginBottom: "30px" }}>
              <h3
                style={{
                  color: "#e74c3c",
                  margin: "0 0 15px 0",
                  fontSize: "1.3rem",
                  borderBottom: "2px solid #e74c3c",
                  paddingBottom: "5px",
                }}
              >
                Pending ({pendingTodos.length})
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {pendingTodos.map((todo) => (
                  <TodoItem
                    key={todo._id}
                    todo={todo}
                    onMarkCompleted={onMarkCompleted}
                    onDeleteTodo={onDeleteTodo}
                    onEditTodo={onEditTodo}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Completed Todos */}
          {completedTodos.length > 0 && (
            <div>
              <h3
                style={{
                  color: "#27ae60",
                  margin: "0 0 15px 0",
                  fontSize: "1.3rem",
                  borderBottom: "2px solid #27ae60",
                  paddingBottom: "5px",
                }}
              >
                Completed ({completedTodos.length})
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {completedTodos.map((todo) => (
                  <TodoItem
                    key={todo._id}
                    todo={todo}
                    onMarkCompleted={onMarkCompleted}
                    onDeleteTodo={onDeleteTodo}
                    onEditTodo={onEditTodo}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default TodoList;
