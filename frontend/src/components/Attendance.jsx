import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import axios from 'axios';

const API_URL = 'https://payledge.onrender.com/api/attendance';
const EMP_API_URL = 'https://payledge.onrender.com/api/employees';

export default function Attendance({ user }) {
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ employeeId: user.role === 'employee' ? user._id : '', date: new Date().toISOString().split('T')[0], status: 'Present' });

  const fetchData = async () => {
    try {
      const attRes = await axios.get(API_URL);
      if (user.role === 'manager') {
        setRecords(attRes.data);
      } else {
        setRecords(attRes.data.filter(r => r.employeeId?._id === user._id));
      }
      
      if (user.role === 'manager') {
        const empRes = await axios.get(EMP_API_URL);
        setEmployees(empRes.data.map(e => ({ label: e.name, value: e._id })));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, [user]);

  const handleSave = async () => {
    try {
      await axios.post(API_URL, formData);
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert('Error saving record: ' + err.message);
    }
  };

  const handleMarkAllPresent = async () => {
    if (!window.confirm("Are you sure you want to mark all pending employees as Present for today?")) return;
    
    const today = new Date().toISOString().split('T')[0];
    
    try {
      // Find employees who don't have attendance for today
      const todayRecords = records.filter(r => r.date && r.date.startsWith(today));
      const employeesWithAttendance = todayRecords.map(r => r.employeeId?._id);
      
      const missingEmployees = employees.filter(emp => !employeesWithAttendance.includes(emp.value));
      
      if (missingEmployees.length === 0) {
        alert("All employees already have attendance marked for today.");
        return;
      }
      
      const promises = missingEmployees.map(emp => {
        return axios.post(API_URL, {
          employeeId: emp.value,
          date: today,
          status: 'Present'
        });
      });
      
      await Promise.all(promises);
      fetchData();
      alert(`Successfully marked ${missingEmployees.length} employees as Present!`);
    } catch (err) {
      console.error(err);
      alert("Error marking attendance.");
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold m-0" style={{color: 'var(--burgundy-dark)'}}>{user.role === 'manager' ? 'Attendance Tracking' : 'My Attendance'}</h2>
          <p className="text-muted mt-1">Monitor daily attendance, working hours and status.</p>
        </div>
        <div className="d-flex gap-2">
          {user.role === 'manager' && (
            <Button label="Mark All Present" icon="pi pi-users" className="p-button-outlined" style={{color: 'var(--burgundy-dark)', borderColor: 'var(--burgundy-dark)'}} onClick={handleMarkAllPresent} />
          )}
          <Button label={user.role === 'manager' ? "Mark Individual" : "Punch In Today"} icon="pi pi-check" className="btn-burgundy px-4 py-2" onClick={() => setShowModal(true)} />
        </div>
      </div>

      <Card className="shadow-sm border-0">
        <DataTable value={records} paginator rows={10} dataKey="_id" emptyMessage="No attendance records found.">
          {user.role === 'manager' && <Column field="employeeId.name" header="Employee" sortable></Column>}
          <Column field="date" header="Date" sortable body={(row) => new Date(row.date).toLocaleDateString()}></Column>
          <Column field="status" header="Status" sortable body={(row) => (
             <span className={`badge ${row.status === 'Present' ? 'bg-success' : row.status === 'Absent' ? 'bg-danger' : 'bg-warning'}`}>{row.status}</span>
          )}></Column>
        </DataTable>
      </Card>

      <Dialog header={user.role === 'manager' ? "Mark Attendance" : "Self Punch-In"} visible={showModal} style={{ width: '40vw' }} onHide={() => setShowModal(false)}>
        <div className="d-flex flex-column gap-3 mt-3">
          {user.role === 'manager' && (
            <Dropdown options={employees} placeholder="Select Employee" value={formData.employeeId} onChange={(e) => setFormData({...formData, employeeId: e.value})} />
          )}
          <input type="date" className="form-control p-2" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
          {user.role === 'manager' && (
            <Dropdown options={[{label: 'Present', value: 'Present'}, {label: 'Absent', value: 'Absent'}, {label: 'Half Day', value: 'Half Day'}]} value={formData.status} onChange={(e) => setFormData({...formData, status: e.value})} />
          )}
          <Button label="Save Attendance" onClick={handleSave} className="mt-3" />
        </div>
      </Dialog>
    </div>
  );
}
