const express = require("express");
const connectDb = require("./config/connectDB");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

connectDb(process.env.CONNECTION_STRING, port, app)

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
	next();
});

// Routes
const attendance_routes = require("./routes/prep_attendace");
app.use("/api/attendance", attendance_routes);
