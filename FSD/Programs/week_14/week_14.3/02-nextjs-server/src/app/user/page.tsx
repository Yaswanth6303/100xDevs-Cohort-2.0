// Here we are not using Next.js API route. Visit 03-nextjs-api-route for Next.js API Routes.

// -------------------------------------------------------
// Importing the Server Component
// -------------------------------------------------------
//
// The `UserCard` component is imported from "@/components/UserCard".
// The `@` symbol is an alias (shortcut) for the `src` directory in Next.js.
// This alias is configured automatically in Next.js projects using the App Router,
// so "@/components/UserCard" actually means "src/components/UserCard.tsx".
//
// The imported `UserCard` is a **Server Component** because it is declared as `async`
// in its original file. That means it runs only on the server and can fetch data
// directly before rendering.
//
import { UserCard } from "@/components/UserCard";

// -------------------------------------------------------
// Explanation: What is This File?
// -------------------------------------------------------
//
// This file defines a **Next.js page** — that is, a component that represents
// a full route in the application (for example, `/user`).
//
// - Files like this are placed inside the `app/` directory (e.g., `app/user/page.tsx`).
// - Every file named `page.tsx` or `page.jsx` becomes an accessible route automatically.
// - Next.js will render this file whenever a user visits that route.
//
// -------------------------------------------------------
// Server Rendering Concept
// -------------------------------------------------------
//
// In this example, we are using a server component (`UserCard`) inside another component (`UserPage`).
// Since `UserPage` does not have `"use client"` at the top, it is also treated as a **server component**.
//
// That means:
// 1. The entire page is rendered on the **server**.
// 2. The `UserCard` fetches data from the backend (e.g., http://localhost:5050).
// 3. The server waits for that data to load.
// 4. Once data is ready, the server generates complete HTML containing the user details.
// 5. The generated HTML is sent to the browser.
// 6. The browser displays the pre-rendered HTML immediately (no need for client-side fetching).
//
// Benefit:
// - Faster load times.
// - Better SEO (search engines can see full content).
// - Secure: no API keys or internal logic are exposed to the browser.
//
// -------------------------------------------------------
// Component: UserPage
// -------------------------------------------------------
//
// This is the main page component for rendering the user profile page.
// Since there’s no `"use client"`, this is a **server component** by default.
//
export default function UserPage() {
  return (
    // A simple wrapper div to contain the page content.
    // You can add more styling here (like padding or background color).
    <div>
      {/* 
        Rendering the <UserCard /> component.

        Even though <UserCard /> is an async server component that fetches data,
        you can use it directly here without calling await.

        Why? Because in React 18 + Next.js App Router, 
        server components are automatically awaited when nested like this.
        Next.js will handle rendering order internally.

        So the sequence will be:
          1. Next.js calls <UserCard />.
          2. <UserCard /> fetches user data from the backend.
          3. <UserCard /> returns JSX with the fetched data.
          4. Next.js merges it into the final HTML of this page.
      */}
      <UserCard />
    </div>
  );
}

// -------------------------------------------------------
// Summary of What Happens When a User Visits This Page
// -------------------------------------------------------
//
// 1. The browser sends a request to the Next.js server (e.g., GET /user).
// 2. Next.js identifies this file as the route handler for `/user`.
// 3. The server executes this component (`UserPage()`).
// 4. Inside it, `<UserCard />` is rendered. That component fetches data from the backend API.
// 5. Once the data is received, Next.js renders full HTML with:
//      - The user's name
//      - The user's email
//      - The layout defined in UserCard
// 6. The completed HTML is sent to the client.
// 7. The browser displays the page instantly, without running JavaScript yet.
// 8. (Optional) If you later add interactivity (e.g., buttons), Next.js will "hydrate"
//    those parts on the client.
//
// -------------------------------------------------------
// Key Concepts Recap
// -------------------------------------------------------
// - **Server Components**: Rendered on the server, can be async, perfect for data fetching.
// - **Client Components**: Declared with `"use client"`, used for interactivity, cannot be async.
// - **Automatic Composition**: You can use server components inside server components easily.
// - **App Router Magic**: Next.js automatically handles awaiting async components and data loading.
// - **Security & SEO**: Server rendering hides backend details and provides HTML to crawlers directly.
// -------------------------------------------------------
