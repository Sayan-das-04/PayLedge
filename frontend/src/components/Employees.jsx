import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';

const API_URL = 'https://payledge.onrender.com/api/employees';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const initialForm = { employeeId: '', name: '', email: '', password: '123', department: '', designation: '', basicSalary: '' };
  const [formData, setFormData] = useState(initialForm);
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const [presentToday, setPresentToday] = useState(0);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const [totalPayroll, setTotalPayroll] = useState(0);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get(API_URL);
      setEmployees(res.data);
      
      const leaveRes = await axios.get('https://payledge.onrender.com/api/leaves');
      setPendingLeaves(leaveRes.data.filter(l => l.status === 'Pending').length);

      const attRes = await axios.get('https://payledge.onrender.com/api/attendance');
      const today = new Date().toISOString().split('T')[0];
      
      // De-duplicate attendance records for today per employee
      const todayRecords = attRes.data.filter(r => new Date(r.date).toISOString().split('T')[0] === today);
      const uniqueEmployeePunches = new Map();
      todayRecords.forEach(record => {
        if (!uniqueEmployeePunches.has(record.employeeId)) {
          uniqueEmployeePunches.set(record.employeeId, record);
        } else if (record.status === 'Present' || record.status === 'Half Day') {
          uniqueEmployeePunches.set(record.employeeId, record);
        }
      });
      const uniqueRecords = Array.from(uniqueEmployeePunches.values());
      const presentCount = uniqueRecords.filter(r => r.status === 'Present' || r.status === 'Half Day').length;
      setPresentToday(presentCount);

      const totalEmps = res.data.length || 1;
      setAttendancePercentage(Math.min(100, Math.round((presentCount / totalEmps) * 100)));

      const payRes = await axios.get('https://payledge.onrender.com/api/payroll');
      const monthTotal = payRes.data.reduce((acc, curr) => acc + curr.netSalary, 0);
      setTotalPayroll(monthTotal.toLocaleString('en-IN'));

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const openNew = () => {
    setFormData(initialForm);
    setIsEditing(false);
    setShowModal(true);
  };

  const editEmployee = (employee) => {
    setFormData({ ...employee });
    setEditingId(employee._id);
    setIsEditing(true);
    setShowModal(true);
  };

  const deleteEmployee = async (employee) => {
    if (window.confirm(`Are you sure you want to delete ${employee.name}?`)) {
      try {
        await axios.delete(`${API_URL}/${employee._id}`);
        fetchEmployees();
      } catch (err) {
        alert('Error deleting employee: ' + err.message);
      }
    }
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await axios.put(`${API_URL}/${editingId}`, formData);
      } else {
        await axios.post(API_URL, formData);
      }
      setShowModal(false);
      fetchEmployees();
      setFormData(initialForm);
    } catch (err) {
      alert('Error saving employee: ' + err.message);
    }
  };

  // Custom body templates
  const nameBodyTemplate = (rowData) => {
    const initials = rowData.name ? rowData.name.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() : 'U';
    return (
      <div className="d-flex align-items-center gap-3">
        <div className="rounded-circle d-flex align-items-center justify-content-center text-white" 
             style={{width: '35px', height: '35px', backgroundColor: 'var(--burgundy-dark)', fontSize: '14px', fontWeight: 'bold'}}>
          {initials}
        </div>
        <span className="fw-medium text-dark">{rowData.name}</span>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    const status = rowData.status || 'Active';
    const badgeClass = status === 'Active' ? 'active' : status === 'On Leave' ? 'on-leave' : 'inactive';
    return <span className={`status-badge ${badgeClass}`}>{status}</span>;
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="d-flex gap-2">
        <button className="action-btn-outline" onClick={() => editEmployee(rowData)} title="Edit"><i className="pi pi-pencil" style={{fontSize: '12px'}}></i></button>
        <button className="action-btn-outline text-danger border-danger hover-bg-danger" onClick={() => deleteEmployee(rowData)} title="Delete"><i className="pi pi-trash" style={{fontSize: '12px'}}></i></button>
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold m-0" style={{color: 'var(--burgundy-dark)'}}>Employee Management</h2>
          <p className="text-muted mt-1">Manage your organization's employees, roles and salary profiles.</p>
        </div>
        <Button label="Add Employee" icon="pi pi-plus" className="btn-burgundy px-4 py-2" onClick={openNew} />
      </div>

      {/* 4 Stat Cards */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <Card className="shadow-sm border-0 h-100 p-0">
            <div className="d-flex align-items-center gap-3">
              <div className="stat-icon-circle text-white" style={{backgroundColor: 'var(--burgundy-dark)'}}><i className="pi pi-users"></i></div>
              <div>
                <span className="text-muted d-block" style={{fontSize: '12px'}}>Total Employees</span>
                <h4 className="fw-bold m-0">{employees.length}</h4>
              </div>
            </div>
            <div className="mt-3 text-success" style={{fontSize: '11px'}}><i className="pi pi-arrow-up text-success" style={{fontSize:'10px'}}></i> 2 new this month</div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="shadow-sm border-0 h-100 p-0">
            <div className="d-flex align-items-center gap-3">
              <div className="stat-icon-circle"><i className="pi pi-user"></i></div>
              <div>
                <span className="text-muted d-block" style={{fontSize: '12px'}}>Present Today</span>
                <h4 className="fw-bold m-0">{presentToday}</h4>
              </div>
            </div>
            <div className="mt-3 text-success" style={{fontSize: '11px'}}><span className="d-inline-block rounded-circle me-1" style={{width:'6px',height:'6px',background:'#10b981'}}></span> {attendancePercentage}% attendance</div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="shadow-sm border-0 h-100 p-0">
            <div className="d-flex align-items-center gap-3">
              <div className="stat-icon-circle"><i className="pi pi-calendar"></i></div>
              <div>
                <span className="text-muted d-block" style={{fontSize: '12px'}}>Total Payroll</span>
                <h4 className="fw-bold m-0">₹ {totalPayroll}</h4>
              </div>
            </div>
            <div className="mt-3 text-warning" style={{fontSize: '11px'}}><span className="d-inline-block rounded-circle me-1" style={{width:'6px',height:'6px',background:'#f59e0b'}}></span> This month</div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="shadow-sm border-0 h-100 p-0">
            <div className="d-flex align-items-center gap-3">
              <div className="stat-icon-circle"><i className="pi pi-clock"></i></div>
              <div>
                <span className="text-muted d-block" style={{fontSize: '12px'}}>Pending Leaves</span>
                <h4 className="fw-bold m-0">{pendingLeaves}</h4>
              </div>
            </div>
            <div className="mt-3 text-warning" style={{fontSize: '11px'}}><span className="d-inline-block rounded-circle me-1" style={{width:'6px',height:'6px',background:'#f59e0b'}}></span> Requires attention</div>
          </Card>
        </div>
      </div>

      <Card className="shadow-sm border-0">
        <div className="d-flex justify-content-between align-items-center mb-3">
           <h5 className="fw-bold m-0">All Employees</h5>
           <div className="d-flex gap-2">
             <div className="position-relative">
               <i className="pi pi-search position-absolute text-muted" style={{left: '10px', top:'50%', transform:'translateY(-50%)', fontSize:'12px'}}></i>
               <input type="text" className="form-control form-control-sm border rounded-pill px-4" placeholder="Search by name, ID or department..." style={{width: '250px'}} />
             </div>
             <select className="form-select form-select-sm border rounded-pill px-3" style={{width: '150px'}}>
               <option>All Departments</option>
             </select>
           </div>
        </div>

        <DataTable value={employees} paginator rows={6} dataKey="_id" emptyMessage="No employees found." responsiveLayout="scroll">
          <Column field="employeeId" header="ID" sortable style={{width: '10%'}}></Column>
          <Column field="name" header="Name" sortable body={nameBodyTemplate} style={{width: '20%'}}></Column>
          <Column field="department" header="Department" sortable style={{width: '15%'}}></Column>
          <Column field="designation" header="Designation" sortable style={{width: '15%'}}></Column>
          <Column field="basicSalary" header="Monthly Salary" sortable body={(row) => `₹${row.basicSalary}`} style={{width: '15%'}}></Column>
          <Column field="status" header="Status" sortable body={statusBodyTemplate} style={{width: '15%'}}></Column>
          <Column header="Actions" body={actionBodyTemplate} exportable={false} style={{ width: '10%' }}></Column>
        </DataTable>
      </Card>

      <Dialog header={isEditing ? "Edit Employee" : "Add New Employee"} visible={showModal} style={{ width: '40vw' }} onHide={() => setShowModal(false)}>
        <div className="d-flex flex-column gap-3 mt-3">
          <InputText placeholder="Employee ID (e.g. EMP001)" value={formData.employeeId} onChange={(e) => setFormData({...formData, employeeId: e.target.value})} />
          <InputText placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
          <InputText placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
          <InputText placeholder="Department" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
          <InputText placeholder="Designation" value={formData.designation} onChange={(e) => setFormData({...formData, designation: e.target.value})} />
          <InputText placeholder="Basic Salary" type="number" value={formData.basicSalary} onChange={(e) => setFormData({...formData, basicSalary: e.target.value})} />
          <Button label={isEditing ? "Update Employee" : "Save Employee"} onClick={handleSave} className="mt-3 btn-burgundy" />
        </div>
      </Dialog>
    </div>
  );
}
