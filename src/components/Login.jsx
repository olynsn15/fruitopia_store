import React, { useState } from "react";
import supabase from "../utils/supabase";
import { useAuth } from "../hooks/useAuthHook";

const Login = ({ onClose, switchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validasi field kosong atau hanya spasi
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    if (!password.trim()) {
      setError("Password is required.");
      return;
    }

    setLoading(true);

    try {
      // Supabase Login
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const sessionUser = data.user;

      // Basic immediate user data
      const userData = {
        uid: sessionUser.id,
        email: sessionUser.email,
        name: sessionUser.user_metadata.fullName || email.split("@")[0],
      };

      console.log("USER METADATA:", sessionUser.user_metadata);

      setUser(userData);
      onClose();
    } catch (err) {
      setError(err.message || "Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl">
        <h2 className="text-2xl font-bold text-[#007E6E] text-center mb-2 tracking-wide">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6 tracking-wide">
          Sign in to your account
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-200 rounded-md"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-3 py-2 border border-gray-200 rounded-md"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#007E6E] text-white rounded-md font-semibold tracking-wide"
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have an account?{" "}
          <button
            onClick={switchToRegister}
            className="text-[#007E6E] font-medium underline"
            disabled={loading}
          >
            Sign up here
          </button>
        </p>

        <button
          onClick={onClose}
          disabled={loading}
          className="mt-4 w-full py-2 bg-gray-100 text-gray-700 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Login;
