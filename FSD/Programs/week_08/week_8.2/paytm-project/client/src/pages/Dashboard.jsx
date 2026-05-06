import React from "react";
import AppBar from "../components/AppBar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AccountNumber from "../components/AccountNumber";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [accountNumber, setAccountNumber] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/account/balance`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        setBalance(res.data.balance);
      });
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/v1/users/profile`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      })
      .then((res) => {
        setAccountNumber(res.data.account.accountNumber);
      });
  }, []);

  return (
    <div>
      <AppBar />
      <div className="m-8">
        <Balance value={balance} />
        <AccountNumber value={accountNumber} />
        <div className="my-4">
          <button
            onClick={() => navigate("/sendaccount")}
            className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm"
          >
            Send money via account number
          </button>
        </div>
        <Users />
      </div>
    </div>
  );
};

export default Dashboard;
