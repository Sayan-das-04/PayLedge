import React, { useState, useEffect } from 'react';
import { Card } from 'primereact/card';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Dashboard({ user }) {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ employees: 0, present: 0, totalPayroll: 0, pending: 0 });
  const [recentEmployees, setRecentEmployees] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const empRes = await axios.get('https://payledge.onrender.com/api/employees');
        const attRes = await axios.get('https://payledge.onrender.com/api/attendance');
        const payRes = await axios.get('https://payledge.onrender.com/api/payroll');
        const leaveRes = await axios.get('https://payledge.onrender.com/api/leaves');
        
        const todayStr = new Date().toISOString().split('T')[0];
        
        // Deduplicate attendance records (some employees might have punched in twice)
        const todaysAttendanceMap = new Map();
        attRes.data.forEach(a => {
           if (a.date && a.date.startsWith(todayStr)) {
               const empId = typeof a.employeeId === 'object' ? a.employeeId._id : a.employeeId;
               todaysAttendanceMap.set(empId, a.status);
           }
        });
        
        let presentCount = 0;
        let absentCount = 0;
        todaysAttendanceMap.forEach(status => {
           if (status === 'Present') presentCount++;
           if (status === 'Absent') absentCount++;
        });
        
        const totalPayroll = payRes.data.reduce((sum, p) => sum + p.netSalary, 0);
        const pendingLeaves = leaveRes.data.filter(l => l.status === 'Pending').length;
        // Check for today's approved leaves
        const onLeaveCount = leaveRes.data.filter(l => 
          l.status === 'Approved' && l.startDate <= todayStr && l.endDate >= todayStr
        ).length;

        setStats({
          employees: empRes.data.length,
          present: presentCount,
          totalPayroll: totalPayroll,
          pending: pendingLeaves,
          absent: absentCount,
          onLeave: onLeaveCount
        });
        
        setRecentEmployees(empRes.data.slice(-5).reverse());
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="fw-bold m-0 text-dark">Dashboard</h2>
          <p className="text-muted mb-0">Welcome back, {user?.name}! Here's what's happening today.</p>
        </div>
        <div className="text-muted" style={{fontSize: '14px'}}>
          <i className="pi pi-calendar me-2"></i> {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </div>

      {/* STATS ROW */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <Card className="shadow-sm border-0 h-100 p-0">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted d-block mb-1" style={{fontSize: '14px'}}>Total Employees</span>
                <h2 className="fw-bold m-0">{stats.employees}</h2>
              </div>
              <div className="stat-icon-circle">
                <i className="pi pi-users"></i>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="shadow-sm border-0 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted d-block mb-1" style={{fontSize: '14px'}}>Present Today</span>
                <h2 className="fw-bold m-0">{stats.present}</h2>
              </div>
              <div className="stat-icon-circle">
                <i className="pi pi-user-plus"></i>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="shadow-sm border-0 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted d-block mb-1" style={{fontSize: '14px'}}>Total Payroll</span>
                <h2 className="fw-bold m-0" style={{color: 'var(--burgundy-light)'}}>₹ {stats.totalPayroll.toLocaleString()}</h2>
              </div>
              <div className="stat-icon-circle">
                <i className="pi pi-wallet"></i>
              </div>
            </div>
          </Card>
        </div>
        <div className="col-md-3">
          <Card className="shadow-sm border-0 h-100">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <span className="text-muted d-block mb-1" style={{fontSize: '14px'}}>Pending Leaves</span>
                <h2 className="fw-bold m-0">{stats.pending}</h2>
              </div>
              <div className="stat-icon-circle">
                <i className="pi pi-calendar"></i>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* MIDDLE ROW */}
      <div className="row g-4 mb-4">
        {/* Mock Chart Area */}
        <div className="col-md-5">
          <Card className="shadow-sm border-0 h-100" title={<h6 className="fw-bold m-0">Payroll Overview</h6>}>
            <div className="d-flex align-items-end justify-content-between pt-4" style={{height: '150px', borderBottom: '1px solid #eee'}}>
              {/* Dummy bars */}
              <div style={{width: '30px', height: '40%', backgroundColor: '#fecdd3', borderRadius: '4px 4px 0 0'}}></div>
              <div style={{width: '30px', height: '50%', backgroundColor: '#fda4af', borderRadius: '4px 4px 0 0'}}></div>
              <div style={{width: '30px', height: '60%', backgroundColor: '#4c0519', borderRadius: '4px 4px 0 0'}}></div>
              <div style={{width: '30px', height: '70%', backgroundColor: '#9f1239', borderRadius: '4px 4px 0 0'}}></div>
              <div style={{width: '30px', height: '80%', backgroundColor: '#be123c', borderRadius: '4px 4px 0 0'}}></div>
              <div style={{width: '30px', height: '90%', backgroundColor: '#881337', borderRadius: '4px 4px 0 0'}}></div>
            </div>
            <div className="d-flex justify-content-between text-muted mt-2" style={{fontSize: '12px'}}>
              <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
            </div>
          </Card>
        </div>
        
        {/* Real Donut Area */}
        <div className="col-md-4">
          <Card className="shadow-sm border-0 h-100" title={<h6 className="fw-bold m-0">Attendance Today</h6>}>
            <div className="d-flex align-items-center justify-content-center pt-2 gap-4">
              {(() => {
                const percentage = Math.min(100, Math.round((stats.present / Math.max(1, stats.employees)) * 100)) || 0;
                return (
                  <div style={{
                    width: '120px', height: '120px', borderRadius: '50%', 
                    background: `conic-gradient(var(--burgundy-light) ${percentage}%, #fecdd3 ${percentage}% 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                     <div style={{
                       width: '90px', height: '90px', borderRadius: '50%', 
                       background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'
                     }}>
                        <div className="text-center">
                          <strong className="fs-4 d-block">{percentage}%</strong>
                          <small className="text-muted">Present</small>
                        </div>
                     </div>
                  </div>
                );
              })()}
              <div>
                <div className="mb-2" style={{fontSize: '13px'}}><span className="d-inline-block rounded-circle me-2" style={{width: '8px', height: '8px', background: 'var(--burgundy-light)'}}></span>Present <b className="float-end ms-3">{stats.present}</b></div>
                <div className="mb-2" style={{fontSize: '13px'}}><span className="d-inline-block rounded-circle me-2" style={{width: '8px', height: '8px', background: '#fecdd3'}}></span>Absent <b className="float-end ms-3">{stats.absent || 0}</b></div>
                <div className="mb-2" style={{fontSize: '13px'}}><span className="d-inline-block rounded-circle me-2" style={{width: '8px', height: '8px', background: '#fed7aa'}}></span>On Leave <b className="float-end ms-3">{stats.onLeave || 0}</b></div>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="col-md-3">
          <Card className="shadow-sm border-0 h-100" title={<h6 className="fw-bold m-0">Quick Actions</h6>}>
            <div className="d-flex flex-column gap-2 mt-2">
              <button className="quick-action-btn primary" onClick={() => navigate('/employees')}><i className="pi pi-user-plus"></i> Add Employee</button>
              <button className="quick-action-btn" onClick={() => navigate('/attendance')}><i className="pi pi-check-circle"></i> Mark Attendance</button>
              <button className="quick-action-btn" onClick={() => navigate('/payroll')}><i className="pi pi-calculator"></i> Calculate Payroll</button>
              <button className="quick-action-btn" onClick={() => navigate('/payroll')}><i className="pi pi-file"></i> Generate Payslip</button>
            </div>
          </Card>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="row g-4">
        <div className="col-12">
          <Card className="shadow-sm border-0 h-100 p-0" title={<div className="d-flex justify-content-between"><h6 className="fw-bold m-0">Recent Employees</h6><a href="#" className="text-decoration-none text-muted" style={{fontSize:'13px'}} onClick={()=>navigate('/employees')}>View All</a></div>}>
            <DataTable value={recentEmployees} emptyMessage="No recent employees found." size="small" stripedRows>
              <Column field="employeeId" header="Employee ID" style={{color: 'var(--text-gray)', fontSize: '13px'}}></Column>
              <Column field="name" header="Name" style={{fontWeight: 500, fontSize: '14px'}}></Column>
              <Column field="department" header="Department" style={{fontSize: '13px'}}></Column>
              <Column field="designation" header="Designation" style={{fontSize: '13px'}}></Column>
              <Column field="status" header="Status" body={(r) => <span className="text-success fw-bold" style={{fontSize: '13px'}}>{r.status}</span>}></Column>
            </DataTable>
          </Card>
        </div>
      </div>
    </div>
  );
}
