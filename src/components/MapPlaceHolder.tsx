import { useEffect, useRef } from "react";
import { Map, NavigationControl, setWorkerUrl } from "maplibre-gl";
import maplibreWorker from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import "maplibre-gl/dist/maplibre-gl.css";
import "./MapPlaceHolder.css";

setWorkerUrl(maplibreWorker);

function MapPlaceHolder() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  const API_KEY = import.meta.env.VITE_MAPTILER_API_KEY;

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v4/style.json?key=${API_KEY}`,
      center: [0, 20],
      zoom: 1.5,
    });

    map.current.addControl(new NavigationControl(), "top-right");

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [API_KEY]);

  return <div ref={mapContainer} className="map-container"></div>;
}

export default MapPlaceHolder;
