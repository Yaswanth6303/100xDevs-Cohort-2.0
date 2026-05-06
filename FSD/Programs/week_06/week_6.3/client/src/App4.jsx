import { useEffect, useState } from "react";
import axios from "axios";

function App4() {
  const [exchange1Data, setExchange1Data] = useState({});
  const [exchange2Data, setExchange2Data] = useState({});
  const [bankData, setBankData] = useState({});

  // Fetch data from WazirX once on mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/crypto-returns-wazirx")
      .then((res) => {
        setExchange1Data(res.data);
      });
  }, []);

  // Fetch data from Binance once on mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/crypto-returns-binance")
      .then((res) => {
        setExchange2Data(res.data);
      });
  }, []);

  // Fetch bank income after 3 seconds delay
  useEffect(() => {
    setTimeout(() => {
      axios.get("http://localhost:3000/api/v1/bank-income").then((res) => {
        setBankData(res.data);
      });
    }, 3000);
  }, []);

  // Function to calculate combined returns from both exchanges
  const cryptoReturns = () => {
    return (exchange1Data?.returns || 0) + (exchange2Data?.returns || 0);
  };

  return (
    <div>
      {/* Passing cryptoReturns function directly to child.
        Since functions in React are recreated on every render,
        ChildComponent will always re-render even if the result hasn't changed. */}
      <ChildComponent cryptoReturns={cryptoReturns} />
      <DummyComponent />
    </div>
  );
}

function DummyComponent() {
  // This component will re-render whenever the parent (App4) re-renders
  console.log("DummyComponent rerendered");
}

function ChildComponent({ cryptoReturns }) {
  // This component also re-renders on every App4 render
  // because the function reference changes each time
  console.log("ChildComponent rerendered");
  return <div>Crypto Returns: {cryptoReturns()}</div>;
}

export default App4;
