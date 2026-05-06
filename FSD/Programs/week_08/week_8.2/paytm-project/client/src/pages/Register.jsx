import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EmailInput from "../components/EmailInput";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleSignup = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/signup`,
        {
          firstName,
          lastName,
          email,
          password,
        }
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
          <Heading label="Sign up" />
          <SubHeading label="Enter your information to create an account" />

          {/* First Name */}
          <InputBox
            placeholder="John"
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm text-left">{errors.firstName}</p>
          )}

          {/* Last Name */}
          <InputBox
            placeholder="Doe"
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm text-left">{errors.lastName}</p>
          )}

          {/* Email */}
          <EmailInput
            placeholder="johndoe@gmail.com"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm text-left">{errors.email}</p>
          )}

          {/* Password */}
          <InputBox
            placeholder="123456"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={errors.password ? "border-red-500" : ""}
          />
          {errors.password && (
            <p className="text-red-500 text-sm text-left">{errors.password}</p>
          )}

          {/* Submit */}
          <div className="pt-4">
            <Button label="Sign up" onClick={handleSignup} />
          </div>

          <BottomWarning
            label="Already have an account?"
            buttonText="Sign in"
            to="/signin"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
