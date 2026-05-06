import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppBar = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");
  const [initial, setInitial] = useState("U");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        const name = [u.firstName, u.lastName].filter(Boolean).join(" ");
        setDisplayName(name || "User");
        setInitial((u.firstName?.[0] || u.lastName?.[0] || "U").toUpperCase());
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  return (
    <div className="shadow h-16 flex justify-between px-[15%]">
      <div
        className="flex flex-col justify-center h-full font-bold text-xl cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        PayTM App
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex flex-col justify-center h-full">
          {displayName || "User"}
        </div>
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            title="Open menu"
            className="rounded-full h-12 w-12 bg-slate-200 flex items-center justify-center text-xl hover:ring-2 hover:ring-slate-300"
          >
            {initial}
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow z-50 py-1">
              <button
                type="button"
                className="w-full text-left px-3 py-2 hover:bg-slate-100"
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/profile");
                }}
              >
                My Profile
              </button>
              <button
                type="button"
                className="w-full text-left px-3 py-2 hover:bg-slate-100 text-red-600"
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppBar;
