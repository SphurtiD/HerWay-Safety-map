import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

function MapPage() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [heatData, setHeatData] = useState([]);

  // 🔹 Fetch aggregated heat data
  useEffect(() => {
    fetch("http://127.0.0.1:8000/heatmap-data")
      .then(res => res.json())
      .then(data => {
        console.log("HEAT DATA:", data);
        setHeatData(data);
      });
  }, []);

  // 🔹 Create map
  useEffect(() => {
    if (map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: "https://tiles.openfreemap.org/styles/bright",
      center: [78.9629, 20.5937],
      zoom: 4,
      maxBounds: [
        [68, 6],
        [97, 37]
      ]
    });
  }, []);

  // 🔹 Add / update heat layer
  useEffect(() => {
    if (!map.current || heatData.length === 0) return;

    const geoData = {
      type: "FeatureCollection",
      features: heatData.map(item => ({
        type: "Feature",
        properties: {
          intensity: item.average_score,
          count: item.count
        },
        geometry: {
          type: "Point",
          coordinates: [item.longitude, item.latitude]
        }
      }))
    };

    if (map.current.getSource("heat")) {
      map.current.getSource("heat").setData(geoData);
      return;
    }

    map.current.on("load", () => {
      const addLayers = () => {
  if (map.current.getSource("heat")) return;

  map.current.addSource("heat", {
    type: "geojson",
    data: geoData
  });

  // Heat glow
  map.current.addLayer({
    id: "heat",
    type: "heatmap",
    source: "heat",
    paint: {
      "heatmap-weight": ["get", "intensity"],
      "heatmap-intensity": 1,
      "heatmap-radius": 45,
      "heatmap-opacity": 0.6
    }
  });

  // ⭐ Colored circles
  map.current.addLayer({
    id: "points",
    type: "circle",
    source: "heat",
    paint: {
      "circle-radius": 8,
      "circle-color": [
        "interpolate",
        ["linear"],
        ["get", "intensity"],
        1, "#ff0000",
        2.5, "#ff9900",
        3.5, "#ffff00",
        5, "#00cc44"
      ],
      "circle-stroke-width": 1,
      "circle-stroke-color": "#222"
    }
  });

  const popup = new maplibregl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.current.on("mousemove", "points", (e) => {
    const feature = e.features?.[0];
    if (!feature) return;

    const avg = Number(feature.properties.intensity).toFixed(2);
    const count = feature.properties.count;

    popup
      .setLngLat(feature.geometry.coordinates)
      .setHTML(`⭐ Avg safety: ${avg}<br/>📊 Reports: ${count}`)
      .addTo(map.current);
  });

  map.current.on("mouseleave", "points", () => popup.remove());
};

// ⭐ Handle both cases (before/after load)
if (map.current.isStyleLoaded()) addLayers();
else map.current.once("load", addLayers);
    });

  }, [heatData]);

  return (
    <div
      ref={mapContainer}
      style={{ width: "100%", height: "90vh" }}
    />
  );
}

export default MapPage;