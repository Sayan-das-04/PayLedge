import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import Employees from './components/Employees';
import Attendance from './components/Attendance';
import Leaves from './components/Leaves';
import Payroll from './components/Payroll';
import Payslips from './components/Payslips';
import Reports from './components/Reports';
import Settings from './components/Settings';
import Login from './components/Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <Router>
      <div className="d-flex flex-column" style={{ minHeight: '100vh', backgroundColor: 'var(--cream-bg)' }}>
        <Topbar user={user} onLogout={() => setUser(null)} />
        <div className="flex-grow-1 d-flex flex-column" style={{ overflow: 'hidden' }}>
          <div className="flex-grow-1" style={{ overflowY: 'auto' }}>
            {/* Main Content Area constrained by container */}
            <div className="container py-4" style={{ minHeight: '85vh' }}>
              <Routes>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/attendance" element={<Attendance user={user} />} />
                <Route path="/leaves" element={<Leaves user={user} />} />
                <Route path="/payroll" element={<Payroll user={user} />} />
                <Route path="/payslips" element={<Payslips user={user} />} />
                <Route path="/reports" element={<Reports user={user} />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </div>
            
            {/* Full-width Dark Premium Footer */}
            <footer style={{ backgroundColor: 'var(--burgundy-dark)', color: '#FFFFFF' }} className="pt-5 pb-4 mt-5">
              <div className="container">
                <div className="row mb-5">
                  <div className="col-md-4 mb-4 mb-md-0">
                    <h3 className="fw-bold m-0 fst-italic text-white mb-2">
                      <i className="pi pi-shield me-2" style={{ color: 'var(--gold)' }}></i>
                      PayLedger
                    </h3>
                    <p className="mb-0" style={{color: '#E7C7CF', fontSize: '15px'}}>Payroll & Workforce Management</p>
                  </div>
                  
                  <div className="col-md-2 offset-md-2">
                    <h6 className="fw-bold mb-3 text-white">Company</h6>
                    <a href="#" className="footer-link">About PayLedger</a>
                    <a href="#" className="footer-link">Features</a>
                    <a href="#" className="footer-link">Careers</a>
                    <a href="#" className="footer-link">Contact</a>
                  </div>

                  <div className="col-md-2">
                    <h6 className="fw-bold mb-3 text-white">Resources</h6>
                    <a href="#" className="footer-link">Help Center</a>
                    <a href="#" className="footer-link">Documentation</a>
                    <a href="#" className="footer-link">Support</a>
                  </div>

                  <div className="col-md-2">
                    <h6 className="fw-bold mb-3 text-white">Legal</h6>
                    <a href="#" className="footer-link">Privacy Policy</a>
                    <a href="#" className="footer-link">Terms of Service</a>
                    <a href="#" className="footer-link">Security</a>
                  </div>
                </div>
                
                <div className="d-flex justify-content-between pt-4 align-items-center" style={{borderTop: '1px solid rgba(255,255,255,0.12)'}}>
                  <span style={{color: '#E7C7CF', fontSize: '13px'}}>© {new Date().getFullYear()} PayLedger. All rights reserved.</span>
                  <div className="d-flex gap-3">
                     <a href="#" className="footer-link mb-0"><i className="pi pi-linkedin me-1"></i> LinkedIn</a>
                     <a href="#" className="footer-link mb-0"><i className="pi pi-github me-1"></i> GitHub</a>
                     <a href="#" className="footer-link mb-0"><i className="pi pi-envelope me-1"></i> Support</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
