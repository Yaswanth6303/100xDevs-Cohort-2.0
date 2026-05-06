import "./App.css";

function App() {
  return (
    <div>
      {/*
        Passing a React component as a prop:
        ---------------------------------------
        - Normally, when we pass data as props, it looks like:
            <CardWrapper innerComponent={"Hello"} />
        - But here, instead of passing a string or number, 
          we are passing an entire React component as a prop.
        - For example:
          <CardWrapper innerComponent={<TextComponent />} />
        - This means `innerComponent` inside CardWrapper 
          will receive a JSX element (<TextComponent />).
        */}
      <CardWrapper innerComponent={<TextComponent />} />
      <CardWrapper innerComponent={<TextComponent1 />} />
    </div>
  );
}

// CardWrapper takes a React component (via prop `innerComponent`) and renders it
function CardWrapper({ innerComponent }) {
  return (
    <div
      style={{
        border: "2px solid black", // simple border styling
        padding: 10,
        margin: 10,
      }}
    >
      {/* Whatever component is passed as `innerComponent` will be rendered here */}
      {innerComponent}
    </div>
  );
}

// Simple child component
function TextComponent() {
  return <div>Hello</div>;
}

// Another simple child component
function TextComponent1() {
  return <div>My name is Yaswanth</div>;
}

export default App;
