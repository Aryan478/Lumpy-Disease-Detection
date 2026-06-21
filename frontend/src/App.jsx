import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setResult(null); 
    }
  };

  const handlePredict = async () => {
    if (!file) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post("/predict", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
      if (error.response) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const renderPillGauge = (confidenceScore) => {
    const score = parseFloat(confidenceScore) || 0;
    const totalPills = 10;
    const filledPills = Math.round((score / 100) * totalPills);

    return (
      <div className="pill-gauge-container">
        {[...Array(totalPills)].map((_, i) => (
          <div 
            key={i} 
            className={`gauge-segment ${i < filledPills ? "filled" : ""}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="canvas-wrapper">
      <div className="ambient-glow glow-1"></div>
      <div className="ambient-glow glow-2"></div>
      <div className="ambient-glow glow-3"></div>

      <div className="diagnostic-card">
        
        <div className="status-top-bar">
          <div className="telemetry-status">
            <span className="pulse-dot"></span>
            SYSTEM DIAGNOSTICS READY
          </div>
          <div className="badge-verifiable">Verifiable Target</div>
        </div>

        <div className="header-main-title">
          <h1 className="brand-heading">
            Lumpy Skin Disease Diagnostics <span className="icon-stethoscope">🩺</span>
          </h1>
          <p className="brand-subheading">Structural Lesion Analysis & Pathology Report</p>
        </div>

        <div className="workspace-grid">
          
          {/* Left Column: Image Area */}
          <div className="grid-col-left">
            <input
              type="file"
              id="file-catcher"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
            <label htmlFor="file-catcher" className="uploader-surface">
              {previewUrl ? (
                <div className="image-frame">
                  <img src={previewUrl} alt="Cattle pathology target" />
                  <div className="image-hover-action">
                    <span>Replace Sample Image</span>
                  </div>
                </div>
              ) : (
                <div className="dropzone-empty">
                  <span className="icon-cloud">📂</span>
                  <span className="upload-main-text">Upload Live Image Sample</span>
                  <span className="upload-sub-text">Click to browse your device files</span>
                </div>
              )}
            </label>
          </div>

          {/* Right Column: Analytics Metrics Output */}
          <div className="grid-col-right">
            {result ? (
              <div className="metric-log-card animate-pop-in">
                <div className="glowing-radial-accent"></div>
                
                <div className="metric-row">
                  <span className="label-meta">CLASSIFIED PATHOLOGY</span>
                  <h2 className="pathology-output-title">{result.prediction}</h2>
                </div>

                <div className="metric-row">
                  <div className="confidence-numeric-row">
                    <span className="label-meta">CONFIDENCE ACCURACY</span>
                    <span className="percentage-number">{result.confidence}%</span>
                  </div>
                  {renderPillGauge(result.confidence)}
                </div>
              </div>
            ) : (
              <div className="empty-log-card">
                <span className="dna-icon">🧬</span>
                <p>Awaiting structural target scan inputs. Import a sample photo to run diagnostic matrix calculations.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Row: Full Width Dark Theme Button */}
        <div className="action-row-footer">
          <button
            onClick={handlePredict}
            disabled={loading || !file}
            className={`btn-fullwidth-scan ${loading ? "is-running" : ""}`}
          >
            {loading ? (
              <div className="loader-box">
                <span className="loader-spinner"></span>
                <span>Sequencing Target...</span>
              </div>
            ) : (
              <>
                <span className="btn-icon-prefix">🔬</span>
                <span>Initialize Diagnostic Scan</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

export default App;