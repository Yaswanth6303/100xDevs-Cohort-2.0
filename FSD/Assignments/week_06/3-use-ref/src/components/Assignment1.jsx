import { useEffect, useRef } from "react";

// Create a component with a text input field and a button. When the component mounts
// (means first time component renders) or
// the button is clicked, automatically focus the text input field using useRef.

export function Assignment1() {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
    //document.getElementById("inputBox").focus()
  }, [inputRef]);

  const handleButtonClick = () => {
    inputRef.current.focus();
    //document.getElementById("inputBox").focus()
  };

  return (
    <div>
      <input
        id="inputBox"
        ref={inputRef}
        type="text"
        placeholder="Enter text here"
      />
      <button onClick={handleButtonClick}>Focus Input</button>
    </div>
  );
}
