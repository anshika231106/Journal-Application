const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const journalRoutes = require("./routes/journalRoutes");
app.use("/journals", journalRoutes);

mongoose.connect("mongodb://localhost:27017/journaldb")
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("API Running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});
