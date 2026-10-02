import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dialog } from "primereact/dialog";
import axios from "axios";

const API_URL = "http://localhost:5000/api/payroll";

export default function Payslips({ user }) {
  const [payrolls, setPayrolls] = useState([]);
  const [selectedPayslip, setSelectedPayslip] = useState(null);

  const fetchData = async () => {
    try {
      const pRes = await axios.get(API_URL);
      const paidPayrolls = pRes.data.filter((p) => p.status === "Paid");

      if (user.role === "manager") {
        setPayrolls(paidPayrolls);
      } else {
        setPayrolls(paidPayrolls.filter((p) => p.employeeId?._id === user._id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const downloadPayslip = (rowData) => {
    const text = `
========================================
             PAYLEDGER
          SALARY PAYSLIP            
========================================
Employee Name: ${rowData.employeeId?.name || "Unknown"}
Employee ID: ${rowData.employeeId?.employeeId || "N/A"}
Department: ${rowData.employeeId?.department || "N/A"}
Designation: ${rowData.employeeId?.designation || "N/A"}

Salary Month: ${rowData.month}
----------------------------------------
EARNINGS:
Basic Salary: ₹${rowData.basicSalary}
HRA: ₹${rowData.hra}
DA: ₹${rowData.da}
Total Allowances: ₹${rowData.allowances || rowData.hra + rowData.da}
----------------------------------------
GROSS SALARY: ₹${rowData.basicSalary + (rowData.allowances || rowData.hra + rowData.da)}

DEDUCTIONS:
PF / Tax: ₹${rowData.otherDeductions || rowData.pf}
----------------------------------------
TOTAL DEDUCTIONS: ₹${rowData.otherDeductions || rowData.pf}

NET SALARY: ₹${rowData.netSalary}

Payment Status: PAID
========================================
    `;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Payslip_${rowData.month.replace(" ", "_")}_${rowData.employeeId?.name || "Employee"}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div className="d-flex gap-2">
        <button
          className="action-btn-outline"
          onClick={() => setSelectedPayslip(rowData)}
          title="View Payslip"
        >
          <i className="pi pi-eye" style={{ fontSize: "12px" }}></i>
        </button>
        <button
          className="action-btn-outline"
          style={{ borderColor: "#0d6efd", color: "#0d6efd" }}
          onClick={() => downloadPayslip(rowData)}
          title="Download Payslip"
        >
          <i className="pi pi-download" style={{ fontSize: "12px" }}></i>
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold m-0" style={{ color: "var(--burgundy-dark)" }}>
            {user.role === "manager" ? "All Payslips" : "My Payslips"}
          </h2>
          <p className="text-muted mt-1">
            View and download final processed salary documents.
          </p>
        </div>
      </div>

      <Card className="shadow-sm border-0">
        <DataTable
          value={payrolls}
          paginator
          rows={10}
          dataKey="_id"
          emptyMessage="No generated payslips found."
        >
          {user.role === "manager" && (
            <Column field="employeeId.name" header="Employee" sortable></Column>
          )}
          <Column field="month" header="Month" sortable></Column>
          <Column
            field="netSalary"
            header="Net Salary"
            sortable
            body={(row) => `₹${row.netSalary}`}
          ></Column>
          <Column
            header="Actions"
            body={actionBodyTemplate}
            exportable={false}
            style={{ minWidth: "8rem" }}
          ></Column>
        </DataTable>
      </Card>

      {/* View Payslip Dialog */}
      <Dialog header="Salary Payslip Document" visible={!!selectedPayslip} style={{ width: '50vw' }} onHide={() => setSelectedPayslip(null)}>
        {selectedPayslip && (
          <div>
            {/* Printable Area */}
            <div id="printable-payslip" className="p-5 bg-white border" style={{ color: '#000', fontFamily: 'Arial, sans-serif' }}>
              <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom border-2 border-dark">
                <div>
                  <h2 className="fw-bold m-0" style={{color: 'var(--burgundy-dark)'}}>PayLedger Technologies</h2>
                  <p className="m-0" style={{fontSize: '12px', color: '#555'}}>123 Business Avenue, Tech District, City</p>
                </div>
                <div className="text-end">
                  <h3 className="fw-bold m-0 text-uppercase" style={{letterSpacing: '2px'}}>Payslip</h3>
                  <p className="m-0 text-muted">{selectedPayslip.month}</p>
                </div>
              </div>
              
              <div className="row mb-4">
                <div className="col-6">
                  <table className="table table-sm table-borderless m-0">
                    <tbody>
                      <tr><td className="text-muted" style={{width:'120px'}}>Employee Name:</td><td className="fw-bold">{selectedPayslip.employeeId?.name || 'Unknown'}</td></tr>
                      <tr><td className="text-muted">Employee ID:</td><td className="fw-bold">{selectedPayslip.employeeId?.employeeId || 'N/A'}</td></tr>
                      <tr><td className="text-muted">Department:</td><td className="fw-bold">{selectedPayslip.employeeId?.department || 'N/A'}</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-6">
                  <table className="table table-sm table-borderless m-0">
                    <tbody>
                      <tr><td className="text-muted" style={{width:'120px'}}>Designation:</td><td className="fw-bold">{selectedPayslip.employeeId?.designation || 'N/A'}</td></tr>
                      <tr><td className="text-muted">Payment Date:</td><td className="fw-bold">{new Date().toLocaleDateString()}</td></tr>
                      <tr><td className="text-muted">Status:</td><td className="fw-bold text-success">PAID</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-6">
                  <div className="border p-0">
                    <div className="bg-light p-2 border-bottom fw-bold text-uppercase" style={{fontSize: '12px'}}>Earnings</div>
                    <table className="table table-sm m-0">
                      <tbody>
                        <tr><td className="p-2">Basic Salary</td><td className="text-end p-2">₹{selectedPayslip.basicSalary.toLocaleString()}</td></tr>
                        <tr><td className="p-2">HRA</td><td className="text-end p-2">₹{selectedPayslip.hra ? selectedPayslip.hra.toLocaleString() : '0'}</td></tr>
                        <tr><td className="p-2">DA</td><td className="text-end p-2">₹{selectedPayslip.da ? selectedPayslip.da.toLocaleString() : '0'}</td></tr>
                        <tr><td className="p-2">Other Allowances</td><td className="text-end p-2">₹{(selectedPayslip.allowances || 0).toLocaleString()}</td></tr>
                        <tr className="bg-light fw-bold"><td className="p-2 border-0">Gross Earnings</td><td className="text-end p-2 border-0">₹{(selectedPayslip.basicSalary + (selectedPayslip.allowances || (selectedPayslip.hra + selectedPayslip.da))).toLocaleString()}</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-6">
                  <div className="border p-0 h-100">
                    <div className="bg-light p-2 border-bottom fw-bold text-uppercase" style={{fontSize: '12px'}}>Deductions</div>
                    <table className="table table-sm m-0">
                      <tbody>
                        <tr><td className="p-2">Provident Fund</td><td className="text-end p-2">₹{selectedPayslip.pf ? selectedPayslip.pf.toLocaleString() : '0'}</td></tr>
                        <tr><td className="p-2">Income Tax</td><td className="text-end p-2">₹{selectedPayslip.tax ? selectedPayslip.tax.toLocaleString() : '0'}</td></tr>
                        <tr><td className="p-2">Other Deductions</td><td className="text-end p-2">₹{(selectedPayslip.otherDeductions || 0).toLocaleString()}</td></tr>
                        <tr><td className="p-2 border-0">&nbsp;</td><td className="p-2 border-0"></td></tr>
                        <tr className="bg-light fw-bold"><td className="p-2 border-0">Total Deductions</td><td className="text-end p-2 border-0">₹{(selectedPayslip.otherDeductions || selectedPayslip.pf || 0).toLocaleString()}</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="border border-2 border-dark p-3 d-flex justify-content-between align-items-center bg-light">
                <h5 className="m-0 fw-bold text-uppercase" style={{letterSpacing: '1px'}}>Net Salary Payable</h5>
                <h3 className="m-0 fw-bold">₹{selectedPayslip.netSalary.toLocaleString()}</h3>
              </div>
              <p className="text-muted text-center mt-4 mb-0" style={{fontSize: '11px'}}>This is a computer generated document and does not require a signature.</p>
            </div>

            <div className="text-end mt-4 gap-2 d-flex justify-content-end">
              <Button label="Download TXT" icon="pi pi-file" className="p-button-outlined p-button-secondary" onClick={() => downloadPayslip(selectedPayslip)} />
              <Button label="Print PDF" icon="pi pi-print" className="btn-burgundy px-4" onClick={() => {
                const printContent = document.getElementById('printable-payslip').innerHTML;
                const originalContent = document.body.innerHTML;
                document.body.innerHTML = printContent;
                window.print();
                document.body.innerHTML = originalContent;
                window.location.reload(); 
              }} />
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
