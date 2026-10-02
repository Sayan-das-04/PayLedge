const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  month: { type: String, required: true },
  basicSalary: { type: Number, required: true },
  hra: { type: Number, default: 0 },
  da: { type: Number, default: 0 },
  allowances: { type: Number, default: 0 },
  pf: { type: Number, default: 0 },
  esi: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  otherDeductions: { type: Number, default: 0 },
  netSalary: { type: Number, required: true },
  status: { type: String, enum: ['Paid', 'Pending'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('Payroll', payrollSchema);
