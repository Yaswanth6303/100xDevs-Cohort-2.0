import React from "react";
import { RevenueCard } from "./components/RevenueCard";

function App3() {
  return (
    <div className="grid grid-cols-3 p-8">
      <RevenueCard
        title={"Amount Pending"}
        amount={"92,312.20"}
        orderCount={13}
      ></RevenueCard>
    </div>
  );
}

export default App3;
