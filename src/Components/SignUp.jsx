import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignUp = () => {

  const navigate = useNavigate();

  const [nationalities, setNationalities] = useState([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "User", 
    profilePicture: null,
    phoneNumber: "",
    nationality: "",
    dateOfBirth: "",
    gender: "Male" 
  });

  // Fetch nationalities (with axios)
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
        setError("Error fetching nationalities:", error);
      }
    };

    fetchNationalities();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle submit with axios
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build FormData object for multipart/form-data
    const data = new FormData();
    data.append("FirstName", formData.firstName);
    data.append("LastName", formData.lastName);
    data.append("Email", formData.email);
    data.append("Password", formData.password);
    data.append("ConfirmPassword", formData.confirmPassword);
    data.append("Role", formData.role); 
    if (formData.profilePicture) {
      data.append("ProfilePicture", formData.profilePicture);
    }
    data.append("PhoneNumber", formData.phoneNumber);
    data.append("Nationality", formData.nationality);
    data.append("DateOfBirth", new Date(formData.dateOfBirth).toISOString()); 
    data.append("Gender", formData.gender);

    try {
  const response = await axios.post(
    "https://localhost:7221/api/User/register",
    data,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  alert("Registration successful!");
  navigate("/login"); // redirect after success if needed
} catch (error) {
  setError(error.response?.data?.message || "An error occurred");
  alert("Failed to register user.");
}
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="w-full max-w-lg bg-slate-500 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-200">
          Sign Up
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
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

          {/* Passwords */}
          <input
            required
            type="password"
            name="password"
            placeholder="Password *"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-lg bg-slate-400 focus:outline-none"
          />
          <input
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password *"
            value={formData.confirmPassword}
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

          {/* Profile Picture */}
          <input
            type="file"
            name="profilePicture"
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-lg bg-slate-400 focus:outline-none cursor-pointer"
          />

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

          {/* Submit */}
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
