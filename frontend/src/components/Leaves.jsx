import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/leaves';
const EMP_API_URL = 'http://localhost:5000/api/employees';

export default function Leaves({ user }) {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ employeeId: user.role === 'employee' ? user._id : '', leaveType: 'Casual', fromDate: '', toDate: '', reason: '' });

  const fetchData = async () => {
    try {
      const lRes = await axios.get(API_URL);
      if (user.role === 'manager') {
        setLeaves(lRes.data);
      } else {
        setLeaves(lRes.data.filter(l => l.employeeId?._id === user._id));
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

  const updateLeaveStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status });
      fetchData();
    } catch (err) {
      alert('Error updating leave: ' + err.message);
    }
  };

  const actionBodyTemplate = (rowData) => {
    if (user.role !== 'manager' || rowData.status !== 'Pending') return null;
    return (
      <div className="d-flex gap-2">
        <button className="action-btn-outline" style={{borderColor: '#10b981', color: '#10b981'}} onClick={() => updateLeaveStatus(rowData._id, 'Approved')} title="Approve"><i className="pi pi-check" style={{fontSize: '12px'}}></i></button>
        <button className="action-btn-outline text-danger border-danger hover-bg-danger" onClick={() => updateLeaveStatus(rowData._id, 'Rejected')} title="Reject"><i className="pi pi-times" style={{fontSize: '12px'}}></i></button>
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold m-0" style={{color: 'var(--burgundy-dark)'}}>{user.role === 'manager' ? 'Leave Management' : 'My Leaves'}</h2>
          <p className="text-muted mt-1">Review leave requests, approve time off and track balances.</p>
        </div>
        <Button label="Apply Leave" icon="pi pi-calendar-plus" className="btn-burgundy px-4 py-2" onClick={() => setShowModal(true)} />
      </div>

      <Card className="shadow-sm border-0">
        <DataTable value={leaves} paginator rows={10} dataKey="_id" emptyMessage="No leaves found.">
          {user.role === 'manager' && <Column field="employeeId.name" header="Employee" sortable></Column>}
          <Column field="leaveType" header="Type" sortable></Column>
          <Column field="fromDate" header="From" sortable body={(row) => new Date(row.fromDate).toLocaleDateString()}></Column>
          <Column field="toDate" header="To" sortable body={(row) => new Date(row.toDate).toLocaleDateString()}></Column>
          <Column field="status" header="Status" sortable body={(row) => (
             <span className={`status-badge ${row.status === 'Approved' ? 'active' : row.status === 'Rejected' ? 'inactive' : 'on-leave'}`}>{row.status}</span>
          )}></Column>
          {user.role === 'manager' && <Column header="Actions" body={actionBodyTemplate} exportable={false} style={{ width: '10%' }}></Column>}
        </DataTable>
      </Card>

      <Dialog header="Apply For Leave" visible={showModal} style={{ width: '40vw' }} onHide={() => setShowModal(false)}>
        <div className="d-flex flex-column gap-3 mt-3">
          {user.role === 'manager' && (
            <Dropdown options={employees} placeholder="Select Employee" value={formData.employeeId} onChange={(e) => setFormData({...formData, employeeId: e.value})} />
          )}
          <Dropdown options={[{label: 'Casual', value: 'Casual'}, {label: 'Sick', value: 'Sick'}, {label: 'Paid', value: 'Paid'}]} placeholder="Leave Type" value={formData.leaveType} onChange={(e) => setFormData({...formData, leaveType: e.value})} />
          <div className="d-flex gap-3">
            <input type="date" className="form-control p-2" value={formData.fromDate} onChange={(e) => setFormData({...formData, fromDate: e.target.value})} placeholder="From" />
            <input type="date" className="form-control p-2" value={formData.toDate} onChange={(e) => setFormData({...formData, toDate: e.target.value})} placeholder="To" />
          </div>
          <InputTextarea rows={3} placeholder="Reason for leave" value={formData.reason} onChange={(e) => setFormData({...formData, reason: e.target.value})} />
          <Button label="Submit Request" onClick={handleSave} className="mt-3" />
        </div>
      </Dialog>
    </div>
  );
}
