import { useState } from "react";

const commonDomains = [
  "gmail.com",
  "outlook.com",
  "icloud.com",
  "yahoo.com",
  "protonmail.com",
];

function EmailInput({ label, value, onChange, error }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const [prefix, domainPart] = value.split("@");

  const filteredDomains =
    prefix && !domainPart ? commonDomains.map((d) => `${prefix}@${d}`) : [];

  const handleKeyDown = (e) => {
    if (!showSuggestions || filteredDomains.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev < filteredDomains.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev > 0 ? prev - 1 : filteredDomains.length - 1
      );
    } else if (e.key === "Enter") {
      if (highlightIndex >= 0) {
        e.preventDefault();
        onChange({ target: { value: filteredDomains[highlightIndex] } });
        setShowSuggestions(false);
        setHighlightIndex(-1);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setHighlightIndex(-1);
    }
  };

  return (
    <div className="relative w-full">
      <div className="text-sm font-medium text-left py-2">{label}</div>
      <input
        type="email"
        value={value}
        placeholder="johndoe@gmail.com"
        className={`w-full px-2 py-2 border rounded-xl ${
          error ? "border-red-500" : "border-slate-200"
        }`}
        onChange={(e) => {
          onChange(e);
          setShowSuggestions(true);
          setHighlightIndex(-1);
        }}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
        onFocus={() => prefix && setShowSuggestions(true)}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && filteredDomains.length > 0 && (
        <ul className="absolute bg-white border rounded-md shadow-md w-full mt-1 z-10">
          {filteredDomains.map((suggestion, idx) => (
            <li
              key={suggestion}
              className={`px-2 py-1 cursor-pointer text-left ${
                idx === highlightIndex ? "bg-blue-100" : "hover:bg-slate-100"
              }`}
              onMouseEnter={() => setHighlightIndex(idx)}
              onMouseDown={() => {
                onChange({ target: { value: suggestion } });
                setShowSuggestions(false);
                setHighlightIndex(-1);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}

export default EmailInput;
