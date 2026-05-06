import React, { useEffect, useState } from "react";

const App2 = () => {
  const [render, setRender] = useState(true);

  useEffect(() => {
    setInterval(() => {
      setRender((r) => !r);
    }, 3000);
  }, []);

  return (
    <div>
      {render ? <LifeCycleFunctionalComponent /> : <div>Not rendering</div>}
    </div>
  );
};

function LifeCycleFunctionalComponent() {
  useEffect(() => {
    // Perform setup or data fetching here
    console.log("component mounted");
    return () => {
      // Cleanup code (similar to componentWillUnmount)
      console.log("component unmounted");
    };
  }, []);

  // Render UI
  return <div>LifeCycleFunctionalComponent</div>;
}

class LifeCycleClassComponent extends React.Component {
  componentDidMount() {
    // Perform setup or data fetching here
    console.log("component mounted");
  }

  componentWillUnmount() {
    // Clean up (e.g., remove event listeners or cancel subscriptions)
    console.log("component unmounted");
  }

  render() {
    // Render UI
    return <div>LifeCycleClassComponent</div>;
  }
}

export default App2;
