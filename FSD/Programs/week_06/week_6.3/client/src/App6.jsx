import { useCallback, useEffect, useState, memo } from "react";
import axios from "axios";

function App6() {
  const [exchange1Data, setExchange1Data] = useState({});
  const [exchange2Data, setExchange2Data] = useState({});
  const [bankData, setBankData] = useState({});

  // Fetch WazirX data
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/crypto-returns-wazirx")
      .then((res) => {
        setExchange1Data(res.data);
      });
  }, []);

  // Fetch Binance data
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

  // useCallback ensures that the function reference is stable
  // and only changes when exchange1Data or exchange2Data changes.
  // This prevents unnecessary re-renders in ChildComponent.
  const cryptoReturns = useCallback(() => {
    return (exchange1Data?.returns || 0) + (exchange2Data?.returns || 0);
  }, [exchange1Data, exchange2Data]);

  return (
    <div>
      {/* Now ChildComponent will only re-render if exchange1Data or exchange2Data changes,
        because the cryptoReturns function reference is memoized with useCallback. */}
      <ChildComponent cryptoReturns={cryptoReturns} />

      {/* DummyComponent is memoized and has no props, so it never re-renders unnecessarily. */}
      <DummyComponent />
    </div>
  );
}

const DummyComponent = memo(() => {
  console.log("DummyComponent rerendered");
});

const ChildComponent = memo(({ cryptoReturns }) => {
  console.log("ChildComponent rerendered");
  return <div>Crypto Returns: {cryptoReturns()}</div>;
});

export default App6;
