import React, { useState, useEffect } from "react";

const App = () => {
  const online = useOnline();
  return <div>{online ? "Online" : "Offline"}</div>;
};

function useOnline() {
  const [online, setOnline] = useState(true);
  useEffect(() => {
    window.addEventListener("online", () => setOnline(true));
    window.addEventListener("offline", () => setOnline(false));

    return () => {
      window.removeEventListener("online", () => setOnline(true));
      window.removeEventListener("offline", () => setOnline(false));
    };
  }, []);

  return online;
}

export default App;
