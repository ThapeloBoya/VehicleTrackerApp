import React from 'react';

function VehicleList({ vehicles, onVehicleClick }) {
  return (
    <div className="vehicle-list">
      <h2>Vehicles</h2>
      <ul>
        {vehicles.map((vehicle) => (
          <li key={vehicle.id} onClick={() => onVehicleClick(vehicle)}>
            <h3>{vehicle.id}</h3>
            <p>Latitude: {vehicle.latitude}</p>
            <p>Longitude: {vehicle.longitude}</p>
            <p>Timestamp: {vehicle.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default VehicleList;
