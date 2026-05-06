// Importing the CSS file which includes Tailwind styles
import "./App.css";

// React Functional Component: App1
// Demonstrates Tailwind CSS Grid layout
function App1() {
  return (
    <>
      {/*
        ------------------------
        1. BASIC GRID (3 equal columns)
        ------------------------
        - `grid` → makes the container a CSS Grid.
        - `grid-cols-3` → divides the container into 3 equal columns.
          By default, the grid takes 100% width of the parent container.
          So here: each column = 100% ÷ 3 = ~33.33% wide.
        - Each child <div> occupies one column (auto placement).
        - `bg-red-500`, `bg-green-500`, `bg-pink-500` → Tailwind background colors.
      */}
      <div className="grid grid-cols-3">
        <div className="bg-red-500">Hi, Hello my name is Yaswanth</div>
        <div className="bg-green-500">Hi, Hello my name is Yaswanth</div>
        <div className="bg-pink-500">Hi, Hello my name is Yaswanth</div>
      </div>

      {/*
        ------------------------
        2. GRID WITH CUSTOM COLUMN SPANS
        ------------------------
        - `grid-cols-10` → divides the container into 10 equal-width columns.
          Each column = 100% ÷ 10 = 10% of the total width.
        
        Now we use `col-span-*` to control how many columns each child should span:
        
        - First div: `col-span-4` → spans 4 columns = 40% width.
        - Second div: `col-span-4` → spans 4 columns = 40% width.
        - Third div: `col-span-2` → spans 2 columns = 20% width.
        
        Together: 40% + 40% + 20% = 100% of the row is filled.
        This is how you can create non-equal grid layouts.
      */}
      <div className="grid grid-cols-10">
        <div className="bg-red-500 col-span-4">
          Hi, Hello my name is Yaswanth
        </div>
        <div className="bg-green-500 col-span-4">
          Hi, Hello my name is Yaswanth
        </div>
        <div className="bg-pink-500 col-span-2">
          Hi, Hello my name is Yaswanth
        </div>
      </div>
    </>
  );
}

// Exporting App1 so it can be imported into index.jsx or another parent component
export default App1;

/* 
  ------------------------
  3. TAILWIND GRID CONCEPTS
  ------------------------
  - `grid`: enables CSS Grid layout on the container.
  - `grid-cols-n`: creates N equal columns (e.g., grid-cols-3 → 3 equal columns).
  - `col-span-n`: allows a child element to span across N columns.
  - Responsive behavior: you can change the number of columns or spans
    at different breakpoints using prefixes like `sm:`, `md:`, `lg:`.
    Example: `sm:grid-cols-2 md:grid-cols-4` adjusts layout at different screen sizes.
    
  ------------------------
  4. FLEX vs GRID
  ------------------------
  - Flexbox is best for **1D layouts** (row or column, like navigation bars, aligning items).
  - Grid is best for **2D layouts** (rows AND columns, like dashboards, galleries).
*/
