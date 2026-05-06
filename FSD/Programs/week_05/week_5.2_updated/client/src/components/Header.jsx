function Header() {
  return (
    <header
      style={{
        textAlign: "center",
        marginBottom: "30px",
        padding: "20px 0",
        borderBottom: "2px solid #e0e0e0",
      }}
    >
      <h1
        style={{
          color: "#2c3e50",
          margin: "0",
          fontSize: "2.5rem",
          fontWeight: "bold",
        }}
      >
        Todo App
      </h1>
      <p
        style={{
          color: "#7f8c8d",
          margin: "10px 0 0 0",
          fontSize: "1.1rem",
        }}
      >
        Manage your tasks efficiently
      </p>
    </header>
  );
}

export default Header;
