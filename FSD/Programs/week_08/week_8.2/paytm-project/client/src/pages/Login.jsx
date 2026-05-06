import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import EmailInput from "../components/EmailInput";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }
    return newErrors;
  };

  const handleLogin = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/signin`,
        { email, password }
      );
      const { user } = res.data || {};
      if (user?.jwtToken) {
        localStorage.setItem("token", user.jwtToken);
      }
      if (user) {
        const publicUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
        localStorage.setItem("user", JSON.stringify(publicUser));
      }
      navigate("/dashboard");
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-xl bg-white w-100 text-center p-2 h-max px-4">
          <Heading label="Sign in" />
          <SubHeading label="Enter your credentials to access your account" />

          {/* Email input with autocomplete */}
          <EmailInput
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={
              errors.email && (
                <p className="text-red-500 text-sm text-left">{errors.email}</p>
              )
            }
          />

          {/* Password input */}
          <div className="text-sm font-medium text-left py-2">Password</div>
          <input
            type="password"
            value={password}
            placeholder="Enter password"
            className={`w-full px-2 py-2 border rounded-xl ${
              errors.password ? "border-red-500" : "border-slate-200"
            }`}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm text-left">{errors.password}</p>
          )}

          {/* Button */}
          <div className="pt-4">
            <Button label="Sign in" onClick={handleLogin} />
          </div>

          <BottomWarning
            label="Don't have an account?"
            buttonText="Sign up"
            to="/signup"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
