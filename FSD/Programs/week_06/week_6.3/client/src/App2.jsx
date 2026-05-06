import { useEffect, useState } from "react";
import axios from "axios";

// ------------------- App2 Component -------------------
function App2() {
  // ------------------- State Variables -------------------
  // React states that will store data fetched from the backend.

  // Stores returns data from Exchange 1 (e.g., WazirX).
  const [exchange1Data, setExchange1Data] = useState({});
  // Stores returns data from Exchange 2 (e.g., Binance).
  const [exchange2Data, setExchange2Data] = useState({});
  // Stores income/balance data from the bank.
  const [bankData, setBankData] = useState({});

  // ------------------- useEffect for Exchange 1 -------------------
  useEffect(() => {
    // Fetches crypto returns from Exchange 1 API (WazirX).
    axios
      .get("http://localhost:3000/api/v1/crypto-returns-wazirx")
      .then((res) => {
        setExchange1Data(res.data);
      });
  }, []); // Runs only once after component mounts.

  // ------------------- useEffect for Exchange 2 -------------------
  useEffect(() => {
    // Fetches crypto returns from Exchange 2 API (Binance).
    axios
      .get("http://localhost:3000/api/v1/crypto-returns-binance")
      .then((res) => {
        setExchange2Data(res.data);
      });
  }, []); // Runs only once.

  // ------------------- useEffect for Bank Data -------------------
  useEffect(() => {
    // Fetches bank income data (e.g., salary, deposits).
    axios.get("http://localhost:3000/api/v1/bank-income").then((res) => {
      setBankData(res.data);
    });
  }, []); // Runs only once.

  // ------------------- Derived Values -------------------
  // We are combining the returns from Exchange 1 and Exchange 2.
  // Currently, this calculation runs every time any of the state values change.
  // For example, when the bank data is fetched, the crypto returns are recalculated
  // even though the exchange data has not changed.
  // This leads to unnecessary recalculations.
  // To optimize this, we can use useMemo so that the calculation only runs
  // when the exchange data actually changes. Visit App3.jsx for the optimized version.
  const cryptoReturns = exchange1Data.returns + exchange2Data.returns;

  // Calculate income tax: 30% of (crypto returns + bank income).
  // Note:
  // - On the first render, state values are empty objects {}.
  // - This makes exchange1Data.returns, exchange2Data.returns, and bankData.income undefined,
  //   which leads to NaN temporarily.
  // - Once data is fetched and state updates, the correct calculation runs.
  const incomeTax = (cryptoReturns + bankData.income) * 0.3;

  // ------------------- Render Section -------------------
  // Displays the calculated income tax on the screen.
  // Initially may show NaN until all API data is available.
  return <div>Hi there, your income tax returns are {incomeTax}</div>;
}

export default App2;
