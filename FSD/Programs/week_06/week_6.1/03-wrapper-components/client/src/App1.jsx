function App1() {
  return (
    <div>
      {/*
        Using the `children` prop in React:
        ---------------------------------------
        - In React, anything placed between the opening and closing tags
        of a component automatically becomes that component’s `children`.
        - Example:
        <CardWrapper>Hi There</CardWrapper>
        - Here, the string "Hi There" becomes the `children` of CardWrapper.
        - We can also pass JSX/other components as children.
        */}

      {/* Passing plain text as children */}
      <CardWrapper>Hi There</CardWrapper>

      {/* Passing another component as children */}
      <CardWrapper>
        <TextComponent />
      </CardWrapper>
    </div>
  );
}

// CardWrapper component
// Instead of a custom prop like "innerComponent",
// it directly uses the special `children` prop.
function CardWrapper({ children }) {
  return (
    <div
      style={{
        border: "2px solid black", // border around the card
        padding: 10,
        margin: 10,
      }}
    >
      {/* Render whatever is passed between <CardWrapper> ... </CardWrapper> */}
      <h1>{children}</h1>
    </div>
  );
}

// Simple component to demonstrate children rendering
function TextComponent() {
  return <div>My name is Yaswanth</div>;
}

export default App1;
