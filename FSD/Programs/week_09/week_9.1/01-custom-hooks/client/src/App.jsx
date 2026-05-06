import React, { useState } from "react";

const App = () => {
  return (
    <div>
      {/* <MyFunctionalComponent /> */}
      <MyClassComponent />
    </div>
  );
};

function MyFunctionalComponent() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count => count + 1);
  };

  return (
    <div>
      <p>{count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}

class MyClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  incrementCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.incrementCount}>Increment</button>
      </div>
    );
  }
}

export default App;
