const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express(); // ✅ THIS WAS MISSING

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// Routes
const journalRoutes = require("./routes/journalRoutes");
app.use("/journals", journalRoutes);

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// MongoDB connection
const mongoURI =
  process.env.MONGO_URL || "mongodb://localhost:27017/journaldb";

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));
  

app.listen(5000, () => {
  console.log("Server running on port 5000");
});


// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// const journalRoutes = require("./routes/journalRoutes");
// app.use("/journals", journalRoutes);

// // mongoose.connect("mongodb://localhost:27017/journaldb")
// //     .then(() => console.log("MongoDB Connected"))
// //     .catch(err => console.log(err));

// mongoose.connect("mongodb://mongo:27017/journaldb")
//     .then(() => console.log("MongoDB Connected"))
//     .catch(err => console.log(err));

// app.get("/", (req, res) => {
//     res.send("API Running");
// });

// app.listen(5000, () => {
//     console.log("Server running on port 5000");
// });
