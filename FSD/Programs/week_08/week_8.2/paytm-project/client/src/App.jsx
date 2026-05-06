import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import axios from "axios";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import SendMoneyAccount from "./pages/SendMoneyAccount";
import Profile from "./pages/Profile";

const ProtectedRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuth(false);
      setChecking(false);
      return;
    }
    let ignore = false;
    async function validate() {
      try {
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/users/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!ignore) setIsAuth(true);
      } catch (_e) {
        if (!ignore) setIsAuth(false);
      } finally {
        if (!ignore) setChecking(false);
      }
    }
    validate();
    return () => {
      ignore = true;
    };
  }, []);

  if (checking)
    return (
      <div className="fixed inset-0 z-[1000] bg-white/60 backdrop-blur-sm flex items-center justify-center">
        <div className="h-10 w-10 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  if (!isAuth) return <Navigate to="/signin" replace />;
  return children;
};

const PublicRoute = ({ children }) => {
  const [checking, setChecking] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsAuth(false);
      setChecking(false);
      return;
    }
    let ignore = false;
    async function validate() {
      try {
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/users/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!ignore) setIsAuth(true);
      } catch (_e) {
        if (!ignore) setIsAuth(false);
      } finally {
        if (!ignore) setChecking(false);
      }
    }
    validate();
    return () => {
      ignore = true;
    };
  }, []);

  if (checking) return null;
  if (isAuth) return <Navigate to="/dashboard" replace />;
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <RouteChangeLoader />
      <Routes>
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/send"
          element={
            <ProtectedRoute>
              <SendMoney />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sendaccount"
          element={
            <ProtectedRoute>
              <SendMoneyAccount />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Root path */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Navigate to="/dashboard" replace />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

function RouteChangeLoader() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(t);
  }, [location.pathname]);

  if (!loading) return null;
  return (
    <div className="fixed inset-0 z-[999] bg-white/40 backdrop-blur-[1px] flex items-center justify-center pointer-events-none">
      <div className="h-9 w-9 border-4 border-slate-300 border-t-blue-600 rounded-full animate-spin" />
    </div>
  );
}
