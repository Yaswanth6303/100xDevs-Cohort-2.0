import { useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const timeout = setTimeout(() => {
      axios
        .get(`${import.meta.env.VITE_API_URL}/api/v1/users/allusers`, {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
          params: {
            filter: search || "",
          },
        })
        .then((res) => {
          setUsers(res.data.users || []);
        })
        .catch((err) => {
          console.error(err.response?.data?.message || err.message);
        });
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("user");
      if (stored) {
        const u = JSON.parse(stored);
        setCurrentEmail(u?.email || "");
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        ></input>
      </div>
      <div>
        {users
          .filter((user) => (currentEmail ? user.email !== currentEmail : true))
          .map((user) => (
            <User key={user.id || user.email} user={user} />
          ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button
          label={"Send Money"}
          onClick={() => {
            navigate(
              `/send?toUserId=${encodeURIComponent(
                user.id
              )}&type=userId&name=${encodeURIComponent(
                user.firstName
              )}&last=${encodeURIComponent(user.lastName)}`
            );
          }}
        />
      </div>
    </div>
  );
}

export default Users;
