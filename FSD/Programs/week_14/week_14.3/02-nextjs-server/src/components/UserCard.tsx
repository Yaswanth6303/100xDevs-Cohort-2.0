// -------------------------------------------------------
// Important Concept: Client vs Server Components in Next.js
// -------------------------------------------------------
// In Next.js (version 13 and later with the App Router), components can run
// either on the **server** or on the **client**.
//
// - **Server components**:
//   Run only on the server. They can perform async operations like fetching data
//   directly using 'await', and they don’t include client-side JavaScript unless needed.
//   They are great for performance because data fetching happens before the HTML is sent
//   to the browser.
//
// - **Client components**:
//   Run inside the browser after the HTML has been delivered. They can use hooks like
//   useState, useEffect, etc. They CANNOT be declared as `async` components because
//   React does not allow asynchronous rendering on the client side directly.
//
// In this file, we are creating a **server component** that fetches user data
// using an async function and renders it to the screen.
//
// -------------------------------------------------------
// Importing dependencies
// -------------------------------------------------------

// 'axios' is a popular HTTP client library for making network requests (like fetch).
// It simplifies working with APIs by handling promises and JSON parsing automatically.
import axios from "axios";

// -------------------------------------------------------
// Type Definition: Data
// -------------------------------------------------------
// TypeScript interface (or type alias) used to define the expected structure
// of the response data from the API.
//
// This ensures type safety — i.e., TypeScript can tell us if we try to access
// a property that doesn’t exist in the data object.
type Data = {
  name: string; // The user's name (string)
  email: string; // The user's email address (string)
  address: {
    // The user's address (nested object)
    city: string; // City name
    state: string; // State name
    houseNumber: string; // House or apartment number
  };
};

// -------------------------------------------------------
// Function: fetchData
// -------------------------------------------------------
// This is an **asynchronous function** that performs the data fetching.
// In Next.js server components, we can define such functions easily since
// async/await works naturally on the server side.
//
// It makes an HTTP GET request to a backend API running locally at 'http://localhost:5050'.
// We are assuming that this endpoint returns user data in the structure defined by `Data`.
//
// The function returns the parsed response data.
const fetchData = async () => {
  // Make an HTTP GET request using axios.
  // The <Data> here tells TypeScript that the response data will conform
  // to the 'Data' type defined above.

  // This is for testing the loading state.
  // Uncomment this to test the loading state.
  // await new Promise((resolve) => setTimeout(resolve, 5000));

  const response = await axios.get<Data>("http://localhost:5050");

  // Extract and return only the data portion from the response object.
  // Axios automatically parses JSON responses.
  return response.data;
};

// -------------------------------------------------------
// Component: UserCard
// -------------------------------------------------------
// This is a **React Server Component** because it is declared as `async`.
// In server components, Next.js allows using `await` directly inside the component.
// This means we can fetch data directly inside this function before rendering.
//
// Note: We DO NOT use useState or useEffect here because those are client-side hooks,
// and this is a server component.
export const UserCard = async () => {
  // Step 1: Fetch data from the backend API using our async function.
  // This happens on the **server**, not in the browser.
  // The page will wait for this data to load before sending HTML to the client.
  const data = await fetchData();

  // Step 2: Render the data
  // Once data is successfully fetched, render it using JSX.
  // Tailwind CSS utility classes are used for styling.
  // - 'flex' creates a flex container.
  // - 'flex-col' arranges children vertically.
  // - 'justify-center' centers the content vertically.
  // - 'h-screen' makes the container take full viewport height.
  //
  // Inside, there is a centered card showing the user's name and email.
  return (
    <div className="flex flex-col justify-center h-screen">
      {/* Inner flex to horizontally center the card */}
      <div className="flex justify-center">
        {/* A simple bordered card with padding and rounded corners */}
        <div className="border p-8 rounded">
          {/* Displaying user details */}
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

// -------------------------------------------------------
// Summary of How This Works
// -------------------------------------------------------
//
// 1. Next.js identifies this as a **server component** because it is asynchronous (`async`).
//
// 2. When a user requests the page containing this component:
//    - The server executes this component’s function.
//    - It runs `fetchData()` to retrieve data from 'http://localhost:5050'.
//    - Once the data arrives, the server renders the full HTML markup
//      (with the name and email already filled in).
//
// 3. The rendered HTML (already containing the data) is sent to the client’s browser.
//    This means the user sees the final page immediately — there’s no client-side fetching delay.
//
// 4. Because the data fetching and rendering happen entirely on the server,
//    this approach improves performance, SEO, and avoids exposing API keys to the client.
//
// -------------------------------------------------------
// Key Takeaways
// -------------------------------------------------------
// - Server components can be async and fetch data directly.
// - No need for `useEffect` or `useState`.
// - Data fetching happens before rendering, ensuring faster perceived performance.
// - The returned JSX becomes HTML before being sent to the browser.
// - Axios simplifies making HTTP requests.
// - Tailwind CSS makes styling quick and responsive.
// -------------------------------------------------------
