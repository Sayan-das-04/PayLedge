import React, { useState } from 'react';
import { Card } from 'primereact/card';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('company');

  return (
    <div>
      <div className="mb-4">
        <h2 className="fw-bold m-0 text-dark">Settings</h2>
        <p className="text-muted mb-0">Manage system configurations and preferences.</p>
      </div>

      <div className="row">
        {/* Settings Sidebar */}
        <div className="col-md-3 mb-4">
          <Card className="shadow-sm border-0 h-100 p-0">
            <div className="d-flex flex-column">
              <button 
                className={`btn text-start p-3 border-0 rounded-0 ${activeTab === 'company' ? 'bg-light fw-bold' : 'text-muted'}`}
                style={{ color: activeTab === 'company' ? 'var(--burgundy-dark)' : 'inherit', borderLeft: activeTab === 'company' ? '4px solid var(--burgundy-light)' : '4px solid transparent' }}
                onClick={() => setActiveTab('company')}
              >
                <i className="pi pi-building me-3"></i> Company Profile
              </button>
              <button 
                className={`btn text-start p-3 border-0 rounded-0 ${activeTab === 'preferences' ? 'bg-light fw-bold' : 'text-muted'}`}
                style={{ color: activeTab === 'preferences' ? 'var(--burgundy-dark)' : 'inherit', borderLeft: activeTab === 'preferences' ? '4px solid var(--burgundy-light)' : '4px solid transparent' }}
                onClick={() => setActiveTab('preferences')}
              >
                <i className="pi pi-sliders-h me-3"></i> Preferences
              </button>
              <button 
                className={`btn text-start p-3 border-0 rounded-0 ${activeTab === 'notifications' ? 'bg-light fw-bold' : 'text-muted'}`}
                style={{ color: activeTab === 'notifications' ? 'var(--burgundy-dark)' : 'inherit', borderLeft: activeTab === 'notifications' ? '4px solid var(--burgundy-light)' : '4px solid transparent' }}
                onClick={() => setActiveTab('notifications')}
              >
                <i className="pi pi-bell me-3"></i> Notifications
              </button>
              <button 
                className={`btn text-start p-3 border-0 rounded-0 ${activeTab === 'security' ? 'bg-light fw-bold' : 'text-muted'}`}
                style={{ color: activeTab === 'security' ? 'var(--burgundy-dark)' : 'inherit', borderLeft: activeTab === 'security' ? '4px solid var(--burgundy-light)' : '4px solid transparent' }}
                onClick={() => setActiveTab('security')}
              >
                <i className="pi pi-lock me-3"></i> Security
              </button>
            </div>
          </Card>
        </div>

        {/* Settings Content */}
        <div className="col-md-9">
          <Card className="shadow-sm border-0">
            {activeTab === 'company' && (
              <div>
                <h5 className="fw-bold mb-4 border-bottom pb-2">Company Profile</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-muted" style={{fontSize: '13px'}}>Company Name</label>
                    <input type="text" className="form-control" defaultValue="PayLedger Technologies" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted" style={{fontSize: '13px'}}>Registration Number</label>
                    <input type="text" className="form-control" defaultValue="PL-9021-X8" />
                  </div>
                  <div className="col-12">
                    <label className="form-label text-muted" style={{fontSize: '13px'}}>Address</label>
                    <textarea className="form-control" rows="3" defaultValue="123 Business Avenue, Tech District, City 10001"></textarea>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted" style={{fontSize: '13px'}}>Contact Email</label>
                    <input type="email" className="form-control" defaultValue="admin@payledger.com" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted" style={{fontSize: '13px'}}>Contact Phone</label>
                    <input type="text" className="form-control" defaultValue="+1 (555) 019-2831" />
                  </div>
                  <div className="col-12 mt-4 text-end">
                    <button className="btn text-white px-4" style={{ backgroundColor: 'var(--burgundy-light)' }}>Save Changes</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div>
                <h5 className="fw-bold mb-4 border-bottom pb-2">System Preferences</h5>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label text-muted" style={{fontSize: '13px'}}>Default Currency</label>
                    <select className="form-select">
                      <option value="INR">₹ Indian Rupee (INR)</option>
                      <option value="USD">$ US Dollar (USD)</option>
                      <option value="EUR">€ Euro (EUR)</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted" style={{fontSize: '13px'}}>Timezone</label>
                    <select className="form-select">
                      <option value="IST">(UTC+05:30) Asia/Kolkata</option>
                      <option value="UTC">(UTC+00:00) Universal Time</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted" style={{fontSize: '13px'}}>Date Format</label>
                    <select className="form-select">
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    </select>
                  </div>
                  <div className="col-12 mt-4 text-end">
                    <button className="btn text-white px-4" style={{ backgroundColor: 'var(--burgundy-light)' }}>Save Preferences</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h5 className="fw-bold mb-4 border-bottom pb-2">Notification Settings</h5>
                <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
                  <div>
                    <h6 className="m-0 fw-bold">Email Notifications</h6>
                    <small className="text-muted">Receive emails for payroll processing and leave requests.</small>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input fs-4" type="checkbox" defaultChecked />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3 p-3 bg-light rounded">
                  <div>
                    <h6 className="m-0 fw-bold">Daily Summary Reports</h6>
                    <small className="text-muted">Receive a daily digest of attendance and pending leaves.</small>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input fs-4" type="checkbox" defaultChecked />
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                  <div>
                    <h6 className="m-0 fw-bold">Employee Alerts</h6>
                    <small className="text-muted">Notify employees instantly when payslips are generated.</small>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input fs-4" type="checkbox" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h5 className="fw-bold mb-4 border-bottom pb-2">Security & Password</h5>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label text-muted" style={{fontSize: '13px'}}>Current Password</label>
                    <input type="password" className="form-control" placeholder="••••••••" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted" style={{fontSize: '13px'}}>New Password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label text-muted" style={{fontSize: '13px'}}>Confirm New Password</label>
                    <input type="password" className="form-control" />
                  </div>
                  <div className="col-12 mt-4">
                    <button className="btn text-white px-4 me-2" style={{ backgroundColor: 'var(--burgundy-light)' }}>Update Password</button>
                  </div>
                  
                  <div className="col-12 mt-5">
                    <h6 className="text-danger fw-bold mb-2">Two-Factor Authentication (2FA)</h6>
                    <p className="text-muted" style={{fontSize: '14px'}}>Add an extra layer of security to your account. We recommend leaving this enabled for Manager accounts.</p>
                    <button className="btn btn-outline-secondary">Enable 2FA</button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
