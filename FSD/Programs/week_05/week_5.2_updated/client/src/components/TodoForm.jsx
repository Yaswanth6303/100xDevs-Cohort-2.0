import { useState } from "react";
import axios from "axios";

function TodoForm({ setTodos }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/todos";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      setMessage("Please fill in both title and description");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(API_BASE_URL, {
        title: title.trim(),
        description: description.trim(),
      });
      // console.log(response);
      const result = response.data;
      // console.log(result);
      if (result.success) {
        setTitle("");
        setDescription("");
        setMessage("Todo created successfully!");
        setTimeout(() => setMessage(""), 3000);
        setTodos((prev) => [...prev, result.data]);
      } else {
        setMessage(result.message || "Failed to create todo");
      }
    } catch (err) {
      setMessage("Error creating todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        marginBottom: "30px",
      }}
    >
      <h2
        style={{
          margin: "0 0 20px 0",
          color: "#2c3e50",
          fontSize: "1.5rem",
        }}
      >
        Add New Todo
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#34495e",
            }}
          >
            Title:
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo title"
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid #e0e0e0",
              borderRadius: "6px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
            disabled={loading}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#34495e",
            }}
          >
            Description:
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description"
            rows="3"
            style={{
              width: "100%",
              padding: "12px",
              border: "2px solid #e0e0e0",
              borderRadius: "6px",
              fontSize: "16px",
              resize: "vertical",
              boxSizing: "border-box",
              fontFamily: "inherit",
            }}
            disabled={loading}
          />
        </div>

        {message && (
          <div
            style={{
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "15px",
              backgroundColor: message.includes("successfully")
                ? "#d4edda"
                : "#f8d7da",
              color: message.includes("successfully") ? "#155724" : "#721c24",
              border: `1px solid ${
                message.includes("successfully") ? "#c3e6cb" : "#f5c6cb"
              }`,
            }}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? "#95a5a6" : "#3498db",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s",
          }}
        >
          {loading ? "Creating..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
}

export default TodoForm;
