import { Routes, Route } from "react-router-dom";
import SubmitPage from "./SubmitPage";
import MapPage from "./MapPage";
import HomePage from "./HomePage";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/submit" element={<SubmitPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </>
  );
}

export default App;