Vehicle Tracking Dashboard
A React-based vehicle tracking dashboard that displays live vehicle locations on a map using Leaflet and fetches data from a backend server built with Express.

Features
Displays a list of vehicles and their locations on a map.
Fetches historical routes for vehicles.
Auto-refreshes data every 30 seconds.
Error handling for API requests.


Before running the project, you need to install the necessary dependencies for both the front-end and back-end.

Front-End (React) : Navigate to the src folder and run:
# cd src
# npm install

Additional Dependencies
If you need to install Leaflet and Moment.js separately for any reason, use the following commands:
# npm install leaflet
# npm install moment

Back-End (Express) : In the root of the project (where public folder is located), run:
# cd public
# npm install express cors axios

Running the Front-End : In the src folder, run the React app using:
# npm start
This will start the React development server on http://localhost:3000.

Running the Back-End : To run the back-end server, in the public folder of the project, run:
# node server.js
This will start the server on http://localhost:5000.

Auto-Refresh Configuration
The data for vehicles is refreshed every 30 seconds automatically using setInterval. This is handled in the App.js file within the useEffect hook:
# useEffect(() => {
  # fetchVehicleData(); // Initial fetch
 #  const interval = setInterval(() => {
 #    fetchVehicleData(); // Refresh every 30 seconds
 #  }, 30000);
  # return () => clearInterval(interval);
# }, []);
You can modify the 30000 value to adjust the refresh interval (in milliseconds).

Error Handling
If an error occurs while fetching vehicle data or historical routes, an error message will be displayed. Errors are caught in the catch block of the API request, and an error message is stored in the error state.
# const fetchVehicleData = async () => {
#  setLoading(true);
#  setError(null); // Reset error state before fetching
#  try {
#    const response = await axios.get('http://localhost:5000/vehicles');
#    // Handle success...
#  } catch (error) {
#    setError('Error fetching vehicle data. Please refresh page.');
#  } finally {
#    setLoading(false);
#  }
# };

If an error occurs, the error message will be shown in the UI:
# {error ? <div>{error}</div> : <VehicleList vehicles={filteredVehicles} />}


Folder Structure
/project-root
  /src
    /components        # Contains React components like VehicleList, VehicleFilter
    App.js             # Main React component
  /public
    logo.PNG           # Logo image
    server.js          # Backend server (Express)
    index.html         # Root HTML template
  package.json         # Frontend package.json file
  public/package.json  # Backend package.json 
  
If you encounter CORS (Cross-Origin Resource Sharing) issues when calling the backend API from the React app, ensure you have CORS enabled in your backend (server.js):
# const cors = require('cors');
# app.use(cors());