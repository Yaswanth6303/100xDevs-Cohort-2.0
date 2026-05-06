import { useState, useEffect } from "react";

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timerId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup function
    return () => {
      clearTimeout(timerId);
    };
  }, [value, delay]);

  return debouncedValue;
}

// If I don't use useEffect, for example when typing "airpods":
// - Typing "a" sets inputValue → passes to useDebounce → starts a timer.
// - Typing "i" immediately after starts another timer without clearing the old one.
// - This continues for every character, creating multiple active timers (infinite timers).
//
// By using useEffect, I can manage these timers properly:
// - Each time inputValue changes, a new timer starts.
// - For each keystroke, a new timer gets created.
// - If I type again before 500ms, the previous timer is cancelled with clearTimeout.
// - This ensures only the latest timer is active at any point.
// - If I keep typing continuously (faster than 500ms), old timers are always cleared.
// - Only when I stop typing for at least 500ms does the last timer complete,
//   and the debounced value is finally saved in the state.
