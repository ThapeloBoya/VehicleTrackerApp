import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, Polyline, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import VehicleList from './components/VehicleList';
import VehicleFilter from './components/VehicleFilter';
import './App.css';

// Custom Marker Icon
const vehicleIcon = new L.Icon({
  iconUrl: '/marker-icon.PNG',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const App = () => {
  
  const [vehicles, setVehicles] = useState([]);
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // Error state for error handling
  const [historicalRoutes, setHistoricalRoutes] = useState({}); // Store routes for each vehicle
  const mapRef = useRef();

  // Fetch vehicle data from API
  const fetchVehicleData = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const response = await axios.get('http://localhost:5000/vehicles');
      const fetchedVehicles = response.data;

      console.log('Fetched Vehicles:', fetchedVehicles);  // Log the response for debugging

      // Ensure that each vehicle has unique coordinates
      const updatedVehicles = fetchedVehicles.map((vehicle) => {
        // Default to New York coordinates if latitude/longitude is missing (for debugging purposes)
        if (!vehicle.latitude || !vehicle.longitude) {
          vehicle.latitude = 40.7128; // Default to New York
          vehicle.longitude = -74.0060; // Default to New York
        }
        return vehicle;
      });

      console.log('Updated Vehicles:', updatedVehicles);  // Log the updated vehicles to check

      setVehicles(updatedVehicles);
      setFilteredVehicles(updatedVehicles); // Initially, display all vehicles
    } catch (error) {
      setError('Error fetching vehicle data. Please refresh page.');
    } finally {
      setLoading(false);
    }
  };

  const fetchHistoricalRoute = async (vehicleId) => {
    try {
      // Fetch the current vehicle data from the vehicles array
      const vehicle = vehicles.find(v => v.id === vehicleId);
  
      if (!vehicle) {
        console.error(`Vehicle with id ${vehicleId} not found`);
        return;
      }
  
      const currentLatitude = vehicle.latitude;
      const currentLongitude = vehicle.longitude;
  
      // Clear existing map layers (markers, polylines, etc.)
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.Polyline || layer instanceof L.Marker) {
          mapRef.current.removeLayer(layer);
        }
      });
  
      // Fetch the historical route data from the backend
      const response = await axios.get(`http://localhost:5000/vehicles/${vehicleId}/route`);
      const routeData = response.data.route;
  
      console.log('Historical Route Data:', routeData);  // Log the route data for debugging
  
      if (Array.isArray(routeData) && routeData.every(point => point.coordinates && point.coordinates.length === 2)) {
        // Format the route data into LatLng pairs
        const formattedRoute = routeData.map(point => ({
          latitude: point.coordinates[0],
          longitude: point.coordinates[1],
        }));
  
        // Add the current vehicle's location to the route
        formattedRoute.push({
          latitude: currentLatitude,
          longitude: currentLongitude,
        });
  
        // Draw the route on the map
        const latLngs = formattedRoute.map(point => [point.latitude, point.longitude]);
        const polyline = L.polyline(latLngs, { color: 'blue' }).addTo(mapRef.current);
  
        // Add a marker for the current vehicle location
        const marker = L.marker([currentLatitude, currentLongitude]).addTo(mapRef.current);
  
        // Optionally fit the map view to the route
        mapRef.current.fitBounds(polyline.getBounds());
  
        // Update the state with the current route for the selected vehicle
        setHistoricalRoutes(formattedRoute);
      } else {
        console.error(`Invalid route data for vehicle ${vehicleId}`);
      }
    } catch (error) {
      console.error(`Error fetching historical route for ${vehicleId}:`, error);
    }
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    fetchVehicleData();
    const interval = setInterval(() => {
      fetchVehicleData();
    }, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Handle vehicle click on the map
  const handleVehicleClick = (vehicle) => {
    if (vehicle.latitude && vehicle.longitude) {
      mapRef.current.flyTo([vehicle.latitude, vehicle.longitude], 16);
      fetchHistoricalRoute(vehicle.id); // Fetch historical route for clicked vehicle
    } else {
      console.error(`Invalid coordinates for vehicle ${vehicle.id}`);
    }
  };

  // Fit the map bounds to the route
  useEffect(() => {
    if (Object.keys(historicalRoutes).length > 0) {
      const vehicleId = Object.keys(historicalRoutes)[0]; // Get the first vehicle's route
      const route = historicalRoutes[vehicleId];
      if (route && route.length > 0) {
        const bounds = new L.LatLngBounds(route.map((point) => [point.latitude, point.longitude]));
        mapRef.current.fitBounds(bounds); // Fit the map to the polyline bounds
      }
    }
  }, [historicalRoutes]);

  return (
    <>
<div className="header">
  <img src="/logo.PNG" className="logo" alt="Logo" />
  <h1 className="title-heading">Vehicle Tracking Dashboard</h1>
</div>

     <div className="dashboard-container">
    
    <div className="vehicle-list">
      <h2>Vehicles</h2>
      <VehicleFilter vehicles={vehicles} setFilteredVehicles={setFilteredVehicles} />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <VehicleList vehicles={filteredVehicles} onVehicleClick={handleVehicleClick} />
      )}
    </div>
    <div className="map-container">
      <MapContainer
        center={[51.505, -0.09]} // Default center of the map
        zoom={13}
        style={{ height: '100%' }}
        ref={mapRef}
        zoomControl={false} // Disable default zoom controls
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <ZoomControl position="topright" />
        {filteredVehicles.map((vehicle) =>
          vehicle.latitude && vehicle.longitude ? (
            <Marker
              key={vehicle.id}
              position={[vehicle.latitude, vehicle.longitude]}
              icon={vehicleIcon}
              eventHandlers={{
                click: () => handleVehicleClick(vehicle),
              }}
            >
              <Popup>
                {`Vehicle ID: ${vehicle.id}, Last Location: (${vehicle.latitude}, ${vehicle.longitude})`}
              </Popup>
            </Marker>
          ) : null
        )}
        {Object.keys(historicalRoutes).map((vehicleId) => {
          const route = historicalRoutes[vehicleId];
          if (route && route.length > 0) {
            console.log(`Rendering polyline for vehicle ${vehicleId}:`, route); // Log route data for debugging
            return (
              <Polyline
                key={vehicleId}
                positions={route.map((point) => [point.latitude, point.longitude])}
                color="green" // Or any color you prefer
                weight={4}     // Adjust thickness
                opacity={0.7}  // Adjust opacity for better visibility
              />
            );
          }
          return null;
        })}
      </MapContainer>
    </div>
  </div>
    </>

  );
};

export default App;
