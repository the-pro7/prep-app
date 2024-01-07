const mongoose = require("mongoose");

// Function to connect to MongoDB  
function connectDb(connectionString = "", port, app) {
	// Call the mongoose.connect method to initialize a connection with CONNECTION_STRING from the .env file
	mongoose
		.connect(connectionString)
		.then(() => {
			// Start listening for requests from frontend when connection succeeds
			app.listen(port, () => {
				console.log("listening on port", port);
			});
		})
		.catch((err) => console.error(`Error connecting to database: ${err}`));
}

// Set a variable to initialized connection
const connection = mongoose.connection;

// Once the connection succeeds, the show the message "MongoDb just joined the fun!!"
connection.once("open", () => {
	console.log("MongoDB just joined the fun!!");
});

// Export the connectDb function to be used in the server.js file
module.exports = connectDb
