import { useEffect, useState } from "react";
import axios from "axios";

/**
 * App1 Component
 * -----------------
 * - Demonstrates fetching data from a backend using Axios.
 * - Uses `useState` to store fetched data.
 * - Uses `useEffect` to avoid infinite re-renders while fetching.
 */
function App1() {
  /**
   * ---------------------------
   * State variables
   * ---------------------------
   * - `exchangeData`: stores data fetched from the crypto exchange API.
   * - `bankData`: stores data fetched from the bank income API.
   *
   * Both are initialized as empty objects `{}` until API responses arrive.
   */
  const [exchangeData, setExchangeData] = useState({});
  const [bankData, setBankData] = useState({});

  /**
   * ---------------------------
   * useEffect for bankData
   * ---------------------------
   * - Makes an API call to `http://localhost:3000/api/v1/bank-income`.
   * - After receiving the response, waits 3 seconds before updating `bankData`.
   * - Empty dependency array `[]` ensures this effect runs only once (on mount).
   */
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/bank-income").then((res) => {
      setTimeout(() => {
        setBankData(res.data);
      }, 3000);
    });
  }, []);

  /**
   * ---------------------------
   * useEffect for exchangeData
   * ---------------------------
   * - Makes an API call to `http://localhost:3000/api/v1/crypto-returns-wazirx`.
   * - After receiving the response, waits 1 second before updating `exchangeData`.
   * - Empty dependency array `[]` ensures this effect runs only once (on mount).
   */
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/crypto-returns-wazirx")
      .then((res) => {
        setTimeout(() => {
          setExchangeData(res.data);
        }, 1000);
      });
  }, []);

  /**
   * ---------------------------
   * Derived value: incomeTax
   * ---------------------------
   * - Formula: (bank income + exchange returns) * 0.3 (30% tax).
   * - Issue:
   *      On initial render, both objects are empty `{}`.
   *      So `bankData.income` and `exchangeData.returns` are `undefined`,
   *      which makes the calculation return `NaN`.
   * - After 1 second → `exchangeData` updates.
   *   After 3 seconds → `bankData` updates.
   *   Once both are available, incomeTax is recalculated correctly.
   */
  const incomeTax = (bankData.income + exchangeData.returns) * 0.3;

  /**
   * ---------------------------
   * JSX Output
   * ---------------------------
   * - Displays the calculated income tax.
   * - Initially shows "NaN" until both API calls finish.
   * - In a real project, you’d handle this with conditional rendering
   *   (e.g., show "Loading..." until both values are ready).
   */
  return <div>Hi there, your income tax returns are {incomeTax}</div>;
}

export default App1;
