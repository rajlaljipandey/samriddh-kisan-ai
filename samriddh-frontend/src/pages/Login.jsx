import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new URLSearchParams();
    formData.append("username", email);
    formData.append("password", password);

    try {
      const response = await fetch(
        "https://samriddh-kisan-ai.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        remember
          ? localStorage.setItem("token", data.access_token)
          : sessionStorage.setItem("token", data.access_token);

        navigate("/dashboard");
      } else {
        setError(data.detail || "Invalid credentials");
      }
    } catch {
      setError("Server Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 flex-col justify-center items-center bg-gradient-to-br from-green-900 to-emerald-800 text-green-100 p-12">

        <h1 className="text-5xl font-extrabold mb-6 glow-text tracking-wide text-center">
          🌾 Samriddh Kisan AI
        </h1>

        <p className="text-lg text-center max-w-md leading-relaxed text-green-200">
          Detect crop diseases instantly using AI-powered image analysis.
          Smart farming made simple and intelligent.
        </p>

      </div>

      {/* RIGHT SIDE LOGIN */}
      <div className="flex flex-1 items-center justify-center bg-green-50 p-6">

        <form
          onSubmit={handleLogin}
          className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-green-100"
        >
          <h2 className="text-2xl font-bold text-green-800 mb-6 text-center">
            Welcome Back 👋
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 rounded-lg border mb-4 focus:ring-2 focus:ring-green-500 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Password */}
          <div className="relative mb-4">
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

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="accent-green-600"
              />
              Remember me
            </label>

            <button
              type="button"
              className="text-green-700 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-700 text-white p-3 rounded-lg hover:bg-green-800 transition duration-300 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <p className="text-center mt-6 text-sm text-gray-700">
            New user?{" "}
            <Link
              to="/register"
              className="text-green-800 font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;