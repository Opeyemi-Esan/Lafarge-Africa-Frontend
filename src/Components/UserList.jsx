import React, { useState, useEffect } from "react";
import api from "../Auth/api";
import { AuthService } from "../Auth/AuthService";
import { Link } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { FiDelete } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import axios from "axios";

export const UserList = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
  const token = AuthService.getToken();
  if (!token) return;

  setLoading(true);
  setError("");

  try {
    const response = await api.get("/User/retrieve_users");

    const apiResponse = response.data; 
    if (apiResponse.success) {
      setUsers(apiResponse.data); 
    } else {
      setUsers([]);
      setError(apiResponse.message || "Failed to fetch users");
    }
  } catch (err) {
    setError(err.response?.data?.message || "An error occurred");
    if (err.response?.status === 401) {
      setError("Unauthorized. Only Admin can view other users.");
    }
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchUsers();
  }, []);


const deleteUser = async (email) => {
  try {
    const token = AuthService.getToken();

    const response = await axios.delete(
      `https://localhost:7221/api/User/delete_user/${encodeURIComponent(email)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.location.reload();
    alert("User deleted successfully!");
    console.log("User deleted:", response.data);
  } catch (error) {
    setError(error.response?.data?.message || "An error occurred");
    alert("Failed to delete user.");
    console.error("Error deleting user:", error.response?.data || error.message);
  }
};

  return (
    <div className="m-h-screen p-10 px-20">
      <h1 className="text-2xl font-bold mb-4">User List</h1>

      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && users.length === 0 && <p>No users found.</p>}

          {!loading && users.map((user, index) => (
              <div key={index} className="mb-3 p-3 bg-gray-200 rounded-lg flex justify-between items-center px-10 py-10">
                  <div className="flex items-center gap-10">
                      <div>
                          <h2 className="font-semibold text-2xl">{user.firstName} {user.lastName}</h2>
                          <p className="text-gray-700">{user.email}</p>
                          <p className="bg-slate-500 px-4 py-2 rounded text-center text-slate-100">{user.nationality}</p>
                      </div>
                      <img className="w-40" src={user.profilePicture} alt="" />
                      <Link onClick={() => deleteUser(user.email)} className="bg-red-500 px-5 py-2 text-white font-semibold"><MdDelete /></Link>
                  </div>

                <Link className="font-bold text-2xl" to="/updateuser"><BiEdit /></Link>
              </div>
          ))}
    </div>
  );
};
