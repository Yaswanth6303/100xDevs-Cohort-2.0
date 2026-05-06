import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SendMoneyAccount = () => {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [recipient, setRecipient] = useState(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!accountNumber || !amount) {
      setError("Account number and amount are required");
      return;
    }
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) {
      setError("Enter a valid amount greater than 0");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/account/transfer`,
        { toAccountNumber: accountNumber, amount: amt },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSuccess("Transfer successful");
      console.log(res.data);
      setAccountNumber("");
      setAmount("");
      setRecipient(null);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/dashboard");
      }, 1200);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Transfer failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    async function lookup() {
      if (!accountNumber || accountNumber.trim().length === 0) {
        setRecipient(null);
        return;
      }
      try {
        setLookupLoading(true);
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/account/lookup`,
          {
            params: { accountNumber },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            signal: controller.signal,
          }
        );
        if (!ignore) {
          setRecipient(data?.data || null);
        }
      } catch (err) {
        if (!ignore) {
          setRecipient(null);
        }
      } finally {
        if (!ignore) {
          setLookupLoading(false);
        }
      }
    }

    const timer = setTimeout(lookup, 400);
    return () => {
      ignore = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [accountNumber]);

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">
              Send Money via Account
            </h2>
          </div>
          <form className="p-6 space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="accountNumber">
                Recipient Account Number
              </label>
              <input
                id="accountNumber"
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                placeholder="Enter account number"
              />
            </div>
            {recipient ? (
              <div className="px-6 -mt-2 text-sm text-gray-700">
                Recipient:{" "}
                <span className="font-medium">
                  {recipient.firstName} {recipient.lastName}
                </span>
              </div>
            ) : accountNumber && !lookupLoading ? (
              <div className="px-6 -mt-2 text-sm text-gray-500">
                No matching account
              </div>
            ) : null}
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="amount">
                Amount (in ₹)
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                placeholder="Enter amount"
                min="1"
                step="1"
              />
            </div>
            {error ? <div className="text-red-600 text-sm">{error}</div> : null}
            {success ? (
              <div className="text-green-600 text-sm">{success}</div>
            ) : null}
            <button
              type="submit"
              disabled={loading}
              className="justify-center rounded-md text-sm font-medium h-10 px-4 py-2 w-full bg-green-500 text-white disabled:opacity-50"
            >
              {loading ? "Transferring..." : "Initiate Transfer"}
            </button>
          </form>
        </div>
      </div>
      {showToast ? (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow">
          Money Sent Successfully
        </div>
      ) : null}
    </div>
  );
};

export default SendMoneyAccount;
