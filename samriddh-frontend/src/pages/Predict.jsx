import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Predict() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (file) => {
    if (file) {
      setImage(file);
      setFileName(file.name);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  };

  const handlePredict = async () => {
    if (!image) {
      setError("Please upload an image first 🌿");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch(
        "https://samriddh-kisan-ai.onrender.com/prediction/predict",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("token") ||
              sessionStorage.getItem("token")
            }`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok && data.result) {
        setResult(data.result);
      } else {
        setError(data.detail || "Prediction failed");
      }
    } catch {
      setError("Server Error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    setFileName("");
    setResult(null);
  };

  const downloadReport = () => {
    const content = `
Disease: ${result.disease}
Confidence: ${result.confidence}%
Severity: ${result.severity}

Description: ${result.advisory?.description}
Treatment: ${result.advisory?.treatment}
Prevention: ${result.advisory?.prevention}
    `;

    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "prediction_report.txt";
    link.click();
  };

  const copyAdvisory = () => {
    navigator.clipboard.writeText(
      `${result.advisory?.description}\n${result.advisory?.treatment}\n${result.advisory?.prevention}`
    );
    alert("Advisory copied to clipboard 🌿");
  };

  const getSeverityStyle = (severity) => {
    if (!severity) return "bg-gray-400";
    if (severity.toLowerCase().includes("severe"))
      return "bg-red-600";
    if (severity.toLowerCase().includes("moderate"))
      return "bg-yellow-500";
    return "bg-green-600";
  };

  return (
    <div className="min-h-screen bg-green-50">

      {/* HERO */}
      <div className="bg-gradient-to-r from-green-900 to-emerald-800 text-white p-10 shadow-xl">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-4 opacity-80 hover:opacity-100"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold">
          🌿 AI Crop Disease Analyzer
        </h1>

        <p className="mt-3 opacity-90">
          Upload a crop image and let AI detect diseases instantly.
        </p>
      </div>

      <div className="max-w-4xl mx-auto p-8">

        {/* UPLOAD CARD */}
        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-green-100">

          <div
            onClick={() => fileInputRef.current.click()}
            className="border-2 border-dashed border-green-500 p-10 rounded-2xl text-center cursor-pointer hover:bg-green-50 transition"
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="mx-auto w-72 rounded-xl shadow"
              />
            ) : (
              <p className="text-green-800 font-semibold">
                Click to Upload or Drag & Drop
              </p>
            )}
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e.target.files[0])}
          />

          {fileName && (
            <div className="flex justify-between mt-4 text-sm">
              <span>{fileName}</span>
              <button
                onClick={removeImage}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          )}

          <button
            onClick={handlePredict}
            disabled={loading}
            className="mt-6 w-full bg-green-800 text-white py-3 rounded-xl font-semibold hover:bg-green-900 transition disabled:opacity-50"
          >
            {loading ? "Analyzing with AI..." : "Predict Disease"}
          </button>

          {loading && (
            <div className="mt-4 text-center text-green-700 animate-pulse">
              🔍 AI Processing Image...
            </div>
          )}

          {error && (
            <div className="mt-4 text-center text-red-600 font-semibold">
              {error}
            </div>
          )}

        </div>

        {/* RESULT */}
        {result && (
          <div className="mt-10 bg-white p-10 rounded-3xl shadow-2xl border border-green-100">

            <h2 className="text-3xl font-bold text-green-900">
              {result.disease}
            </h2>

            {/* RADIAL CONFIDENCE */}
            <div className="mt-8 w-40 mx-auto">
              <CircularProgressbar
                value={result.confidence}
                text={`${result.confidence}%`}
                styles={buildStyles({
                  pathColor: "#15803d",
                  textColor: "#065f46",
                })}
              />
            </div>

            {/* SEVERITY */}
            {result.severity && (
              <div className="text-center mt-6">
                <span
                  className={`text-white px-5 py-2 rounded-full text-sm ${getSeverityStyle(
                    result.severity
                  )}`}
                >
                  {result.severity}
                </span>
              </div>
            )}

            {/* ADVISORY */}
            {result.advisory && (
              <div className="mt-8 grid md:grid-cols-3 gap-6 text-sm">

                <div className="bg-green-50 p-4 rounded-xl">
                  <h4 className="font-bold mb-2 text-green-800">
                    Description
                  </h4>
                  <p>{result.advisory.description}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <h4 className="font-bold mb-2 text-green-800">
                    Treatment
                  </h4>
                  <p>{result.advisory.treatment}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-xl">
                  <h4 className="font-bold mb-2 text-green-800">
                    Prevention
                  </h4>
                  <p>{result.advisory.prevention}</p>
                </div>

              </div>
            )}

            {/* ACTION BUTTONS */}
            <div className="flex justify-center gap-4 mt-8 flex-wrap">

              <button
                onClick={downloadReport}
                className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition"
              >
                Download Report
              </button>

              <button
                onClick={copyAdvisory}
                className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                Copy Advisory
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Predict;