import React, { useEffect, useState } from "react";

const App1 = () => {
  const [render, setRender] = useState(true);

  // Here this useEffect will run only once when the component mounts
  useEffect(() => {
    setTimeout(() => {
      setRender(false);
    }, 10000);
  }, []);

  return (
    <div>
      {render ? <LifeCycleFunctionalComponent /> : <div>Not rendering</div>}
    </div>
  );
};

// Suppose I have a dependency array. Whenever there is a change in the dependency array, the useEffect hook will run again.
// The cleanup function (returned from the previous useEffect) will be executed to clear or unmount the old effect,
// and then a new useEffect will be mounted because of the dependency change.
// When there is no dependency array, the useEffect hook will run only once and when it unmounts, only the cleanup function will be executed.
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

export default App1;
