import { useState } from "react";

function TodoItem({ todo, onMarkCompleted, onDeleteTodo, onEditTodo }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);

  const handleMarkCompleted = async () => {
    if (todo.completed) return;

    setLoading(true);
    setMessage("");

    const result = await onMarkCompleted(todo._id);

    if (result.success) {
      setMessage("Marked as completed!");
      setTimeout(() => setMessage(""), 2000);
    } else {
      setMessage(result.message || "Failed to update todo");
      setTimeout(() => setMessage(""), 3000);
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this todo?")) {
      return;
    }

    setLoading(true);
    setMessage("");

    const result = await onDeleteTodo(todo._id);

    if (result.success) {
      setMessage("Todo deleted successfully!");
      setTimeout(() => setMessage(""), 2000);
    } else {
      setMessage(result.message || "Failed to delete todo");
      setTimeout(() => setMessage(""), 3000);
    }

    setLoading(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const handleSaveEdit = async () => {
    if (!editTitle.trim() || !editDescription.trim()) {
      setMessage("Title and description are required");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    setLoading(true);
    setMessage("");

    const result = await onEditTodo(
      todo._id,
      editTitle.trim(),
      editDescription.trim()
    );

    if (result.success) {
      setMessage("Todo updated successfully!");
      setTimeout(() => setMessage(""), 2000);
      setIsEditing(false);
    } else {
      setMessage(result.message || "Failed to update todo");
      setTimeout(() => setMessage(""), 3000);
    }

    setLoading(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setMessage("");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        border: todo.completed ? "2px solid #27ae60" : "2px solid #e0e0e0",
        opacity: todo.completed ? 0.8 : 1,
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "15px",
        }}
      >
        <div style={{ flex: 1 }}>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "1.1rem",
                  marginBottom: "8px",
                  boxSizing: "border-box",
                }}
                placeholder="Enter title"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                style={{
                  width: "100%",
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  minHeight: "80px",
                  resize: "vertical",
                  boxSizing: "border-box",
                  marginBottom: "12px",
                }}
                placeholder="Enter description"
              />
            </div>
          ) : (
            <>
              <h3
                style={{
                  margin: "0 0 8px 0",
                  color: todo.completed ? "#7f8c8d" : "#2c3e50",
                  fontSize: "1.2rem",
                  textDecoration: todo.completed ? "line-through" : "none",
                  textDecorationColor: "#7f8c8d",
                }}
              >
                {todo.title}
              </h3>

              <p
                style={{
                  margin: "0 0 12px 0",
                  color: todo.completed ? "#95a5a6" : "#34495e",
                  lineHeight: "1.5",
                  textDecoration: todo.completed ? "line-through" : "none",
                  textDecorationColor: "#95a5a6",
                }}
              >
                {todo.description}
              </p>
            </>
          )}

          <div
            style={{
              fontSize: "0.85rem",
              color: "#7f8c8d",
            }}
          >
            Created: {formatDate(todo.createdAt)}
          </div>

          {message && (
            <div
              style={{
                marginTop: "10px",
                padding: "8px",
                borderRadius: "4px",
                fontSize: "0.9rem",
                backgroundColor:
                  message.includes("successfully") ||
                  message.includes("completed")
                    ? "#d4edda"
                    : "#f8d7da",
                color:
                  message.includes("successfully") ||
                  message.includes("completed")
                    ? "#155724"
                    : "#721c24",
                border: `1px solid ${
                  message.includes("successfully") ||
                  message.includes("completed")
                    ? "#c3e6cb"
                    : "#f5c6cb"
                }`,
              }}
            >
              {message}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {isEditing ? (
            <>
              <button
                onClick={handleSaveEdit}
                disabled={loading}
                style={{
                  backgroundColor: loading ? "#95a5a6" : "#27ae60",
                  color: "white",
                  padding: "8px 16px",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "0.9rem",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                }}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={loading}
                style={{
                  backgroundColor: "#95a5a6",
                  color: "white",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              {todo.completed ? (
                <div
                  style={{
                    backgroundColor: "#27ae60",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                  }}
                >
                  ✓ Completed
                </div>
              ) : (
                <button
                  onClick={handleMarkCompleted}
                  disabled={loading}
                  style={{
                    backgroundColor: loading ? "#95a5a6" : "#e74c3c",
                    color: "white",
                    padding: "8px 16px",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "0.9rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                    transition: "background-color 0.3s",
                  }}
                >
                  {loading ? "Updating..." : "Mark Complete"}
                </button>
              )}

              {!todo.completed && (
                <button
                  onClick={handleEdit}
                  disabled={loading}
                  style={{
                    backgroundColor: loading ? "#95a5a6" : "#3498db",
                    color: "white",
                    padding: "6px 12px",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "0.8rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    fontWeight: "bold",
                    transition: "background-color 0.3s",
                  }}
                >
                  Edit
                </button>
              )}

              <button
                onClick={handleDelete}
                disabled={loading}
                style={{
                  backgroundColor: loading ? "#95a5a6" : "#e74c3c",
                  color: "white",
                  padding: "6px 12px",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "0.8rem",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontWeight: "bold",
                  transition: "background-color 0.3s",
                }}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
