"use client"; // This marks the component as a Client Component for Next.js

import { useState } from "react";
import { useRouter } from "next/navigation"; // Use Next.js router
import axios from "axios"; // For making API requests to your backend

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // Function to handle registration
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/register", {
        name,
        position,
        email,
        password,
      });

      if (response.status === 200) {
        alert("User registered successfully");
        router.push("/admin");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Error registering user."
      );
    }
  };

  // Function to handle login
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        alert("Logged in successfully");
        router.push("/admin");
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error logging in.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-6">
          {isRegistering ? "Register" : "Login"}
        </h2>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />

                <label
                  htmlFor="position"
                  className="block text-sm font-medium text-gray-700 mt-4"
                >
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </>
          )}

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          {isRegistering
            ? "Already have an account?"
            : "Don't have an account?"}
          <button
            className="text-blue-500 ml-2"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
