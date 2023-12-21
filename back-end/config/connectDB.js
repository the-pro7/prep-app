const mongoose = require("mongoose");

function connectDb(connectionString = "", port, app) {
	mongoose
		.connect(connectionString)
		.then(() => {
			app.listen(port, () => {
				console.log("listening on port", port);
			});
		})
		.catch((err) => console.error(`Error connecting to database: ${err}`));
}

const connection = mongoose.connection;

connection.once("open", () => {
	console.log("MongoDb just joined the fun!!");
});

module.exports = connectDb
