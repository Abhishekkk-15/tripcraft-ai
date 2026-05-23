import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import "../styles/dashboard.css";
import toast from "react-hot-toast";

import DashboardHero from "../components/dashboard/DashboardHero";
import StatsGrid from "../components/dashboard/StatsGrid";
import UploadSection from "../components/dashboard/UploadSection";
import LoadingSection from "../components/dashboard/LoadingSection";
import ResultSection from "../components/dashboard/ResultSection";
import HistorySection from "../components/dashboard/HistorySection";
import LogoutModal from "../components/dashboard/LogoutModal";

import { validateTravelFile } from "../utils/filevalidation";
import { downloadPDF } from "../utils/pdfHelper";
import { shareWhatsApp } from "../utils/shareHelper";

const Dashboard = () => {
  const [file, setFile] = useState(null);
  const [itinerary, setItinerary] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [fileError, setFileError] = useState("");

  const navigate = useNavigate();
  const { logout, user } = useContext(AuthContext);

  const loggedInUser = user ||
    JSON.parse(localStorage.getItem("user")) || { name: "Traveler" };

  const fetchHistory = async () => {
    try {
      const res = await API.get("/upload/history");
      setHistory(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleValidFile = (selectedFile) => {
    if (!selectedFile) return;

    if (!validateTravelFile(selectedFile)) {
      setFile(null);
      setFileError("Only PDF, JPG, JPEG and PNG files are allowed.");
      toast.error("Invalid file type");
      return;
    }

    setFile(selectedFile);
    setFileError("");
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    handleValidFile(selectedFile);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleValidFile(droppedFile);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      setFileError(
        "Please select a travel document before generating itinerary.",
      );
      toast.error("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("document", file);

    try {
      setLoading(true);

      const res = await API.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setItinerary(res.data.data.itinerary);
      fetchHistory();
      toast.success("Itinerary generated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const copyItinerary = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Itinerary copied!");
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <DashboardHero
          loggedInUser={loggedInUser}
          loading={loading}
          onLogoutClick={() => setShowLogoutModal(true)}
        />

        <StatsGrid totalItineraries={history.length} />

        <UploadSection
          file={file}
          fileError={fileError}
          loading={loading}
          onUpload={handleUpload}
          onFileSelect={handleFileSelect}
          onFileDrop={handleFileDrop}
        />

        {loading && <LoadingSection />}

        {itinerary && (
          <ResultSection
            itinerary={itinerary}
            loading={loading}
            onCopy={copyItinerary}
            onShare={shareWhatsApp}
            onDownload={downloadPDF}
          />
        )}

        <HistorySection
          history={history}
          loading={loading}
          onCopy={copyItinerary}
          onShare={shareWhatsApp}
          onDownload={downloadPDF}
        />
      </div>

      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
};

export default Dashboard;