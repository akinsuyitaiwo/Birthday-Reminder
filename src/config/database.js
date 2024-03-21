const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()

const connect = async () => {
	const connection = await mongoose.connect(process.env.MONGO_URL);
	if (!connection) {
		console.log("DATABASE connection failed! Exiting Now");
		process.emit("SIGTERM");
		process.exit(1);
	}
	console.log("DATABASE connected successfully!");
	return connection;
};

module.exports = { connect };