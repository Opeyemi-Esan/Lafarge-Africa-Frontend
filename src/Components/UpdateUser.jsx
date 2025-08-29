import React, { useState, useEffect } from "react";
import api from "../Auth/api";
import { AuthService } from "../Auth/AuthService";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const UpdateUser = () => {
  const navigate = useNavigate();
  const { userId } = useParams(); // get userId from route

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    phoneNumber: "",
    nationality: "",
    dateOfBirth: "",
    gender: "",
  });

  const [nationalities, setNationalities] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch list of countries
  useEffect(() => {
    const fetchNationalities = async () => {
      try {
        const res = await axios.get(
          "https://restcountries.com/v3.1/all?fields=name"
        );
        const countries = res.data
          .map((c) => c.name.common)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b));
        setNationalities(countries);
      } catch (error) {
        console.error("Error fetching nationalities:", error);
      }
    };

    fetchNationalities();
  }, []);

  // Preload user data
  useEffect(() => {
    const fetchUser = async () => {
      if (!userId) return; // safety check

      try {
        const res = await api.get(`/User/${userId}`);
        if (res.data) {
          setFormData({
            firstName: res.data.firstName || "",
            lastName: res.data.lastName || "",
            email: res.data.email || "",
            role: res.data.role || "",
            phoneNumber: res.data.phoneNumber || "",
            nationality: res.data.nationality || "",
            dateOfBirth: res.data.dateOfBirth
              ? res.data.dateOfBirth.split("T")[0]
              : "",
            gender: res.data.gender || "",
          });
        }
      } catch (err) {
        console.error("Error fetching user:", err.response?.data || err.message);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!userId) {
      setMessage("Invalid user ID.");
      return;
    }

    try {
      const response = await api.put(`/User/update_user/${userId}`, formData);

      if (response.data.success) {
        setMessage("User updated successfully!");
        navigate("/users");
      } else {
        setMessage(response.data.message || "Update failed");
      }
    } catch (err) {
      console.error("Error updating user:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "An error occurred");

      if (err.response?.status === 401) {
        setMessage("Unauthorized. Please login again.");
        AuthService.removeToken();
        navigate("/login");
      }
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-gray-300 p-10">
      <div className="w-full max-w-lg bg-slate-500 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-200">
          Update User
        </h1>

        {message && <p className="text-center text-yellow-300 mb-4">{message}</p>}

        <form onSubmit={handleSubmit}>
          {/* First & Last Name */}
          <input
            required
            type="text"
            name="firstName"
            placeholder="First Name *"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-lg bg-slate-400 focus:outline-none"
          />
          <input
            required
            type="text"
            name="lastName"
            placeholder="Last Name *"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-lg bg-slate-400 focus:outline-none"
          />

          {/* Email */}
          <input
            required
            type="email"
            name="email"
            placeholder="Email *"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-lg bg-slate-400 focus:outline-none"
          />

          {/* Role */}
          <select
            required
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-lg bg-slate-400 focus:outline-none cursor-pointer"
          >
            <option value="">Select Role *</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>

          {/* Phone Number */}
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number *"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-lg bg-slate-400 focus:outline-none"
          />

          {/* Nationality */}
          <select
            name="nationality"
            value={formData.nationality}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-lg bg-slate-400 focus:outline-none"
          >
            <option value="">Select Nationality</option>
            {nationalities.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>

          {/* Date of Birth */}
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-lg bg-slate-400 focus:outline-none"
          />

          {/* Gender */}
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-lg bg-slate-400 focus:outline-none"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
