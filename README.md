Vehicle Tracking App
A comprehensive web application for real-time vehicle tracking, designed to provide users with an easy-to-use interface to monitor the last 10 recorded locations of their vehicles. This app offers an efficient and streamlined approach to vehicle tracking while ensuring a smooth user experience.

Features
1. Real-Time Vehicle Tracking
Real-Time Location Updates: Track the real-time location of your vehicles on an interactive map.
Last 10 Locations: Only the last 10 recorded locations of each vehicle are stored for efficient data management and easy access to recent tracking information.
Multiple Vehicle Support: Manage and track multiple vehicles within a single user account.
2. User Interface
Interactive Map: View the real-time location of vehicles with a zoomable and draggable map.
Vehicle List: A list view that allows users to see and select vehicles for tracking.
Data Refresh: Automatic updates and refreshing of vehicle locations without the need for manual reloads.
Technologies Used
Frontend:
React.js: A fast and dynamic front-end JavaScript library for building the user interface.
Redux: For state management, handling the real-time vehicle data updates across components.
Leaflet.js / Google Maps API: For displaying interactive maps with vehicle locations.
Material-UI: A React component library for building modern and responsive UI elements.
Axios: To handle API requests between the frontend and backend.
Backend:
Node.js: A JavaScript runtime for executing the backend code.
Express.js: A web framework for Node.js to handle routing and manage HTTP requests.
MongoDB: A NoSQL database for storing vehicle data, including location logs and user details.
Socket.io: For real-time communication, enabling instant updates for vehicle locations.
Authentication:
JWT (JSON Web Tokens): For secure and efficient user authentication and authorization.
Installation Guide
Follow these steps to set up the vehicle tracking app locally.

Prerequisites
Node.js: Install the latest version of Node.js from here.
MongoDB: You can use a local MongoDB installation or a cloud-based database like MongoDB Atlas.
Google Maps API Key: Sign up and get your API key from Google Cloud Console.
Step-by-Step Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/yourusername/vehicle-tracking-app.git
cd vehicle-tracking-app
Backend Setup:

Navigate to the backend directory:
bash
Copy code
cd backend
Install the necessary dependencies:
bash
Copy code
npm install
Frontend Setup:

Navigate to the frontend directory:
bash
Copy code
cd frontend
Install the necessary dependencies:
bash
Copy code
npm install
Configure Environment Variables:

Create a .env file in the backend directory with the following:
bash
Copy code
MONGO_URI=your_mongodb_connection_string
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
JWT_SECRET=your_jwt_secret_key
Start the Backend Server:

bash
Copy code
cd backend
npm start
The server will start on http://localhost:5000.

Start the Frontend Application:

bash
Copy code
cd frontend
npm start
The frontend will start on http://localhost:3000.

Access the Application: Open your browser and navigate to http://localhost:3000 to access the vehicle tracking application.

API Documentation
Authentication Endpoints:
POST /api/auth/register: Registers a new user.
Request body:
json
Copy code
{
  "username": "user123",
  "email": "user123@example.com",
  "password": "password123"
}
POST /api/auth/login: Logs in a user and returns a JWT token.
Request body:
json
Copy code
{
  "email": "user123@example.com",
  "password": "password123"
}
Response:
json
Copy code
{
  "token": "jwt_token"
}
Vehicle Management Endpoints:
GET /api/vehicles: Retrieves all vehicles associated with the logged-in user.
Headers: Authorization: Bearer <jwt_token>
Response:
json
Copy code
[
  {
    "vehicleId": "1",
    "make": "Toyota",
    "model": "Corolla",
    "lastLocation": {"lat": 34.0522, "lng": -118.2437}
  },
  ...
]
POST /api/vehicles: Adds a new vehicle.
Request body:
json
Copy code
{
  "make": "Toyota",
  "model": "Corolla",
  "licensePlate": "ABC123"
}
PUT /api/vehicles/:id: Updates a vehicle's details.
Request body:
json
Copy code
{
  "make": "Honda",
  "model": "Civic",
  "licensePlate": "XYZ987"
}
Vehicle Location Tracking Endpoints:
GET /api/track/:vehicleId: Retrieves the current location of a specific vehicle.

Response:
json
Copy code
{
  "lat": 34.0522,
  "lng": -118.2437,
  "timestamp": "2024-12-14T14:25:00Z"
}
GET /api/locations/:vehicleId: Retrieves the last 10 recorded locations of a specified vehicle.

Response:
json
Copy code
[
  {"lat": 34.0522, "lng": -118.2437, "timestamp": "2024-12-14T14:25:00Z"},
  ...
]
Testing
To run tests for both the frontend and backend:

Backend Tests:

bash
Copy code
cd backend
npm test
Frontend Tests:

bash
Copy code
cd frontend
npm test
Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a feature branch (git checkout -b feature-branch).
Commit your changes (git commit -am 'Add new feature').
Push to the branch (git push origin feature-branch).
Open a pull request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

