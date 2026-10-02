const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('./models/Employee');

dotenv.config();

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/payflow');
    
    // Clear existing
    await Employee.deleteMany({});

    const employees = [
      {
        employeeId: 'EMP001',
        name: 'Sayan Das',
        email: 'sayan@payflow.com',
        password: '123',
        department: 'Engineering',
        designation: 'Senior Developer',
        basicSalary: 60000,
        role: 'employee'
      },
      {
        employeeId: 'EMP002',
        name: 'Rahul Kumar',
        email: 'rahul@payflow.com',
        password: '123',
        department: 'HR',
        designation: 'HR Executive',
        basicSalary: 45000,
        role: 'employee'
      },
      {
        employeeId: 'MGR001',
        name: 'Admin Manager',
        email: 'manager@payflow.com',
        password: 'admin123',
        department: 'Management',
        designation: 'General Manager',
        basicSalary: 90000,
        role: 'manager'
      }
    ];

    await Employee.insertMany(employees);
    console.log('Successfully added default employees!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding data:', err);
    process.exit(1);
  }
};

seed();
