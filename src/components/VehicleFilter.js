import React, { useState } from 'react';

function VehicleFilter({ vehicles, setFilteredVehicles }) {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);

    // Check if vehicles is an array and not empty
    if (vehicles && Array.isArray(vehicles)) {
      const filteredVehicles = vehicles.filter(vehicle =>
        vehicle.id.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredVehicles(filteredVehicles);
    }
  };

  return (
    <div className="vehicle-filter">
      <input
        type="text"
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search by Vehicle ID"
      />
    </div>
  );
}

export default VehicleFilter;
