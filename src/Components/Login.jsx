import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Auth/api";         
import { AuthService } from "../Auth/AuthService";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/User/login", {
        email,
        password,
      });


      if (response.data.success) {
      // Save token
      AuthService.saveToken(response.data.data);
  }

      navigate("/dashboard");

    } catch (error) {
      setError("Error:", error.response?.data || error.message);
      alert("Failed to login. Check credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">
      <div className="w-full max-w-lg bg-slate-500 p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-200">
          Login
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            required
            type="email"
            name="email"
            placeholder="Email *"
            value={email}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-lg bg-slate-400 focus:outline-none"
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password *"
            value={password}
            onChange={handleChange}
            className="w-full p-3 mb-3 rounded-lg bg-slate-400 focus:outline-none"
          />

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
