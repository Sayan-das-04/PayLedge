import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Sidebar({ user, onLogout }) {
  return (
    <div className="sidebar-container d-flex flex-column m-3 rounded-4 shadow" style={{ width: '250px', zIndex: 10 }}>
      {/* Logo Section */}
      <div className="p-4 pt-4 pb-3 d-flex align-items-center gap-2">
        <div style={{ color: '#FBBF24', fontSize: '1.5rem', fontWeight: '900', fontStyle: 'italic', letterSpacing: '-1px' }}>P</div>
        <h4 className="m-0 fw-bold" style={{ color: '#FBBF24' }}>PayFlow</h4>
      </div>
      
      {/* Navigation Links */}
      <nav className="flex-grow-1 px-3 mt-2 d-flex flex-column gap-1">
        <NavLink to="/" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <i className="pi pi-home me-3" style={{ fontSize: '1.1rem' }}></i>Dashboard
        </NavLink>
        {user.role === 'manager' && (
          <NavLink to="/employees" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <i className="pi pi-users me-3" style={{ fontSize: '1.1rem' }}></i>Employees
          </NavLink>
        )}
        <NavLink to="/attendance" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <i className="pi pi-clock me-3" style={{ fontSize: '1.1rem' }}></i>Attendance
        </NavLink>
        <NavLink to="/leaves" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <i className="pi pi-calendar-times me-3" style={{ fontSize: '1.1rem' }}></i>Leave Management
        </NavLink>
        {user.role === 'manager' && (
          <NavLink to="/payroll" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <i className="pi pi-calculator me-3" style={{ fontSize: '1.1rem' }}></i>Payroll
          </NavLink>
        )}
        <NavLink to="/payslips" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <i className="pi pi-file me-3" style={{ fontSize: '1.1rem' }}></i>Payslips
        </NavLink>
        {user.role === 'manager' && (
          <NavLink to="/reports" className={({isActive}) => `sidebar-link ${isActive ? 'active' : ''}`}>
            <i className="pi pi-chart-bar me-3" style={{ fontSize: '1.1rem' }}></i>Reports
          </NavLink>
        )}
        <NavLink to="/settings" className="sidebar-link text-white-50">
          <i className="pi pi-cog me-3" style={{ fontSize: '1.1rem' }}></i>Settings
        </NavLink>
      </nav>

      {/* User Profile Section at Bottom */}
      <div className="p-4 mt-auto mb-2 border-top border-secondary border-opacity-25">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div className="bg-secondary bg-opacity-50 text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 40, height: 40, fontSize: '1.1rem', fontWeight: 'bold' }}>
            {user.name ? user.name.charAt(0).toUpperCase() : 'M'}
          </div>
          <div className="flex-grow-1 overflow-hidden">
            <div className="fw-bold text-truncate text-white" style={{fontSize: '14px'}}>{user.name || 'Manager'}</div>
            <small className="text-white-50 text-truncate d-block" style={{fontSize: '11px'}}>{user.email}</small>
          </div>
        </div>
        <button onClick={onLogout} className="btn btn-outline-light w-100 d-flex align-items-center justify-content-center gap-2 border-opacity-25" style={{ fontSize: '13px' }}>
          <i className="pi pi-sign-out"></i> Logout
        </button>
      </div>
    </div>
  );
}
