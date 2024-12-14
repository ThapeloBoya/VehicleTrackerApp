const express = require('express');
const cors = require('cors');
const moment = require('moment'); // Import moment for date manipulation
const app = express();

app.use(cors());
app.use(express.json());

// Simulate vehicle data
const vehicles = [
  { "id": "vehicle-1", "name": "Toyota Corolla", "latitude": 34.0522, "longitude": -118.2437, "timestamp": new Date().toISOString() }, // Los Angeles, CA
  { "id": "vehicle-2", "name": "Honda Civic", "latitude": 40.7128, "longitude": -74.0060, "timestamp": new Date().toISOString() }, // New York, NY
  { "id": "vehicle-3", "name": "Ford Focus", "latitude": 41.8781, "longitude": -87.6298, "timestamp": new Date().toISOString() }, // Chicago, IL
  { "id": "vehicle-4", "name": "Chevrolet Malibu", "latitude": 29.7604, "longitude": -95.3698, "timestamp": new Date().toISOString() }, // Houston, TX
  { "id": "vehicle-5", "name": "Hyundai Elantra", "latitude": 33.4484, "longitude": -112.0740, "timestamp": new Date().toISOString() }, // Phoenix, AZ
  { "id": "vehicle-6", "name": "Nissan Altima", "latitude": 39.7392, "longitude": -104.9903, "timestamp": new Date().toISOString() }, // Denver, CO
  { "id": "vehicle-7", "name": "BMW 3 Series", "latitude": 51.5074, "longitude": -0.1278, "timestamp": new Date().toISOString() }, // Washington, D.C.
  { "id": "vehicle-8", "name": "Mercedes-Benz C-Class", "latitude": 37.7749, "longitude": -122.4194, "timestamp": new Date().toISOString() }, // San Francisco, CA
  { "id": "vehicle-9", "name": "Audi A4", "latitude": 47.6062, "longitude": -122.3321, "timestamp": new Date().toISOString() }, // Seattle, WA
  { "id": "vehicle-10", "name": "Tesla Model 3", "latitude": 38.6270, "longitude": -90.1994, "timestamp": new Date().toISOString() }  // St. Louis, MO
];

// Simulate historical route data for all vehicles
const generateHistoricalRoute = (vehicleId) => {
  const route = [];
  const startTimestamp = moment().utc().subtract(1, 'hour'); // Start from 1 hour ago

  let startLat, startLon;

  // Find vehicle's initial coordinates
  const vehicle = vehicles.find(v => v.id === vehicleId);
  if (vehicle) {
    startLat = vehicle.latitude;
    startLon = vehicle.longitude;
  }

  // Generate route data for 7 intermediate points (over the last 1 hour)
  for (let i = 0; i < 7; i++) {
    const timeStamp = startTimestamp.clone().add((i + 1) * 10, 'minute').toISOString(); // Generate data points every 10 minutes
    route.push({
      timestamp: timeStamp,
      coordinates: [
        startLat + (Math.random() * 0.01 - 0.005),  // Random latitude variation around the vehicle's initial location
        startLon + (Math.random() * 0.01 - 0.005)   // Random longitude variation around the vehicle's initial location
      ]
    });
  }

  // Add the current position as the final point
  const currentTime = moment().utc().toISOString();
  route.push({
    timestamp: currentTime,
    coordinates: [
      startLat + (Math.random() * 0.01 - 0.005),  // Slight random variation around current position
      startLon + (Math.random() * 0.01 - 0.005)   // Slight random variation around current position
    ]
  });

  return route;
};

// Map vehicle ids to their historical routes
const historicalRoute = vehicles.reduce((acc, vehicle) => {
  acc[vehicle.id] = generateHistoricalRoute(vehicle.id);
  return acc;
}, {});

// Endpoint to get current vehicle data
app.get('/vehicles', (req, res) => {
  res.json(vehicles);
});

// Endpoint to get historical route data for a vehicle, filtered by the last hour
app.get('/vehicles/:id/route', (req, res) => {
  const vehicleId = req.params.id;

  // Get the current time in UTC and subtract 1 hour to filter data from the last hour
  const currentTime = moment().utc();
  const oneHourAgo = currentTime.clone().subtract(1, 'hour');

  // Check if we have the vehicle's historical route
  if (!historicalRoute[vehicleId]) {
    console.log(`No route data found for vehicle ID: ${vehicleId}`);
    return res.status(404).json({ error: 'Vehicle not found' });
  }

  // Log the current time and one hour ago time for debugging
  console.log(`Current Time: ${currentTime.format()}`);
  console.log(`One Hour Ago: ${oneHourAgo.format()}`);

  // Filter the route data based on the timestamp to only include the last hour's data
  const route = historicalRoute[vehicleId].filter((point) => {
    const timestamp = moment.utc(point.timestamp); // Parse the timestamp in UTC
    console.log(`Checking timestamp: ${timestamp.format()} (Vehicle: ${vehicleId})`); // Log each timestamp being checked
    return timestamp.isAfter(oneHourAgo); // Only keep data points from the last hour
  });

  // Log the filtered route data
  console.log(`Filtered route for ${vehicleId}:`, route);

  // Return the filtered route data
  res.json({ route });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
