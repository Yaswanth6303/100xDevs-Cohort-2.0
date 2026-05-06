// Visit 02-nextjs-server for Next.js Server Side Rendering.

// -------------------------------------------------------
// ✅ Importing React Hooks and Other Dependencies
// -------------------------------------------------------
//
// In this example, we are building a **Client Component** in React.
// A Client Component runs entirely in the browser after the page loads.
//
// React provides certain hooks that are used to handle data fetching,
// component lifecycle events, and UI re-rendering dynamically on the client side.
//
// `useEffect` — runs side effects (like fetching data, logging, timers, etc.) after render.
// `useState` — allows us to store and update component state (data that changes over time).
//
import { useEffect, useState } from "react";

// Importing a Spinner component (usually a loading animation)
// which will be displayed while the data is being fetched from the backend.
import { Spinner } from "./Spinner";

// Importing Axios, an HTTP client library for making API calls (GET, POST, etc.).
// It automatically parses JSON responses and simplifies async requests.
import axios from "axios";

// -------------------------------------------------------
// ✅ Type Definition for Data
// -------------------------------------------------------
//
// Here we define the structure of the data expected from the backend.
// TypeScript uses this type to ensure that we handle the data safely and correctly.
//
// For example, if we try to access a property that doesn’t exist in this type,
// TypeScript will show an error.
type Data = {
  name: string; // The user’s full name
  email: string; // The user’s email address
  address: {
    // Nested object for address details
    city: string; // City name
    state: string; // State name
    houseNumber: string; // House number or apartment number
  };
};

// -------------------------------------------------------
// ✅ Core Concept: CSR (Client Side Rendering) vs SSR (Server Side Rendering)
// -------------------------------------------------------
//
// 🧠 In **React (default)** — everything runs in the browser.
// - The browser downloads the JS bundle, executes it,
//   and then the component fetches data directly from the backend.
// - This is known as **Client-Side Rendering (CSR)**.
//
// 🧠 In **Next.js** — we use **Server-Side Rendering (SSR)** by default.
// - The browser sends a request to the Next.js server.
// - The Next.js server fetches the data from the backend.
// - The Next.js server then builds complete HTML and sends it to the browser.
// - The browser displays the pre-rendered HTML immediately.
//
// 🔥 Advantages of SSR in Next.js:
// 1. **No waterfalling** — data and HTML are fetched/rendered together on the server,
//    avoiding slow client-side data fetching after render.
// 2. **SEO Optimization** — search engines get a fully rendered HTML page instantly,
//    making your pages rank better on Google and other search engines.
//
// ❌ Drawbacks of CSR in Next.js:
// 1. **Waterfall Effect:** The browser must first load the JS, then run it,
//    then call the API, then render — which increases load time.
// 2. **Poor SEO:** Search engines might not see the data since it’s fetched after page load.
//
// ✅ Summary:
// React = CSR (Browser fetches directly)
// Next.js = SSR (Next.js server fetches first, then sends HTML + data)
//
// -------------------------------------------------------
// ✅ Component: UserCard (Client-Side Version)
// -------------------------------------------------------
//
// This is a React **Client Component** that runs in the browser.
// It will fetch the data from the backend **after** the component mounts (using useEffect).
//
const UserCard = () => {
  // -------------------------------------------------------
  // State variables using React Hooks
  // -------------------------------------------------------

  // `data` will hold the user information fetched from the backend API.
  // It starts as null because no data is available when the component first renders.
  const [data, setData] = useState<Data | null>(null);

  // `loading` is a boolean that tracks whether the API call is still in progress.
  // Initially, it’s false, and we set it to true while fetching.
  const [loading, setLoading] = useState(false);

  // -------------------------------------------------------
  // Function: fetchData
  // -------------------------------------------------------
  //
  // This is an asynchronous function that makes an API call to fetch user data
  // from the backend server running on http://localhost:5050.
  //
  // The fetched data is then stored in the component’s state (`data`),
  // and the loading indicator is turned off.
  const fetchData = async () => {
    // Before starting the request, set loading = true to show the spinner.
    setLoading(true);

    // Make a GET request to the backend using axios.
    // The <Data> generic ensures that the response data matches our Data type.
    const response = await axios.get<Data>("http://localhost:5050");

    // Store the response data in our state.
    setData(response.data);

    // Turn off the loading indicator.
    setLoading(false);
  };

  // -------------------------------------------------------
  // useEffect Hook — runs once after the first render
  // -------------------------------------------------------
  //
  // In React, `useEffect` is used for running side effects — actions that happen
  // outside of rendering (like API calls, subscriptions, or timers).
  //
  // Here, we use it to call `fetchData()` only once when the component mounts.
  //
  // The empty dependency array `[]` means it runs only once.
  useEffect(() => {
    fetchData();
  }, []);

  // -------------------------------------------------------
  // Conditional Rendering for Loading State
  // -------------------------------------------------------
  //
  // If the data is still being fetched (`loading === true`),
  // we display the Spinner component to let the user know that
  // content is loading.
  //
  if (loading) {
    return <Spinner />;
  }

  // -------------------------------------------------------
  // Rendering the User Details
  // -------------------------------------------------------
  //
  // Once data is fetched and loading is false,
  // we display the user’s name and email in a styled card layout.
  //
  // Tailwind CSS classes are used for styling:
  // - `flex` and `justify-center` for layout alignment.
  // - `h-screen` for full viewport height.
  // - `border`, `p-8`, and `rounded` for visual card design.
  return (
    <div className="flex flex-col justify-center h-screen">
      <div className="flex justify-center">
        <div className="border p-8 rounded">
          <div>
            <b>Name:</b> {data?.name}
          </div>
          <div>
            <b>Email:</b> {data?.email}
          </div>
        </div>
      </div>
    </div>
  );
};

// Exporting the component so that it can be imported and used
// inside other components or pages (like pages/user.tsx or app/user/page.tsx).
export default UserCard;

// -------------------------------------------------------
// ✅ Complete Summary
// -------------------------------------------------------
//
// ▶ React CSR Flow:
//   1. Browser requests the React app.
//   2. React renders an empty component (no data yet).
//   3. useEffect() runs, fetchData() is called.
//   4. Backend (localhost:5050) sends the user data.
//   5. State updates (setData), and React re-renders with the data.
//
// ▶ Next.js SSR Flow (for comparison):
//   1. Browser requests the Next.js page.
//   2. Next.js server fetches data (on the server).
//   3. HTML + data are combined on the server and sent to the browser.
//   4. Browser instantly shows full page with data.
//
// -------------------------------------------------------
// ✅ Key Takeaways
// -------------------------------------------------------
// - CSR = Data fetched by browser after page load.
// - SSR = Data fetched by Next.js server before sending HTML.
// - CSR disadvantages: slower first load, not SEO-friendly.
// - SSR advantages: faster initial paint, SEO optimized.
// - useState/useEffect = client side only (not allowed in server components).
// - axios = simplifies data fetching.
// - Spinner = improves user experience while loading.
// -------------------------------------------------------
