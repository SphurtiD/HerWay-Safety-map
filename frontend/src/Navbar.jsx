import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const linkStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? "#6b5cff" : "#333",
    fontWeight: location.pathname === path ? "600" : "400"
  });

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "15px 30px",
        borderBottom: "1px solid #eee",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}
    >
      <h2 style={{ color: "#6b5cff" }}>HerWay</h2>

      <div style={{ display: "flex", gap: 20 }}>
        <Link to="/" style={linkStyle("/")}>Home</Link>
        <Link to="/submit" style={linkStyle("/submit")}>Submit</Link>
        <Link to="/map" style={linkStyle("/map")}>Map</Link>
      </div>
    </nav>
  );
}

export default Navbar;
