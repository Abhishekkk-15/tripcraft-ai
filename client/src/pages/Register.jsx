import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import "../styles/auth.css";
import toast from "react-hot-toast";

import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);
      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthLayout
      description="Turn your travel bookings into smart AI-powered itineraries."
      features={[
        "✈ Upload travel documents",
        "🤖 AI itinerary generation",
        "📍 Smart trip planning",
      ]}
    >
      <AuthCard
        title="Create Account"
        subtitle="Start planning smarter trips today"
      >
        <form onSubmit={handleSubmit}>
          <AuthInput
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />

          <AuthInput
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
          />

          <AuthInput
            type="password"
            name="password"
            placeholder="Create Password"
            value={form.password}
            onChange={handleChange}
          />

          <AuthButton>Create Account</AuthButton>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </AuthCard>
    </AuthLayout>
  );
};

export default Register;