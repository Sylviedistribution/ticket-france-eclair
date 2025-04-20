
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  address: string;
  className?: string;
}

const Map = ({ address, className = "h-[400px]" }: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    // Dans une implémentation réelle, vous devriez obtenir le token depuis Supabase
    const token = prompt("Veuillez entrer votre token Mapbox public pour afficher la carte:");
    if (token) {
      setMapboxToken(token);
    }
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken) return;

    // Initialize map
    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [15.2832, -4.2692], // Coordonnées par défaut (Brazzaville)
      zoom: 12
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Dans une implémentation réelle, vous devriez utiliser l'API Geocoding de Mapbox
    // pour convertir l'adresse en coordonnées
    
    // Exemple de marqueur
    new mapboxgl.Marker()
      .setLngLat([15.2832, -4.2692])
      .addTo(map.current);

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken]);

  if (!mapboxToken) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 rounded-lg`}>
        <p className="text-gray-500">Veuillez entrer un token Mapbox pour afficher la carte</p>
      </div>
    );
  }

  return (
    <div className={`${className} relative rounded-lg overflow-hidden`}>
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default Map;
