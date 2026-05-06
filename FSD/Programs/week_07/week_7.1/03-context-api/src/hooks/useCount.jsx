import { useContext } from "react";
import CountContext from "../contexts/CountContext";

// Custom hook for consuming context easily
export function useCount() {
  const context = useContext(CountContext);
  if (!context) {
    throw new Error("useCount must be used within a CountProvider");
  }
  return context;
}
