/* 
----------- INTRODUCTION -----------
To optimize the delivery of our website, instead of sending all pages' HTML code to the user upfront,
we are implementing an incremental loading approach. 

- Most users usually visit the landing page first, so there is no need to load all other pages initially.  
- We will only load the required page content dynamically when the user navigates to that page.  
- This keeps our app faster, more efficient, and cleaner, because we are delivering only what the user needs.  

----------- IMPLEMENTATION STRATEGY -----------
We achieve this using React Router + React.lazy + Suspense:  
1. React.lazy helps us split the code and load components only when needed.  
2. Suspense provides a fallback UI ("loading...") until the lazy-loaded component is fetched.  
3. React Router allows navigation between pages while maintaining lazy loading.  
*/

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";

// ----------- LAZY LOADING COMPONENTS -----------
// Instead of importing Landing and Dashboard directly at the top (which loads them immediately),
// we use React.lazy to import them only when required (when the user navigates to them).
// This is called "Code Splitting".
const Landing = lazy(() => import("./pages/Landing"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

// ----------- MAIN APPLICATION COMPONENT -----------
function App3() {
  return (
    <div>
      {/* 
        ----------- BROWSER ROUTER -----------
        BrowserRouter enables client-side routing in our React application.
        It listens to the browser's URL and renders the corresponding component
        without refreshing the entire page. This makes navigation faster and seamless.
        */}
      <BrowserRouter>
        {/* 
        ----------- TOP BAR COMPONENT -----------
        This is a fixed navigation bar that remains visible on every page.
        It contains buttons for navigating between Landing and Dashboard pages.
        */}
        <TopBar />

        {/* 
        ----------- ROUTE CONFIGURATION -----------
        Routes define which component should be rendered for a given path (URL).
        */}
        <Routes>
          {/* 
            ----------- LANDING ROUTE -----------
            - Path: "/"
            - Component: Landing (lazy loaded)
            - Wrapped inside <Suspense>: shows "loading..." while the Landing page is being fetched.
            */}
          <Route
            path="/"
            element={
              <Suspense fallback={"loading..."}>
                <Landing />
              </Suspense>
            }
          ></Route>

          {/* 
            ----------- DASHBOARD ROUTE -----------
            - Path: "/dashboard"
            - Component: Dashboard (lazy loaded)
            - Suspense ensures that if Dashboard is not yet downloaded, a fallback ("loading...") appears.
        */}
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={"loading..."}>
                <Dashboard />
              </Suspense>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// ----------- TOP BAR COMPONENT -----------
// This component creates a simple navigation bar with two buttons (Landing & Dashboard).
// It uses the "useNavigate" hook from react-router-dom to programmatically navigate
// to different routes when a button is clicked.
function TopBar() {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div>
      <div style={{ marginBottom: "2px" }}>Hi this is a top bar</div>

      {/* Clicking these buttons changes the URL and triggers lazy loading of the required page */}
      <button onClick={() => navigate("/")}>Landing</button>
      <button onClick={() => navigate("/dashboard")}>Dashboard</button>
    </div>
  );
}

export default App3;
