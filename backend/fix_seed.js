const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Employee = require('./models/Employee');
async function fix() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/payflow');
  await Employee.deleteMany({ employeeId: { $in: ['EMP004', 'EMP005', 'EMP006', 'EMP007', 'EMP008', 'EMP009', 'EMP010', 'EMP011', 'EMP012', 'EMP013'] } });
  console.log("Deleted duplicates");
  process.exit(0);
}
fix();
