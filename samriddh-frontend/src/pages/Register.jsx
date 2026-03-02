import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const getPasswordStrength = () => {
    if (password.length < 6) return "Weak";
    if (password.length < 10) return "Medium";
    return "Strong";
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match ❌");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://samriddh-kisan-ai.onrender.com/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration Successful 🎉 Redirecting...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError(data.detail || "Registration Failed ❌");
      }
    } catch {
      setError("Server Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE BRANDING */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-gradient-to-br from-green-900 to-emerald-800 text-green-100 p-12">

        <h1 className="text-5xl font-extrabold mb-6 glow-text tracking-wide text-center">
          🌾 Samriddh Kisan AI
        </h1>

        <p className="text-lg text-center max-w-md leading-relaxed text-green-200">
          Join smart farming revolution with AI-powered crop disease detection.
        </p>

      </div>

      {/* RIGHT SIDE FORM */}
      <div className="flex flex-1 items-center justify-center bg-green-50 p-6">

        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-green-100"
        >
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Create Account 🌱
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg text-sm">
              {success}
            </div>
          )}

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* PASSWORD */}
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded-lg border focus:ring-2 focus:ring-green-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 cursor-pointer text-sm text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          {/* PASSWORD STRENGTH */}
          {password && (
            <p
              className={`text-sm mb-3 ${
                getPasswordStrength() === "Weak"
                  ? "text-red-500"
                  : getPasswordStrength() === "Medium"
                  ? "text-yellow-500"
                  : "text-green-600"
              }`}
            >
              Strength: {getPasswordStrength()}
            </p>
          )}

          {/* CONFIRM PASSWORD */}
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white p-3 rounded-lg hover:bg-green-800 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>

          <p className="text-center mt-6 text-sm text-gray-700">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-green-800 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;