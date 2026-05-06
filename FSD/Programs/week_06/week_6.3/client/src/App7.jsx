import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App7() {
  const [bankData, setBankData] = useState({});
  const [exchangeData1, setExchangeData1] = useState({});
  const [exchangeData2, setExchangeData2] = useState({});
  const [incomeTax, setIncomeTax] = useState(10);

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

  useEffect(() => {
    setIncomeTax(
      (bankData.income ||
        0 + exchangeData1.returns ||
        0 + exchangeData2.returns ||
        0) * 0.3,
    );
  }, [bankData, exchangeData1, exchangeData2]);

  useEffect(() => {
    setTimeout(() => {
      document.getElementById("income-tax").innerHTML = incomeTax;
    }, 5000);
  }, []);

  return (
    <div>
      Hi there, your income tax returns are:{" "}
      <span id="income-tax">{incomeTax}</span>
    </div>
  );
}

export default App7;
