import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

/**
 * App1 is the root component.
 * - We wrap everything inside <BrowserRouter>.
 * - This tells React Router that we are building a Single Page Application (SPA)
 *   and we want client-side navigation (no full page reloads).
 */
const App1 = () => {
  return (
    <BrowserRouter>
      {/* We keep AppContent inside BrowserRouter
          because it will use the `useNavigate` hook.
          If AppContent was outside, useNavigate would throw an error. */}
      <AppContent />
    </BrowserRouter>
  );
};

/**
 * Important rule about useNavigate:
 * - Whenever we use the `useNavigate` hook, it MUST be inside a <BrowserRouter>.
 * - Reason: <BrowserRouter> provides the "routing context".
 *   Without this context, useNavigate doesn’t know:
 *     - who is the parent router (father)
 *     - who is the child routes (son)
 * - If we try to use it outside, React will throw an error like:
 *   "useNavigate() may be used only in the context of a Router".
 */
const AppContent = () => {
  // useNavigate hook gives us the `navigate` function.
  // With this, we can move to different routes without page reload.
  const navigate = useNavigate();

  return (
    <div>
      {/* This is a constant Topbar that stays on all pages
          because we placed it outside <Routes>. */}
      <div>
        Hi this is a top bar
        <div
          style={{
            padding: "10px",
            display: "flex",
            gap: "10px",
          }}
        >
          {/* Correct client-side navigation:
              - When clicked, it changes the route to "/"
              - No browser reload happens
              - React swaps the component internally */}
          <button onClick={() => navigate("/")}>Landing</button>

          {/* Same here: navigates to "/dashboard" without reloading the browser */}
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        </div>
      </div>

      {/* <Routes> defines which component to render based on the current URL */}
      <Routes>
        {/* If path = "/" → render Landing component */}
        <Route path="/" element={<Landing />} />

        {/* If path = "/dashboard" → render Dashboard component */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
};

export default App1;
