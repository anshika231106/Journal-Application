const express = require("express");
const router = express.Router();
const Journal = require("../models/Journal");

router.get("/", async (req, res) => {
    const journals = await Journal.find();
    res.json(journals);
});

router.post("/", async (req, res) => {
    const newEntry = new Journal({
        text: req.body.text
    });
    await newEntry.save();
    res.json(newEntry);
});

router.delete("/:id", async (req, res) => {
    await Journal.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;