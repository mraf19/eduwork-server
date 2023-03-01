const mongoose = require("mongoose");
const { dbHost, dbPort, dbUser, dbPass, dbName } = require("../app/config");

mongoose.set("strictQuery", true);

mongoose
	.connect(
		`mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`,
	)
	.then(() => {
		console.log("Connected to DB");
	})
	.catch((err) => {
		console.log(err);
	});

const db = mongoose.connection;

module.exports = db;
