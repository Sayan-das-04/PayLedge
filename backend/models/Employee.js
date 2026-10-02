const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: { type: String, required: true },
  designation: { type: String, required: true },
  basicSalary: { type: Number, required: true },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  role: { type: String, enum: ['manager', 'employee'], default: 'employee' }
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
