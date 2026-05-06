import React from "react";
import "./App.css"; // Importing Tailwind + custom styles (if any).

// React Functional Component: App2
// Demonstrates Tailwind CSS responsive breakpoints and grid system
function App2() {
  return (
    <>
      {/*
        ------------------------
        1. RESPONSIVE BACKGROUND COLORS
        ------------------------
        - `bg-red-500` → sets background to red by default (mobile-first approach).
        - `md:bg-blue-500` → overrides background color to blue 
          when the screen width is at least "md" (768px and above).

        Tailwind’s default breakpoints (mobile-first):
          sm → 640px
          md → 768px
          lg → 1024px
          xl → 1280px
          2xl → 1536px

        Meaning:
          - On small screens (< 768px): background = red.
          - On medium screens (≥ 768px): background = blue.
      */}
      <div className="bg-red-500 md:bg-blue-500">Hi there</div>

      {/*
        ------------------------
        2. RESPONSIVE GRID LAYOUT
        ------------------------
        - `grid` → enables CSS Grid.
        - `grid-cols-1` → 1 column layout by default (mobile screens).
        - `md:grid-cols-2` → starting at medium screens (≥ 768px), 
          the grid switches to 2 columns.
        - `lg:grid-cols-3` → starting at large screens (≥ 1024px),
          the grid switches to 3 columns.

        Layout behavior:
          - Mobile (<768px): All 3 items stack vertically in 1 column.
          - Tablet (≥768px and <1024px): Items arranged in 2 columns.
          - Desktop (≥1024px): Items arranged in 3 columns.

        - Each child <div> has its own background color to visualize the layout clearly.
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-red-500">Hi, Hello my name is Yaswanth</div>
        <div className="bg-green-500">Hi, Hello my name is Yaswanth</div>
        <div className="bg-pink-500">Hi, Hello my name is Yaswanth</div>
      </div>
    </>
  );
}

// Exporting App2 so it can be imported and rendered inside index.jsx (entry point).
export default App2;

/* 
  ------------------------
  3. KEY TAKEAWAYS
  ------------------------
  - Tailwind is mobile-first: styles apply to small screens first, 
    then you add breakpoint overrides.
  - You can chain multiple breakpoints to progressively enhance layouts.
    Example: grid-cols-1 (mobile), md:grid-cols-2 (tablet), lg:grid-cols-3 (desktop).
  - Responsive utilities apply "at and above" the given breakpoint.
    (md: applies to md, lg, xl, 2xl… unless overridden again).

  ------------------------
  4. ANALOGY
  ------------------------
  - Think of Tailwind breakpoints like "rules that upgrade at certain screen widths".
    Example:
      - Start with the simplest design (mobile).
      - Add more complexity as the screen gets larger (tablet, desktop).
*/
