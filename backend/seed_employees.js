const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const Employee = require('./models/Employee');
const Attendance = require('./models/Attendance');

const employeesData = [
  { employeeId: 'EMP004', name: 'Kavya Sharma', email: 'kavya.s@payledger.com', department: 'Engineering', designation: 'Frontend Developer', basicSalary: 65000, password: 'password123' },
  { employeeId: 'EMP005', name: 'Vikram Singh', email: 'vikram.s@payledger.com', department: 'Engineering', designation: 'Backend Developer', basicSalary: 70000, password: 'password123' },
  { employeeId: 'EMP006', name: 'Ananya Gupta', email: 'ananya.g@payledger.com', department: 'HR', designation: 'HR Executive', basicSalary: 45000, password: 'password123' },
  { employeeId: 'EMP007', name: 'Arjun Nair', email: 'arjun.n@payledger.com', department: 'Marketing', designation: 'SEO Specialist', basicSalary: 55000, password: 'password123' },
  { employeeId: 'EMP008', name: 'Neha Patel', email: 'neha.p@payledger.com', department: 'Finance', designation: 'Accountant', basicSalary: 60000, password: 'password123' },
  { employeeId: 'EMP009', name: 'Rohan Mehta', email: 'rohan.m@payledger.com', department: 'Engineering', designation: 'DevOps Engineer', basicSalary: 75000, password: 'password123' },
  { employeeId: 'EMP010', name: 'Pooja Reddy', email: 'pooja.r@payledger.com', department: 'Marketing', designation: 'Content Writer', basicSalary: 40000, password: 'password123' },
  { employeeId: 'EMP011', name: 'Siddharth Bose', email: 'siddharth.b@payledger.com', department: 'Engineering', designation: 'QA Engineer', basicSalary: 50000, password: 'password123' },
  { employeeId: 'EMP012', name: 'Isha Desai', email: 'isha.d@payledger.com', department: 'HR', designation: 'Talent Acquisition', basicSalary: 48000, password: 'password123' },
  { employeeId: 'EMP013', name: 'Kartik Iyer', email: 'kartik.i@payledger.com', department: 'Finance', designation: 'Financial Analyst', basicSalary: 62000, password: 'password123' }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/payflow');
    
    // Add employees
    for (let empData of employeesData) {
      const exists = await Employee.findOne({ email: empData.email });
      if (!exists) {
        const newEmp = new Employee(empData);
        await newEmp.save();
      }
    }
    
    // Get all Emps
    const allEmps = await Employee.find({});
    
    // Add attendance for today
    const today = new Date();
    today.setHours(0,0,0,0);
    const statuses = ['Present', 'Present', 'Present', 'Present', 'Present', 'Present', 'Present', 'Absent', 'Half Day'];
    
    await Attendance.deleteMany({ date: { $gte: today } }); // Clear today's attendance so we can seed fresh
    
    for (let emp of allEmps) {
      const r = Math.floor(Math.random() * statuses.length);
      const att = new Attendance({
        employeeId: emp._id,
        date: new Date(),
        status: statuses[r]
      });
      await att.save();
    }
    
    console.log('Seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
seed();
