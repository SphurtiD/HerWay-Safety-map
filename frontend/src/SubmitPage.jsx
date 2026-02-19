import { useState, useEffect } from "react";

function SubmitPage() {
  const [formData, setFormData] = useState({
    city: "",
    q1: 1,
    q2: 1,
    q3: 1,
    q4: 1,
    q5: 1,
    comment: "",
    latitude: null,
    longitude: null,
  });

  const [gpsLoading, setGpsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData((prev) => ({
          ...prev,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }));
        setGpsLoading(false);
      },
      () => setGpsLoading(false)
    );
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.latitude === null) {
      alert("Waiting for GPS…");
      return;
    }

    try {
      await fetch("http://127.0.0.1:8000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          q1: Number(formData.q1),
          q2: Number(formData.q2),
          q3: Number(formData.q3),
          q4: Number(formData.q4),
          q5: Number(formData.q5),
        }),
      });

      alert("Submission saved successfully!");
    } catch {
      alert("Something went wrong.");
    }
  };

  const questions = [
    "How safe did you feel in this area?",
    "Was the area well lit?",
    "Did you feel comfortable walking alone?",
    "How crowded/public was the area?",
    "Would you recommend this area to other women?"
  ];

  return (
    <div style={{ padding: 30, maxWidth: 700, margin: "auto" }}>
      <h2 style={{ marginBottom: 10 }}>Share Safety Experience</h2>

      <p style={{ color: "#666", marginBottom: 20 }}>
        Rate each aspect from <b>1 (Unsafe)</b> to <b>5 (Very Safe)</b>.
      </p>

      <div
        style={{
          background: "#fff",
          padding: 25,
          borderRadius: 12,
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)"
        }}
      >
        {gpsLoading ? (
          <p>Getting your location…</p>
        ) : (
          <p style={{ fontSize: 13, color: "#666" }}>
            📍 Lat: {formData.latitude?.toFixed(4)} | Lng:{" "}
            {formData.longitude?.toFixed(4)}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label>City (optional)</label>
            <input
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={{ width: "100%", padding: 10, marginTop: 5 }}
            />
          </div>

          {questions.map((q, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <label>{q}</label>
              <select
                name={`q${i + 1}`}
                value={formData[`q${i + 1}`]}
                onChange={handleChange}
                style={{ width: "100%", padding: 10, marginTop: 5 }}
              >
                {[1, 2, 3, 4, 5].map(v => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div style={{ marginBottom: 20 }}>
            <label>Additional comments</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              style={{ width: "100%", padding: 10, marginTop: 5 }}
            />
          </div>

          <button
            style={{
              padding: "12px 20px",
              background: "#6b5cff",
              color: "white",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              width: "100%"
            }}
          >
            Submit Experience
          </button>
        </form>
      </div>
    </div>
  );
}

export default SubmitPage;
