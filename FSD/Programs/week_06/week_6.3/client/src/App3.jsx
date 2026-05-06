import { useEffect, useState, useMemo } from "react";
import axios from "axios";

function App3() {
  /**
   * ------------------------
   * React State Variables
   * ------------------------
   * These states hold data that we fetch from different sources:
   *  - exchange1Data → returns from Crypto Exchange 1 (WazirX)
   *  - exchange2Data → returns from Crypto Exchange 2 (Binance)
   *  - bankData → income from the Bank
   *
   * At the beginning, all are empty objects {}.
   * They will be updated once the API responses come back.
   */
  const [exchange1Data, setExchange1Data] = useState({});
  const [exchange2Data, setExchange2Data] = useState({});
  const [bankData, setBankData] = useState({});

  /**
   * ------------------------
   * Fetch Exchange 1 Data
   * ------------------------
   * This effect runs only once (on component mount).
   * It fetches returns data from Exchange 1 (WazirX).
   */
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/crypto-returns-wazirx")
      .then((res) => {
        setExchange1Data(res.data);
      });
  }, []);

  /**
   * ------------------------
   * Fetch Exchange 2 Data
   * ------------------------
   * This effect runs only once (on mount).
   * It fetches returns data from Exchange 2 (Binance).
   */
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/crypto-returns-binance")
      .then((res) => {
        setExchange2Data(res.data);
      });
  }, []);

  /**
   * ------------------------
   * Fetch Bank Data
   * ------------------------
   * This effect runs only once (on mount).
   * It fetches income/balance data from the Bank.
   */
  useEffect(() => {
    setTimeout(() => {
      axios.get("http://localhost:3000/api/v1/bank-income").then((res) => {
        setBankData(res.data);
      });
    }, 3000);
  }, []);

  /**
   * ------------------------
   * Calculate Crypto Returns (Memoized)
   * ------------------------
   * cryptoReturns = exchange1Data.returns + exchange2Data.returns
   *
   * useMemo ensures that this calculation only runs
   * when either exchange1Data or exchange2Data changes.
   * Without useMemo, it would run on every render unnecessarily.
   */
  const cryptoReturns = useMemo(() => {
    console.log("cryptoReturns rerendered");
    return exchange1Data.returns + exchange2Data.returns;
  }, [exchange1Data, exchange2Data]);

  /**
   * ------------------------
   * Calculate Income Tax
   * ------------------------
   * incomeTax = (cryptoReturns + bankData.income) * 0.3
   *
   * This calculates the tax (30%) on total income
   * from both crypto returns and bank income.
   */
  const incomeTax = (cryptoReturns + bankData.income) * 0.3;

  /**
   * ------------------------
   * Render Output
   * ------------------------
   * Shows the final calculated income tax in the UI.
   * Note: On the very first render, values may be undefined,
   * so the result might briefly be NaN until the data loads.
   */
  return <div>Hi there, your income tax returns are {incomeTax}</div>;
}

export default App3;
