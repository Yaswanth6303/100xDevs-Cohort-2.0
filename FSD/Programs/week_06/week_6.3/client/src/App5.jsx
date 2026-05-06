import { memo, useEffect, useState } from "react";
import axios from "axios";

function App5() {
  const [exchange1Data, setExchange1Data] = useState({});
  const [exchange2Data, setExchange2Data] = useState({});
  const [bankData, setBankData] = useState({});

  // Fetch WazirX data once
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/crypto-returns-wazirx")
      .then((res) => {
        setExchange1Data(res.data);
      });
  }, []);

  // Fetch Binance data once
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/crypto-returns-binance")
      .then((res) => {
        setExchange2Data(res.data);
      });
  }, []);

  // Fetch bank income after 3 seconds
  useEffect(() => {
    setTimeout(() => {
      axios.get("http://localhost:3000/api/v1/bank-income").then((res) => {
        setBankData(res.data);
      });
    }, 3000);
  }, []);

  // Function to calculate combined returns
  const cryptoReturns = () => {
    return (exchange1Data?.returns || 0) + (exchange2Data?.returns || 0);
  };

  return (
    <div>
      {/* ChildComponent is wrapped in React.memo, 
        but it still re-renders because cryptoReturns is passed as a prop.
        Functions are recreated every render, so React thinks the prop has changed. */}
      <ChildComponent cryptoReturns={cryptoReturns} />

      {/* DummyComponent is memoized and has no props. 
        Since nothing changes, it does NOT re-render. */}
      <DummyComponent />
    </div>
  );
}

// Memoized DummyComponent will only re-render if its props change (none in this case)
const DummyComponent = memo(() => {
  console.log("DummyComponent rerendered");
});

// Memoized ChildComponent, but it still re-renders
// because the cryptoReturns function reference changes each time.
const ChildComponent = memo(({ cryptoReturns }) => {
  console.log("ChildComponent rerendered");
  return <div>Crypto Returns: {cryptoReturns()}</div>;
});

export default App5;
