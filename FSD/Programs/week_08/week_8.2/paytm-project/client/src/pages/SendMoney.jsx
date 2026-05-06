import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const firstName = searchParams.get("name") || "";
  const lastName = searchParams.get("last") || "";
  const toUserId = searchParams.get("toUserId") || "";
  const initial = (firstName[0] || "?").toUpperCase();

  const [amount, setAmount] = useState("");
  const [sending, setSending] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const onTransfer = async () => {
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0 || !toUserId) return;
    try {
      setSending(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/account/transfer`,
        { toUserId, amount: amt },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate("/dashboard");
      }, 1200);
    } catch (e) {
      console.error(e.response?.data?.message || e.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div class="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div class="flex flex-col space-y-1.5 p-6">
            <h2 class="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div class="p-6">
            <div class="flex items-center space-x-4">
              <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span class="text-2xl text-white">{initial}</span>
              </div>
              <h3 class="text-2xl font-semibold">
                {firstName} {lastName}
              </h3>
            </div>
            <div class="space-y-4">
              <div class="space-y-2">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="amount"
                >
                  Amount (in ₹)
                </label>
                <input
                  type="number"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <button
                onClick={onTransfer}
                disabled={sending}
                class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white disabled:opacity-50"
              >
                {sending ? "Transferring..." : "Initiate Transfer"}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showToast ? (
        <div class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-2 rounded shadow">
          Money Sent Successfully
        </div>
      ) : null}
    </div>
  );
};

export default SendMoney;
