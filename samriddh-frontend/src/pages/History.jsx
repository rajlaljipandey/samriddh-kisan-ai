import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      sessionStorage.getItem("token")
    );
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    let filtered = history;

    if (search) {
      filtered = filtered.filter((item) =>
        item.disease?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (severityFilter !== "all") {
      filtered = filtered.filter(
        (item) =>
          item.severity &&
          item.severity.toLowerCase() === severityFilter
      );
    }

    setFilteredHistory(filtered);
  }, [search, severityFilter, history]);

  const fetchHistory = async () => {
    const token = getToken();

    if (!token) {
      navigate("/");
      return;
    }

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
        const sorted = (data.history || []).sort(
          (a, b) =>
            new Date(b.created_at) -
            new Date(a.created_at)
        );
        setHistory(sorted);
      } else if (response.status === 401) {
        navigate("/");
      } else {
        setError(data.detail || "Failed to load history");
      }
    } catch {
      setError("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearch("");
    setSeverityFilter("all");
  };

  const getSeverityColor = (severity) => {
    if (!severity) return "bg-gray-400";
    if (severity.toLowerCase().includes("severe"))
      return "bg-red-600";
    if (severity.toLowerCase().includes("moderate"))
      return "bg-yellow-500";
    return "bg-green-600";
  };

  const severeCount = history.filter(
    (h) => h.severity?.toLowerCase() === "severe"
  ).length;
  const moderateCount = history.filter(
    (h) => h.severity?.toLowerCase() === "moderate"
  ).length;
  const mildCount = history.filter(
    (h) => h.severity?.toLowerCase() === "mild"
  ).length;

  return (
    <div className="min-h-screen bg-green-50">

      {/* HERO */}
      <div className="bg-gradient-to-r from-green-900 to-green-700 text-white p-8 shadow-xl">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 opacity-80 hover:opacity-100"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl md:text-4xl font-bold">
          📜 Prediction History
        </h1>

        <p className="mt-2 opacity-90 text-sm">
          Track and analyze your previous crop disease detections.
        </p>
      </div>

      <div className="max-w-6xl mx-auto p-6 md:p-10 space-y-8">

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Total" value={history.length} color="bg-green-700" />
          <StatCard title="Severe" value={severeCount} color="bg-red-600" />
          <StatCard title="Moderate" value={moderateCount} color="bg-yellow-500" />
          <StatCard title="Mild" value={mildCount} color="bg-green-600" />
        </div>

        {/* FILTER */}
        <div className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg border border-green-100 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search by disease..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-green-600"
          />

          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-green-600"
          >
            <option value="all">All Severities</option>
            <option value="severe">Severe</option>
            <option value="moderate">Moderate</option>
            <option value="mild">Mild</option>
          </select>

          <button
            onClick={clearFilters}
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
          >
            Clear
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex justify-center">
            <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="text-center text-red-600 font-semibold">
            {error}
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredHistory.length === 0 && (
          <div className="text-center bg-white p-10 rounded-2xl shadow-lg">
            <h3 className="text-lg font-semibold text-green-800">
              No Predictions Found 🌱
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Try changing filters or make a new prediction.
            </p>
          </div>
        )}

        {/* CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHistory.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-green-800">
                  {item.disease}
                </h3>

                {item.severity && (
                  <span
                    className={`text-white px-3 py-1 rounded-full text-xs ${getSeverityColor(
                      item.severity
                    )}`}
                  >
                    {item.severity}
                  </span>
                )}
              </div>

              <p className="text-sm text-gray-500 mt-2">
                {new Date(item.created_at).toLocaleString()}
              </p>

              <div className="mt-4">
                <p className="text-sm font-semibold">
                  Confidence: {item.confidence}%
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.confidence}%` }}
                  ></div>
                </div>
              </div>

              <button
                onClick={() => setSelectedItem(item)}
                className="mt-4 text-green-700 font-semibold hover:underline"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full relative">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-green-800">
              {selectedItem.disease}
            </h3>

            <p className="mt-4 text-sm">
              Confidence: {selectedItem.confidence}%
            </p>

            <p className="mt-2 text-sm">
              Severity: {selectedItem.severity || "N/A"}
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Date:{" "}
              {new Date(
                selectedItem.created_at
              ).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className={`text-white p-4 rounded-xl shadow-lg ${color}`}>
      <h4 className="text-sm">{title}</h4>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default History;