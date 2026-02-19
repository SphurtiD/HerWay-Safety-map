import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{ fontFamily: "sans-serif" }}>

      {/* ⭐ Hero Section */}
      <div
        style={{
          minHeight: "90vh",
          width: "100%",
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/women.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px",
          color: "white"
        }}
      >
        {/* ⭐ Content Box */}
        <div style={{ maxWidth: 800 }}>

          <h1 style={{ fontSize: "42px", marginBottom: 20 }}>
            Safer travel for women, powered by real experiences.
          </h1>

          <p style={{ color: "#eee", marginBottom: 40 }}>
            HerWay helps women share safety experiences, discover safer areas,
            and make confident travel decisions using community-driven insights.
          </p>

          <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
            
            <Link to="/submit">
              <button
                style={{
                  padding: "12px 22px",
                  background: "#6b5cff",
                  color: "white",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 16
                }}
              >
                Share Experience
              </button>
            </Link>

            <Link to="/map">
              <button
                style={{
                  padding: "12px 22px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  background: "white",
                  cursor: "pointer",
                  fontSize: 16
                }}
              >
                View Safety Map
              </button>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
