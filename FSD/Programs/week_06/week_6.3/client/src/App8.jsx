import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App8() {
  const [bankData, setBankData] = useState({});
  const [exchangeData1, setExchangeData1] = useState({});
  const [exchangeData2, setExchangeData2] = useState({});
  const [incomeTax, setIncomeTax] = useState(10);

  // Ref for directly accessing the span element
  const incomeTaxRef = useRef(null);

  // Fetch data once on mount
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/bank-income").then((res) => {
      setBankData(res.data);
    });
    axios
      .get("http://localhost:3000/api/v1/crypto-returns-wazirx")
      .then((res) => {
        setExchangeData1(res.data);
      });
    axios
      .get("http://localhost:3000/api/v1/crypto-returns-binance")
      .then((res) => {
        setExchangeData2(res.data);
      });
  }, []);

  // Recalculate tax whenever API data changes
  useEffect(() => {
    const newTax =
      (bankData.income || 0) +
      (exchangeData1.returns || 0) +
      (exchangeData2.returns || 0);

    setIncomeTax(newTax * 0.3);
  }, [bankData, exchangeData1, exchangeData2]);

  // Example of using useRef for delayed manual DOM manipulation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (incomeTaxRef.current) {
        // update DOM directly with latest state
        incomeTaxRef.current.innerHTML = incomeTax;
      }
    }, 5000);

    return () => clearTimeout(timer); // cleanup
  }, []);

  return (
    <div>
      Hi there, your income tax returns are:{" "}
      <span ref={incomeTaxRef}>{incomeTax}</span>
    </div>
  );
}

export default App8;
