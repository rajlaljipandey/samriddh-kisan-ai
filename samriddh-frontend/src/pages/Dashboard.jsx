import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [history, setHistory] = useState([]);
  const [totalPredictions, setTotalPredictions] = useState(0);
  const [displayCount, setDisplayCount] = useState(0);
  const [lastDisease, setLastDisease] = useState("—");
  const [lastConfidence, setLastConfidence] = useState(null);
  const [chartData, setChartData] = useState([]);

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  // FETCH HISTORY
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(
          "https://samriddh-kisan-ai.onrender.com/prediction/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (response.ok) {
          const records = data.history || data;

          const sorted = records.sort(
            (a, b) =>
              new Date(b.created_at) -
              new Date(a.created_at)
          );

          setHistory(sorted);
          setTotalPredictions(sorted.length);

          if (sorted.length > 0) {
            setLastDisease(sorted[0].disease);
            setLastConfidence(sorted[0].confidence);
          }

          // GROUP BY DATE
          const grouped = {};

          sorted.forEach((item) => {
            const date = new Date(
              item.created_at
            ).toLocaleDateString();
            grouped[date] =
              (grouped[date] || 0) + 1;
          });

          const chartArray = Object.keys(grouped).map(
            (key) => ({
              date: key,
              count: grouped[key],
            })
          );

          setChartData(chartArray);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchHistory();
  }, []);

  // ANIMATED COUNTER
  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      if (start >= totalPredictions) {
        start = totalPredictions;
        clearInterval(interval);
      }
      setDisplayCount(start);
    }, 40);

    return () => clearInterval(interval);
  }, [totalPredictions]);

  const menuItem = (label, path) => (
    <li
      onClick={() => {
        navigate(path);
        setMenuOpen(false);
      }}
      className={`p-3 rounded-lg cursor-pointer transition ${
        location.pathname === path
          ? "bg-white text-green-900 font-semibold"
          : "hover:bg-green-700"
      }`}
    >
      {label}
    </li>
  );

  return (
    <div className="min-h-screen flex bg-green-50">

      {/* MOBILE OVERLAY */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed md:static z-50 top-0 left-0 h-full w-64 bg-gradient-to-b from-green-900 to-green-700 text-green-100 p-6 transform transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <h2 className="text-3xl font-extrabold mb-10 tracking-wide">
          🌾 Samriddh AI
        </h2>

        <ul className="space-y-3 text-sm">
          {menuItem("Dashboard", "/dashboard")}
          {menuItem("Predict Disease", "/predict")}
          {menuItem("History", "/history")}
        </ul>
      </div>

      {/* MAIN */}
      <div className="flex-1 flex flex-col w-full">

        {/* TOPBAR */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center">

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-2xl text-green-800"
            onClick={() => setMenuOpen(true)}
          >
            ☰
          </button>

          <h1 className="text-lg md:text-2xl font-bold text-green-800">
            Dashboard Overview
          </h1>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() =>
                setProfileOpen(!profileOpen)
              }
              className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
            >
              👤 Profile
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg p-2 text-sm z-50">
                <button
                  onClick={() => {
                    alert(
                      "🔐 Change Password service is not available right now.\n\nIt will be available soon 🚀"
                    );
                    setProfileOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 hover:bg-green-100 rounded"
                >
                  Change Password
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 hover:bg-red-100 text-red-600 rounded"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6 md:p-10 space-y-8">

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-700">
              <h3 className="text-gray-500 text-sm">
                Total Predictions
              </h3>
              <p className="text-4xl font-bold text-green-800 mt-2">
                {displayCount}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-emerald-600">
              <h3 className="text-gray-500 text-sm">
                Last Detected Disease
              </h3>
              <p className="text-lg font-semibold text-green-900 mt-2">
                {lastDisease}
              </p>
              {lastConfidence && (
                <p className="text-sm text-gray-500 mt-1">
                  Confidence: {lastConfidence}%
                </p>
              )}
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500">
              <h3 className="text-gray-500 text-sm">
                System Status
              </h3>
              <p className="text-green-700 font-semibold mt-2">
                🟢 Online
              </p>
            </div>

          </div>

          {/* CHART */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-bold text-green-800 mb-4">
              Predictions Trend
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#15803d"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;