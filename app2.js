import express from "express";
import {
  initializeDb,
  closeDbConnection,
} from "./src/utility/db_connectivity.js";
import router from "./routes.js";

initializeDb();
const app = express();
const PORT = 3002;

// Middleware to parse JSON requests
app.use(express.json());

app.use("/", router);
app.get("/", (req, res) => {
  console.log("App 2!");
  res.send("App server started 2!");
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Gracefully handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`UNCAUGHT EXCEPTION: ${err}`);
  closeDbConnection();
  process.exit(1);
});

// Gracefully handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log(`UNCAUGHT REJECTION: ${err}`);
  closeDbConnection();
  process.exit(1);
});
