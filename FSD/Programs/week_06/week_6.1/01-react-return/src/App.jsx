import { useState } from 'react';
import './App.css';

function App() {
    // React's useState hook is used to create a state variable `title`
    // Initially, it holds the string "My name is Rahul"
    // setTitle is the updater function to change this value
    const [title, setTitle] = useState('My name is Rahul');

    // Function that updates the state `title`
    // Whenever this function runs, React re-renders the App component
    function updateTitle() {
        // Here we append a random number so that each click gives a new title
        setTitle('My name is ' + Math.random());
    }

    return (
        <div>
            {/* 
              This <div> wrapper is not strictly required.
              In React, instead of always using an extra <div>, 
              we can use React Fragments:
              
              - Short syntax: <></>
              - Long syntax: <React.Fragment></React.Fragment>
              
              Fragments allow grouping multiple elements without adding extra nodes 
              to the DOM. 
              
              BUT note: we cannot put raw text directly inside <></>, 
              otherwise React will throw an error.
            */}

            {/* Button that updates the state when clicked */}
            <button onClick={updateTitle}>Click me to change the title</button>

            {/*
              IMPORTANT REACT BEHAVIOR:
              
              When the state (here, `title`) changes, 
              React re-renders the *entire parent component* (`App`).
              
              That means all child components inside `App` 
              (all <Header /> components here) will also re-render.
              
              But in this case:
              - We only want the **first Header** (the one using dynamic `title`) to re-render.
              - The other three headers always display the same string 
                ("My name is Yaswanth"), so they don’t need to re-render unnecessarily.
              
              This shows a key React concept:
              > "When a parent re-renders, by default, all of its children re-render too."
              
              Optimization (like using React.memo) is required if we want 
              only certain children to re-render while skipping others.
              
              For example: See `App1` (as you mentioned in your note) 
              where optimization might be applied.
            */}

            {/* First Header: takes the `title` state, so it changes when state updates */}
            <Header title={title}></Header>

            {/* These three Headers always render the same static text.
                They don’t depend on state, but they still re-render when App re-renders */}
            <Header title="My name is Yaswanth"></Header>
            <Header title="My name is Yaswanth"></Header>
            <Header title="My name is Yaswanth"></Header>
        </div>
    );
}

// Header component: simple functional component that receives `title` as a prop
// Displays the title inside a <div>
function Header({ title }) {
    console.log('Header is rendering');
    return <div>{title}</div>;
}

export default App;
