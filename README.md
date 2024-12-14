Vehicle Tracking App
A comprehensive and easy-to-use vehicle tracking system that allows real-time tracking of vehicles and displays the last 10 recorded locations. This app is designed to monitor vehicle movements and ensure that the vehicle's current position is always accessible.

Features
1. Real-Time Vehicle Tracking
GPS Tracking: View the real-time location of vehicles on an interactive map.
Last 10 Locations: The app stores only the last 10 recorded locations of each vehicle, ensuring optimal data usage and easy access to recent tracking information.
Multiple Vehicle Support: Manage and track multiple vehicles under a single user account.
Technologies Used
Frontend:
React.js: For building dynamic user interfaces with fast updates.
Redux: For managing the application state and handling real-time updates efficiently.
Leaflet.js / Google Maps API: For rendering interactive maps to show the vehicle locations.
Material-UI: For reusable UI components and consistent design across the app.
Backend:
Node.js: A JavaScript runtime to handle backend logic and real-time communication.
Express.js: A web framework for Node.js to simplify routing and handling HTTP requests.
MongoDB: A NoSQL database for storing vehicle data, including locations, user details, and other relevant information.
WebSockets (Socket.io): Enables real-time communication for tracking updates and location changes.
Setup Instructions
Prerequisites
Node.js: Install Node.js from here.
MongoDB: You can use a local MongoDB installation or a cloud-based solution like MongoDB Atlas.
Google Maps API Key: Obtain an API key from the Google Cloud Console.
Installation Steps
Clone the Repository:
git clone https://github.com/yourusername/vehicle-tracking-app.git
cd vehicle-tracking-app
Install Backend Dependencies:

Navigate to the backend directory:
Install required dependencies:
npm install
Install Frontend Dependencies:

Navigate to the frontend directory:

cd frontend
Install required dependencies:

npm install
Configure Environment Variables:

In the backend directory, create a .env file with the following:

MONGO_URI=your_mongodb_connection_string
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
Run the Backend Server:


cd backend
npm start
Run the Frontend Application:

cd frontend
npm start
Access the Application:

Open your web browser and navigate to http://localhost:3000.
API Endpoints
Authentication:
POST /api/auth/register: Registers a new user.
POST /api/auth/login: Logs in a user and provides a JWT token.
Vehicle Management:
GET /api/vehicles: Fetches all vehicles associated with the logged-in user.
POST /api/vehicles: Adds a new vehicle.
PUT /api/vehicles/:id: Updates a vehicle’s information.
DELETE /api/vehicles/:id: Deletes a vehicle.
Tracking:
GET /api/track/:vehicleId: Retrieves the current location of a specific vehicle.
GET /api/locations/:vehicleId: Retrieves the last 10 recorded locations of a specified vehicle.
Testing
Run tests for both the frontend and backend:

Backend Tests:

cd backend
npm test
Frontend Tests:

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
