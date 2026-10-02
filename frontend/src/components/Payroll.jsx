import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/payroll';
const EMP_API_URL = 'http://localhost:5000/api/employees';

export default function Payroll({ user }) {
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  
  const [formData, setFormData] = useState({ 
    employeeId: '', month: 'October 2026', basicSalary: 0, hra: 0, da: 0, allowances: 0, pf: 0, esi: 0, tax: 0, otherDeductions: 0, netSalary: 0 
  });

  const fetchData = async () => {
    try {
      const pRes = await axios.get(API_URL);
      setPayrolls(pRes.data);
      const empRes = await axios.get(EMP_API_URL);
      setEmployees(empRes.data.map(e => ({ label: e.name, value: e._id, original: e })));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { if(user.role === 'manager') fetchData(); }, [user]);

  const handleEmployeeSelect = (e) => {
    const emp = employees.find(emp => emp.value === e.value).original;
    const basic = emp.basicSalary || 0;
    const hra = basic * 0.25;
    const da = basic * 0.1;
    const allowances = hra + da;
    const pf = basic * 0.12;
    const tax = 500;
    const deductions = pf + tax;
    const net = (basic + allowances) - deductions;
    
    setFormData({
      ...formData, employeeId: e.value, basicSalary: basic, hra, da, allowances, pf, tax, otherDeductions: deductions, netSalary: net
    });
  };

  const handleSave = async () => {
    try {
      await axios.post(API_URL, formData);
      setShowModal(false);
      fetchData();
    } catch (err) {
      alert('Error saving record: ' + err.message);
    }
  };

  const markAsPaid = async (id) => {
    try {
      await axios.put(`${API_URL}/${id}`, { status: 'Paid' });
      setSelectedPayroll(null);
      fetchData();
    } catch (err) {
      alert('Error updating payroll: ' + err.message);
    }
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="d-flex gap-2">
        <button className="action-btn-outline" onClick={() => setSelectedPayroll(rowData)} title="View/Calculate">
          <i className="pi pi-eye" style={{fontSize: '12px'}}></i>
        </button>
      </div>
    );
  };

  if (user.role !== 'manager') return null;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold m-0" style={{color: 'var(--burgundy-dark)'}}>Payroll Calculation</h2>
          <p className="text-muted mt-1">Calculate and process employee salaries.</p>
        </div>
        <Button label="Calculate New Payroll" icon="pi pi-calculator" className="btn-burgundy px-4 py-2" onClick={() => setShowModal(true)} />
      </div>

      <Card className="shadow-sm border-0">
        <DataTable value={payrolls} paginator rows={10} dataKey="_id" emptyMessage="No payroll records found.">
          <Column field="employeeId.name" header="Employee" sortable></Column>
          <Column field="month" header="Month" sortable></Column>
          <Column field="basicSalary" header="Basic" sortable body={(row) => `₹${row.basicSalary}`}></Column>
          <Column field="netSalary" header="Net Salary" sortable body={(row) => <strong className="text-success">₹{row.netSalary}</strong>}></Column>
          <Column field="status" header="Status" sortable body={(row) => (
             <span className={`status-badge ${row.status === 'Paid' ? 'active' : 'inactive'}`}>{row.status}</span>
          )}></Column>
          <Column header="Actions" body={actionBodyTemplate} exportable={false} style={{ minWidth: '6rem' }}></Column>
        </DataTable>
      </Card>

      <Dialog header="Run Payroll Engine" visible={showModal} style={{ width: '40vw' }} onHide={() => setShowModal(false)}>
        <div className="d-flex flex-column gap-3 mt-3">
          <Dropdown options={employees} placeholder="Select Employee" value={formData.employeeId} onChange={handleEmployeeSelect} />
          <InputText placeholder="Month (e.g. October 2026)" value={formData.month} onChange={(e) => setFormData({...formData, month: e.target.value})} />
          
          <div className="row g-3">
             <div className="col-md-6">
               <label className="fw-bold mb-1 text-muted" style={{fontSize: '12px'}}>Basic Salary</label>
               <InputText className="w-100 p-2" value={formData.basicSalary} readOnly />
             </div>
             <div className="col-md-6">
               <label className="fw-bold mb-1 text-muted" style={{fontSize: '12px'}}>Total Allowances</label>
               <InputText className="w-100 p-2" value={formData.allowances} readOnly />
             </div>
             <div className="col-md-6">
               <label className="fw-bold mb-1 text-muted" style={{fontSize: '12px'}}>Total Deductions (PF/Tax)</label>
               <InputText className="w-100 p-2" value={formData.otherDeductions} readOnly />
             </div>
          </div>
          
          <div className="mt-3 pt-3 border-top d-flex justify-content-between align-items-center">
            <h5 className="m-0 text-success fw-bold">Net Payable</h5>
            <h3 className="m-0 text-success fw-bold">₹{formData.netSalary}</h3>
          </div>

          <Button label="Save Draft Payroll" onClick={handleSave} className="mt-4 btn-burgundy" />
        </div>
      </Dialog>

      {/* Review & Mark Paid Dialog */}
      <Dialog header="Review Payroll" visible={!!selectedPayroll} style={{ width: '30vw' }} onHide={() => setSelectedPayroll(null)}>
        {selectedPayroll && (
          <div className="p-4 bg-light rounded border border-secondary">
            <div className="mb-4 pb-3 border-bottom text-center">
              <h5 className="fw-bold m-0">{selectedPayroll.employeeId?.name || 'Unknown'}</h5>
              <p className="text-muted m-0">{selectedPayroll.month}</p>
            </div>
            
            <div className="d-flex justify-content-between mb-2"><span>Basic Salary</span><span>₹{selectedPayroll.basicSalary}</span></div>
            <div className="d-flex justify-content-between mb-2"><span>Allowances</span><span>₹{selectedPayroll.allowances || (selectedPayroll.hra + selectedPayroll.da)}</span></div>
            <div className="d-flex justify-content-between mb-4"><span>Deductions</span><span className="text-danger">- ₹{selectedPayroll.otherDeductions || selectedPayroll.pf}</span></div>
            
            <div className="d-flex justify-content-between mb-2"><span>Gross Salary</span><span className="fw-bold">₹{(selectedPayroll.basicSalary + (selectedPayroll.allowances || (selectedPayroll.hra + selectedPayroll.da)))}</span></div>
            <div className="d-flex justify-content-between pt-3 border-top mt-3">
              <h5 className="fw-bold m-0">Net Salary</h5>
              <h4 className="text-success fw-bold m-0">₹{selectedPayroll.netSalary}</h4>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-4">
              <span className="text-muted">Status: <strong>{selectedPayroll.status}</strong></span>
              {selectedPayroll.status === 'Pending' && (
                <Button label="Mark as Paid" icon="pi pi-check" severity="success" onClick={() => markAsPaid(selectedPayroll._id)} />
              )}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
