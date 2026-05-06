// Importing BrowserRouter, Routes, Route, and Link from react-router-dom
// - BrowserRouter: Provides the router context to the app (must wrap everything that uses routing)
// - Routes: A container for all <Route> elements
// - Route: Defines a mapping between a URL path and a React component
// - Link: Used to navigate between routes (works like an <a> tag but prevents page reloads)
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// Importing two page components (Landing and Dashboard) from the "pages" folder
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

// Main App component (this is the root component)
// - It wraps the inner content with <BrowserRouter>
// - Without <BrowserRouter>, routing features won’t work
const App2 = () => {
  return (
    <BrowserRouter>
      {/* AppContent is a separate component that contains the UI and routes */}
      <AppContent />
    </BrowserRouter>
  );
};

// AppContent component
// - Contains the top navigation bar
// - Uses <Routes> and <Route> to display different pages based on the URL
const AppContent = () => {
  return (
    <div>
      {/* A simple top bar that will always be visible */}
      <div>
        Hi this is a top bar
        <div
          style={{
            padding: "10px",
            display: "flex",
            gap: "10px", // Creates spacing between buttons
          }}
        >
          {/* 
            Using <Link> instead of navigate():
            - <Link> creates clickable navigation links
            - "to" specifies the path to navigate
            - Advantage: It automatically updates the URL and switches routes without reloading
          */}
          <Link to="/">
            <button>Landing</button>
          </Link>

          <Link to="/dashboard">
            <button>Dashboard</button>
          </Link>
        </div>
      </div>

      {/* Routes section:
          - Defines which component to render based on the current URL
          - Only one matching <Route> will render at a time
      */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App2;
