const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['Present', 'Absent', 'Half Day'], required: true },
  punchIn: { type: Date },
  punchOut: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
