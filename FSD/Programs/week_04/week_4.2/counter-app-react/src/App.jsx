import { useState } from 'react';
import './App.css';
// Importing useState hook from React
// Importing CSS file for styling

function App() {
    // ------------------------------
    // State Management in React
    // ------------------------------

    // Any variable that React needs to watch for UI updates must be a "state variable".
    // Here, 'count' is our state variable.
    // 'setCount' is the function provided by React to update 'count'.
    // useState(0) initializes 'count' with the value 0.
    // Whenever 'setCount' is called, React re-renders the component with the new state value.

    const [count, setCount] = useState(0);

    // ------------------------------
    // JSX Return Block
    // ------------------------------

    // A .jsx file is a mix of JavaScript and HTML-like syntax (JSX).
    // Inside return(), we describe the UI React should render.
    // Whenever state changes, React automatically re-renders this UI.

    return (
        <div>
            {/* Heading of the application */}
            <h1>Counter App</h1>

            {/* Display the current count value */}
            {/* The curly braces {count} allow embedding JS expressions inside JSX */}
            <p>Count: {count}</p>

            {/* Button that increments count when clicked */}
            {/* Instead of manual DOM manipulation, we just update state using setCount */}
            <button
                onClick={() => {
                    // Updating state: React will automatically re-render <p> with new count
                    setCount(count => count + 1);
                }}
            >
                Click
            </button>
        </div>
    );
}

export default App;
// Exporting App component so it can be used in index.js (entry point)
