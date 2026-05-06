import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";

function App() {
  /**
   * If I want to keep something like a Topbar constant across all routes
   * (e.g., shown on both Landing and Dashboard), I can place it above <Routes />.
   * That way, it does not get re-rendered when the route changes.
   */

  /**
   * In the browser's console:
   * - Typing `location` shows details about the current page/location object.
   * - Typing `location.href` shows the current route (URL).
   *
   * Example:
   *   If I am on the Landing page ("/"), `location.href` will display "http://localhost:5173/"
   *
   * If I want to navigate to Dashboard using the console:
   * `location.href = "/dashboard"`
   * This will force the browser to navigate to that page.
   */

  /**
   * The above navigation (`window.location.href = "/something"`) works, but it is **not correct**
   * for Single Page Applications (SPA) built with React.
   *
   * Why?
   * - It reloads the entire page (browser reload).
   * - It fetches HTML from the backend again.
   * - This is "server-side navigation", not "client-side navigation".
   *
   * In React, we want **client-side routing**:
   * - No browser reloads.
   * - The React bundle stays loaded in memory.
   * - Only the page content (component) changes when navigating between routes.
   *
   * To achieve proper client-side routing, we should use
   * `useNavigate` hook (or `<Link />` from react-router-dom).
   *  That way, the browser doesn’t reload, and navigation feels instant.
   *
   * The improved version (without reload) is shown in `App1.jsx`
   */

  return (
    <>
      <BrowserRouter>
        {/* Topbar placed outside <Routes> so it is always visible */}
        <div>
          <div
            style={{
              padding: "5px",
            }}
          >
            This is the top bar
          </div>

          {/* Current buttons use window.location.href
              This will cause browser reload (server-side navigation) */}
          <button
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Landing
          </button>
          <button
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            Dashboard
          </button>
        </div>

        {/* Client-side routing setup using <Routes> and <Route> */}
        <Routes>
          {/* If path = "/" → render Landing component */}
          <Route path="/" element={<Landing />} />

          {/* If path = "/dashboard" → render Dashboard component */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
