import React, { useEffect, useState } from "react";
import axios from "axios";
import AppBar from "../components/AppBar";
import { InputBox } from "../components/InputBox";
import EmailInput from "../components/EmailInput";
import { Button } from "../components/Button";

const Profile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [pwdMsg, setPwdMsg] = useState("");
  const [pwdErr, setPwdErr] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    let ignore = false;
    async function fetchProfile() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/users/profile`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (ignore) return;
        const u = res.data?.user || {};
        setFirstName(u.firstName || "");
        setLastName(u.lastName || "");
        setEmail(u.email || "");
      } catch (e) {
        console.error(e);
        if (!ignore) setError(e.response?.data?.message || e.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    fetchProfile();
    return () => {
      ignore = true;
    };
  }, []);

  const handleUpdateProfile = async () => {
    setMessage("");
    setError("");
    const token = localStorage.getItem("token");
    try {
      const payload = {};
      if (firstName) payload.firstName = firstName;
      if (lastName) payload.lastName = lastName;
      if (email) payload.email = email;

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/users/update`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const user = res.data?.user;
      if (user) {
        const publicUser = {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        };
        localStorage.setItem("user", JSON.stringify(publicUser));
      }
      setMessage("Profile updated successfully");
    } catch (e) {
      setError(e.response?.data?.message || e.message);
    }
  };

  const handleChangePassword = async () => {
    setPwdMsg("");
    setPwdErr("");
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/v1/users/change-password`,
        { currentPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPwdMsg("Password changed successfully");
      setCurrentPassword("");
      setNewPassword("");
    } catch (e) {
      setPwdErr(e.response?.data?.message || e.message);
    }
  };

  if (loading) return null;

  return (
    <div>
      <AppBar />
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-xl shadow">
        <h2 className="text-xl font-semibold">Profile</h2>
        <p className="text-slate-500 text-sm mb-4">
          Update your personal information
        </p>

        {message && (
          <div className="text-green-600 text-sm mb-2">{message}</div>
        )}
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputBox
            label="First name"
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputBox
            label="Last name"
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <div className="md:col-span-2">
            <EmailInput
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <Button label="Save changes" onClick={handleUpdateProfile} />
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-6 p-6 bg-white rounded-xl shadow">
        <h2 className="text-xl font-semibold">Change password</h2>
        <p className="text-slate-500 text-sm mb-4">
          Use a strong password you do not reuse elsewhere
        </p>

        {pwdMsg && <div className="text-green-600 text-sm mb-2">{pwdMsg}</div>}
        {pwdErr && <div className="text-red-600 text-sm mb-2">{pwdErr}</div>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-left py-2">
              Current password
            </div>
            <input
              type="password"
              value={currentPassword}
              placeholder="Enter current password"
              className="w-full px-2 py-2 border rounded-xl border-slate-200"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div>
            <div className="text-sm font-medium text-left py-2">
              New password
            </div>
            <input
              type="password"
              value={newPassword}
              placeholder="Enter new password"
              className="w-full px-2 py-2 border rounded-xl border-slate-200"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-4">
          <Button label="Change password" onClick={handleChangePassword} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
