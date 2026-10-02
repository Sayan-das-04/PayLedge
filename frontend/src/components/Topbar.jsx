import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export default function Topbar({ user, onLogout }) {

  const linkClass = ({ isActive }) =>
    `text-decoration-none nav-link-custom ${
      isActive ? 'active-nav-link' : ''
    }`;

  return (
    <header className="payledger-topbar">

      {/* ================= LEFT ================= */}
      <div className="topbar-left">
        
        {/* Mobile Menu Toggle */}
        <button 
          className="btn d-lg-none me-2 text-white border-0 shadow-none" 
          type="button" 
          data-bs-toggle="offcanvas" 
          data-bs-target="#mobileMenu"
        >
          <i className="pi pi-bars fs-4"></i>
        </button>

        {/* Logo */}
        <Link to="/" className="payledger-brand">

          <div className="payledger-logo">
            PL
          </div>

          <span className="payledger-name">
            PayLedger
          </span>

        </Link>


        {/* Navigation */}
        <nav className="payledger-nav">

          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/employees" className={linkClass}>
            Employees
          </NavLink>

          <NavLink to="/attendance" className={linkClass}>
            Attendance
          </NavLink>

          <NavLink to="/leaves" className={linkClass}>
            Leaves
          </NavLink>

          {user?.role === 'manager' && (
            <NavLink to="/payroll" className={linkClass}>
              Payroll
            </NavLink>
          )}

          <NavLink to="/payslips" className={linkClass}>
            Payslips
          </NavLink>

          {user?.role === 'manager' && (
            <NavLink to="/reports" className={linkClass}>
              Reports
            </NavLink>
          )}

        </nav>

      </div>


      {/* ================= RIGHT ================= */}
      <div className="topbar-right">

        {/* Notification */}
        <button
          type="button"
          className="notification-button"
          title="Notifications"
        >

          <i className="pi pi-bell"></i>

          <span className="notification-badge">
            3
          </span>

        </button>


        {/* Profile */}
        <div className="dropdown">

          <button
            type="button"
            className="profile-button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >

            <div className="profile-avatar">
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : 'U'}
            </div>

            <div className="profile-info">

              <span className="profile-name">
                {user?.name || 'User'}
              </span>

              <span className="profile-role">
                {user?.role || 'Employee'}
              </span>

            </div>

            <i className="pi pi-angle-down profile-arrow"></i>

          </button>


          {/* Dropdown */}
          <ul className="dropdown-menu dropdown-menu-end payledger-dropdown">

            <li className="profile-dropdown-header">

              <div className="profile-avatar large">
                {user?.name
                  ? user.name.charAt(0).toUpperCase()
                  : 'U'}
              </div>

              <div>
                <strong>
                  {user?.name || 'User'}
                </strong>

                <span>
                  {user?.role || 'Employee'}
                </span>
              </div>

            </li>


            <li>
              <Link
                to="/profile"
                className="dropdown-item payledger-dropdown-item"
              >
                <i className="pi pi-user"></i>
                My Profile
              </Link>
            </li>


            <li>
              <Link
                to="/settings"
                className="dropdown-item payledger-dropdown-item"
              >
                <i className="pi pi-cog"></i>
                Settings
              </Link>
            </li>


            <li>
              <Link
                to="/change-password"
                className="dropdown-item payledger-dropdown-item"
              >
                <i className="pi pi-lock"></i>
                Change Password
              </Link>
            </li>


            <li>
              <hr className="dropdown-divider" />
            </li>


            <li>
              <button
                className="dropdown-item payledger-dropdown-item logout-item"
                onClick={onLogout}
              >
                <i className="pi pi-sign-out"></i>
                Logout
              </button>
            </li>

          </ul>

        </div>

      </div>

      {/* ================= MOBILE MENU (OFFCANVAS) ================= */}
      <div className="offcanvas offcanvas-start d-lg-none" tabIndex="-1" id="mobileMenu" style={{ backgroundColor: 'var(--burgundy-dark)', width: '280px' }}>
        <div className="offcanvas-header border-bottom border-light" style={{ borderColor: 'rgba(255,255,255,0.1) !important' }}>
          <h5 className="offcanvas-title text-white fw-bold d-flex align-items-center gap-2">
            <div className="payledger-logo" style={{width: 32, height: 32, fontSize: '11px'}}>PL</div>
            PayLedger
          </h5>
          <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
        </div>
        <div className="offcanvas-body p-0">
          <div className="d-flex flex-column p-3 gap-2">
            <NavLink to="/" className={linkClass} data-bs-dismiss="offcanvas">Dashboard</NavLink>
            <NavLink to="/employees" className={linkClass} data-bs-dismiss="offcanvas">Employees</NavLink>
            <NavLink to="/attendance" className={linkClass} data-bs-dismiss="offcanvas">Attendance</NavLink>
            <NavLink to="/leaves" className={linkClass} data-bs-dismiss="offcanvas">Leaves</NavLink>
            {user?.role === 'manager' && (
              <NavLink to="/payroll" className={linkClass} data-bs-dismiss="offcanvas">Payroll</NavLink>
            )}
            <NavLink to="/payslips" className={linkClass} data-bs-dismiss="offcanvas">Payslips</NavLink>
            {user?.role === 'manager' && (
              <NavLink to="/reports" className={linkClass} data-bs-dismiss="offcanvas">Reports</NavLink>
            )}
          </div>
        </div>
      </div>

    </header>
  );
}
