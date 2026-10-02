const express = require("express");
const router = express.Router();
const Payroll = require("../models/Payroll");

router.get("/", async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate("employeeId");
    res.json(payrolls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const payroll = new Payroll(req.body);
    await payroll.save();
    res.status(201).json(payroll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedPayroll = await Payroll.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true },
    );
    res.json(updatedPayroll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
