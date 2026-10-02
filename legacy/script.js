/* =========================================================
   PAYFLOW - COMPREHENSIVE PAYROLL MANAGEMENT SYSTEM
   ========================================================= */

// --- INITIAL DEMO DATA ---
const DEFAULT_EMPLOYEES = [
    {
        id: "EMP001",
        name: "Rahul Sharma",
        department: "IT",
        designation: "Software Developer",
        salary: 30000,
        status: "Active",
        joiningDate: "2024-02-15",
        phone: "+91 98765 11001",
        email: "rahul.sharma@payflow.com"
    },
    {
        id: "EMP002",
        name: "Priya Das",
        department: "HR",
        designation: "HR Executive",
        salary: 25000,
        status: "Active",
        joiningDate: "2024-05-10",
        phone: "+91 98765 11002",
        email: "priya.das@payflow.com"
    },
    {
        id: "EMP003",
        name: "Amit Roy",
        department: "Finance",
        designation: "Accountant",
        salary: 28000,
        status: "Active",
        joiningDate: "2023-11-01",
        phone: "+91 98765 11003",
        email: "amit.roy@payflow.com"
    },
    {
        id: "EMP004",
        name: "Sneha Gupta",
        department: "Marketing",
        designation: "Marketing Executive",
        salary: 22000,
        status: "Active",
        joiningDate: "2024-08-20",
        phone: "+91 98765 11004",
        email: "sneha.gupta@payflow.com"
    },
    {
        id: "EMP005",
        name: "Arjun Singh",
        department: "IT",
        designation: "System Analyst",
        salary: 25000,
        status: "Active",
        joiningDate: "2024-01-12",
        phone: "+91 98765 11005",
        email: "arjun.singh@payflow.com"
    }
];

const DEFAULT_PERMISSIONS = {
    EMP001: { role: "Employee", viewAttendance: true, applyLeave: true, viewPayroll: true, viewPayslip: true, editProfile: false },
    EMP002: { role: "HR Executive", viewAttendance: true, applyLeave: true, viewPayroll: true, viewPayslip: true, editProfile: true },
    EMP003: { role: "Accountant", viewAttendance: true, applyLeave: true, viewPayroll: true, viewPayslip: true, editProfile: false },
    EMP004: { role: "Employee", viewAttendance: true, applyLeave: true, viewPayroll: true, viewPayslip: true, editProfile: false },
    EMP005: { role: "Employee", viewAttendance: true, applyLeave: true, viewPayroll: true, viewPayslip: true, editProfile: false }
};

const DEFAULT_ATTENDANCE = {
    "2026-10-01": {
        EMP001: { status: "Present", punchIn: "09:05 AM", punchOut: "06:10 PM" },
        EMP002: { status: "Present", punchIn: "08:55 AM", punchOut: "05:45 PM" },
        EMP003: { status: "Present", punchIn: "09:12 AM", punchOut: "06:00 PM" },
        EMP004: { status: "Absent", punchIn: "-", punchOut: "-" },
        EMP005: { status: "Present", punchIn: "09:00 AM", punchOut: "06:00 PM" }
    }
};

const DEFAULT_LEAVES = [
    {
        id: 1,
        employeeId: "EMP002",
        type: "Casual Leave",
        from: "2026-09-28",
        to: "2026-09-29",
        days: 2,
        reason: "Personal family work",
        status: "Pending",
        appliedOn: "2026-09-25"
    },
    {
        id: 2,
        employeeId: "EMP003",
        type: "Sick Leave",
        from: "2026-09-25",
        to: "2026-09-26",
        days: 2,
        reason: "Viral fever and doctor consultation",
        status: "Approved",
        appliedOn: "2026-09-24"
    },
    {
        id: 3,
        employeeId: "EMP004",
        type: "Earned Leave",
        from: "2026-09-20",
        to: "2026-09-22",
        days: 3,
        reason: "Attending cousin wedding in hometown",
        status: "Rejected",
        appliedOn: "2026-09-18"
    }
];

const DEFAULT_PAYROLL_HISTORY = [
    {
        id: "PAY-2026-09-EMP001",
        employeeId: "EMP001",
        month: "September 2026",
        basic: 30000,
        hra: 12000,
        da: 3000,
        allowances: 2000,
        gross: 47000,
        pf: 3600,
        esi: 0,
        profTax: 200,
        tds: 500,
        lopDeduction: 0,
        deductions: 4300,
        net: 42700,
        status: "Paid",
        paymentDate: "2026-09-30",
        paymentMethod: "Direct Bank Transfer",
        workingDays: 30,
        presentDays: 30,
        lopDays: 0
    },
    {
        id: "PAY-2026-09-EMP002",
        employeeId: "EMP002",
        month: "September 2026",
        basic: 25000,
        hra: 10000,
        da: 2500,
        allowances: 1500,
        gross: 39000,
        pf: 3000,
        esi: 0,
        profTax: 200,
        tds: 0,
        lopDeduction: 0,
        deductions: 3200,
        net: 35800,
        status: "Paid",
        paymentDate: "2026-09-30",
        paymentMethod: "Direct Bank Transfer",
        workingDays: 30,
        presentDays: 30,
        lopDays: 0
    },
    {
        id: "PAY-2026-09-EMP003",
        employeeId: "EMP003",
        month: "September 2026",
        basic: 28000,
        hra: 11200,
        da: 2800,
        allowances: 1000,
        gross: 43000,
        pf: 3360,
        esi: 0,
        profTax: 200,
        tds: 400,
        lopDeduction: 0,
        deductions: 3960,
        net: 39040,
        status: "Pending",
        paymentDate: "-",
        paymentMethod: "Pending Approval",
        workingDays: 30,
        presentDays: 30,
        lopDays: 0
    }
];

const DEFAULT_SETTINGS = {
    companyName: "PayFlow Technologies Pvt Ltd",
    companyEmail: "payroll@payflow.com",
    companyPhone: "+91 98765 43210",
    companyAddress: "Tech Park, Sector 5, Bengaluru, Karnataka - 560100",
    currency: "₹",
    payrollCycle: "Monthly",
    standardWorkingDays: 30,
    pfRate: 12,
    esiRate: 0.75,
    hraRate: 40,
    daRate: 10,
    clQuota: 12,
    slQuota: 10,
    plQuota: 15
};

// --- SYSTEM STATE ---
let employees = [];
let employeePermissions = {};
let attendanceRecords = {};
let leaveRequests = [];
let payrollHistory = [];
let payslips = [];
let settings = {};
let currentUser = null;
let currentAttendanceDate = getTodayDate();
let currentViewingPayslip = null;

// --- LOCAL STORAGE PERSISTENCE ---
function loadSystemData() {
    try {
        const storedEmployees = localStorage.getItem("payflow_employees");
        employees = storedEmployees ? JSON.parse(storedEmployees) : JSON.parse(JSON.stringify(DEFAULT_EMPLOYEES));

        const storedPermissions = localStorage.getItem("payflow_permissions");
        employeePermissions = storedPermissions ? JSON.parse(storedPermissions) : JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS));

        const storedAttendance = localStorage.getItem("payflow_attendance");
        attendanceRecords = storedAttendance ? JSON.parse(storedAttendance) : JSON.parse(JSON.stringify(DEFAULT_ATTENDANCE));

        const storedLeaves = localStorage.getItem("payflow_leaves");
        leaveRequests = storedLeaves ? JSON.parse(storedLeaves) : JSON.parse(JSON.stringify(DEFAULT_LEAVES));

        const storedPayroll = localStorage.getItem("payflow_payroll");
        payrollHistory = storedPayroll ? JSON.parse(storedPayroll) : JSON.parse(JSON.stringify(DEFAULT_PAYROLL_HISTORY));

        const storedPayslips = localStorage.getItem("payflow_payslips");
        payslips = storedPayslips ? JSON.parse(storedPayslips) : JSON.parse(JSON.stringify(payrollHistory));

        const storedSettings = localStorage.getItem("payflow_settings");
        settings = storedSettings ? JSON.parse(storedSettings) : JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    } catch (e) {
        console.error("Error loading system data, restoring defaults:", e);
        resetToDefaults();
    }
}

function saveSystemData() {
    try {
        localStorage.setItem("payflow_employees", JSON.stringify(employees));
        localStorage.setItem("payflow_permissions", JSON.stringify(employeePermissions));
        localStorage.setItem("payflow_attendance", JSON.stringify(attendanceRecords));
        localStorage.setItem("payflow_leaves", JSON.stringify(leaveRequests));
        localStorage.setItem("payflow_payroll", JSON.stringify(payrollHistory));
        localStorage.setItem("payflow_payslips", JSON.stringify(payslips));
        localStorage.setItem("payflow_settings", JSON.stringify(settings));
    } catch (e) {
        console.error("Error saving system data to localStorage:", e);
    }
}

function resetToDefaults() {
    employees = JSON.parse(JSON.stringify(DEFAULT_EMPLOYEES));
    employeePermissions = JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS));
    attendanceRecords = JSON.parse(JSON.stringify(DEFAULT_ATTENDANCE));
    leaveRequests = JSON.parse(JSON.stringify(DEFAULT_LEAVES));
    payrollHistory = JSON.parse(JSON.stringify(DEFAULT_PAYROLL_HISTORY));
    payslips = JSON.parse(JSON.stringify(DEFAULT_PAYROLL_HISTORY));
    settings = JSON.parse(JSON.stringify(DEFAULT_SETTINGS));
    saveSystemData();
}

// --- AUTHENTICATION & LOGIN ---
let loginType = "manager";

function setLoginType(type) {
    loginType = type;
    const tabMgr = document.getElementById("tabManager");
    const tabEmp = document.getElementById("tabEmployee");
    const mgrFields = document.getElementById("managerLoginFields");
    const empFields = document.getElementById("employeeLoginFields");

    if (type === "manager") {
        tabMgr.classList.add("active");
        tabEmp.classList.remove("active");
        mgrFields.style.display = "block";
        empFields.style.display = "none";
    } else {
        tabEmp.classList.add("active");
        tabMgr.classList.remove("active");
        mgrFields.style.display = "none";
        empFields.style.display = "block";
    }
}

function quickLogin(roleOrId) {
    if (roleOrId === "manager") {
        setLoginType("manager");
        document.getElementById("loginEmail").value = "manager@payflow.com";
        document.getElementById("loginPassword").value = "admin123";
        performLogin("manager@payflow.com", "admin123");
    } else {
        setLoginType("employee");
        document.getElementById("employeeLoginId").value = roleOrId;
        document.getElementById("employeePassword").value = "1234";
        performLogin(roleOrId, "1234");
    }
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (loginType === "manager") {
        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value.trim();
        performLogin(email, password);
    } else {
        const id = document.getElementById("employeeLoginId").value.trim().toUpperCase();
        const password = document.getElementById("employeePassword").value.trim();
        performLogin(id, password);
    }
});

function performLogin(credential, password) {
    let user = null;
    if (loginType === "manager") {
        if (credential === "manager@payflow.com" && password === "admin123") {
            user = {
                type: "manager",
                name: "System Administrator",
                role: "Administrator"
            };
        } else {
            showToast("Invalid manager credentials. (Hint: manager@payflow.com / admin123)");
            return;
        }
    } else {
        const emp = employees.find(e => e.id.toUpperCase() === credential.toUpperCase());
        if (emp && password === "1234") {
            const perm = employeePermissions[emp.id] || {};
            user = {
                type: "employee",
                name: emp.name,
                employeeId: emp.id,
                department: emp.department,
                designation: emp.designation,
                role: perm.role || "Employee"
            };
        } else {
            showToast("Invalid employee credentials. (Hint: EMP001 / 1234)");
            return;
        }
    }

    currentUser = user;
    localStorage.setItem("payflow_user", JSON.stringify(user));
    showToast(`Welcome, ${user.name}!`);
    applyUserSession();
}

function checkLoginSession() {
    loadSystemData();
    const storedUser = localStorage.getItem("payflow_user");
    if (storedUser) {
        try {
            currentUser = JSON.parse(storedUser);
            applyUserSession();
            return;
        } catch (e) {
            localStorage.removeItem("payflow_user");
        }
    }
    // Show login screen
    document.getElementById("loginScreen").style.display = "flex";
    document.getElementById("dashboardApp").style.display = "none";
}

function applyUserSession() {
    document.getElementById("loginScreen").style.display = "none";
    document.getElementById("dashboardApp").style.display = "flex";

    // Set user info
    document.getElementById("sidebarUserName").textContent = currentUser.name;
    document.getElementById("sidebarUserRole").textContent = currentUser.role || (currentUser.type === "manager" ? "Administrator" : "Employee");
    document.getElementById("topUserName").textContent = currentUser.name;

    const initial = getInitials(currentUser.name);
    document.getElementById("sidebarAvatar").textContent = initial;
    document.getElementById("topAvatar").textContent = initial;

    // Filter elements based on role
    const managerEls = document.querySelectorAll(".manager-only");
    managerEls.forEach(el => {
        el.style.display = currentUser.type === "manager" ? "" : "none";
    });

    const isEmp = currentUser.type === "employee";
    document.getElementById("managerDashboardView").style.display = isEmp ? "none" : "block";
    document.getElementById("employeeDashboardView").style.display = isEmp ? "block" : "none";

    if (isEmp) {
        document.getElementById("dashboardRoleBadge").textContent = "EMPLOYEE PORTAL";
        document.getElementById("dashboardWelcome").textContent = `Welcome back, ${currentUser.name} 👋`;
        document.getElementById("dashboardSubtitle").textContent = `${currentUser.designation} • ${currentUser.department} Department`;
    } else {
        document.getElementById("dashboardRoleBadge").textContent = "ORGANIZATION PAYROLL OVERVIEW";
        document.getElementById("dashboardWelcome").textContent = `Welcome back, Manager 👋`;
        document.getElementById("dashboardSubtitle").textContent = "Here is your organization's real-time payroll and employee overview.";
    }

    renderAll();
    showPage("dashboard");
}

function logout() {
    localStorage.removeItem("payflow_user");
    currentUser = null;
    showToast("Logged out successfully.");
    document.getElementById("dashboardApp").style.display = "none";
    document.getElementById("loginScreen").style.display = "flex";
}

// --- NAVIGATION ---
const PAGE_TITLES = {
    dashboard: ["Dashboard", "Real-time payroll metrics & employee updates"],
    employees: ["Employee Management", "Manage employee records, salary profiles & system roles"],
    attendance: ["Attendance Tracking", "Log attendance, track working hours & loss of pay"],
    leave: ["Leave Management", "Submit requests, approve leaves & track time-off balances"],
    payroll: ["Payroll Processing", "Calculate monthly salaries, allowances, deductions & net pay"],
    payslips: ["Salary Payslips", "Generate, inspect, download & print formal payslips"],
    settings: ["System Settings", "Configure company profile, currency, statutory rates & backup"]
};

function showPage(page) {
    if (!currentUser) return;

    // Access protection
    if (currentUser.type === "employee" && (page === "employees" || page === "settings")) {
        showToast("Access restricted to Administrators.");
        return;
    }

    document.querySelectorAll(".page").forEach(p => p.classList.remove("active-page"));
    const target = document.getElementById(page + "Page");
    if (target) target.classList.add("active-page");

    document.querySelectorAll(".nav-item").forEach(item => {
        item.classList.toggle("active", item.getAttribute("data-page") === page);
    });

    if (PAGE_TITLES[page]) {
        document.getElementById("pageTitle").textContent = PAGE_TITLES[page][0];
        document.getElementById("pageSubtitle").textContent = PAGE_TITLES[page][1];
    }

    closeSidebar();
    renderAll();
}

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
}

function closeSidebar() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("sidebarOverlay").classList.remove("show");
}

// --- LIVE CLOCK & TOPBAR ---
function updateLiveClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
    const dateStr = now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

    const clockEl = document.getElementById("liveClockDisplay");
    if (clockEl) clockEl.textContent = timeStr;

    const dateEl = document.getElementById("liveDateDisplay");
    if (dateEl) dateEl.textContent = dateStr;

    const topbarDate = document.getElementById("topbarDate");
    if (topbarDate) {
        topbarDate.textContent = `📅 ${now.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}`;
    }
}
setInterval(updateLiveClock, 1000);

// --- DASHBOARD RENDERING ---
function renderDashboard() {
    if (!currentUser) return;

    if (currentUser.type === "manager") {
        renderManagerDashboard();
    } else {
        renderEmployeeDashboard();
    }
}

function renderManagerDashboard() {
    // 1. Total Employees
    const totalEmpEl = document.getElementById("totalEmployees");
    if (totalEmpEl) totalEmpEl.textContent = employees.length;

    // 2. Present Today
    const today = getTodayDate();
    const todayAtt = attendanceRecords[today] || {};
    const presentCount = Object.values(todayAtt).filter(r => r.status === "Present" || r.status === "Half Day").length;
    const presentEl = document.getElementById("presentToday");
    if (presentEl) presentEl.textContent = `${presentCount} / ${employees.length}`;

    // 3. Total Payroll Processed
    const totalProcessed = payrollHistory
        .filter(p => p.status === "Paid")
        .reduce((sum, p) => sum + Number(p.net || 0), 0);
    const totalPayrollEl = document.getElementById("totalPayroll");
    if (totalPayrollEl) totalPayrollEl.textContent = formatCurrency(totalProcessed);

    // 4. Pending Payroll
    const totalPending = payrollHistory
        .filter(p => p.status === "Pending")
        .reduce((sum, p) => sum + Number(p.net || 0), 0);
    const pendingPayrollEl = document.getElementById("pendingPayroll");
    if (pendingPayrollEl) pendingPayrollEl.textContent = formatCurrency(totalPending);

    // Recent employees table
    const recentTable = document.getElementById("recentEmployeesTable");
    if (recentTable) {
        recentTable.innerHTML = "";
        employees.slice(-5).reverse().forEach(emp => {
            recentTable.innerHTML += `
                <tr>
                    <td>
                        <div class="employee-cell">
                            <div class="employee-avatar">${getInitials(emp.name)}</div>
                            <div>
                                <strong>${emp.name}</strong>
                                <small>${emp.id}</small>
                            </div>
                        </div>
                    </td>
                    <td>${emp.department}</td>
                    <td>${emp.designation}</td>
                    <td>${formatCurrency(emp.salary)}</td>
                </tr>
            `;
        });
    }

    // Dashboard Attendance overview
    const attList = document.getElementById("dashboardAttendance");
    if (attList) {
        attList.innerHTML = "";
        employees.slice(0, 5).forEach(emp => {
            const rec = todayAtt[emp.id] || { status: "Absent", punchIn: "-" };
            attList.innerHTML += `
                <div class="attendance-row">
                    <div class="employee-cell">
                        <div class="employee-avatar">${getInitials(emp.name)}</div>
                        <div>
                            <strong>${emp.name}</strong>
                            <small>${emp.department} • Punch: ${rec.punchIn || "-"}</small>
                        </div>
                    </div>
                    <span class="status-badge ${getStatusClass(rec.status)}">${rec.status}</span>
                </div>
            `;
        });
    }
}

function renderEmployeeDashboard() {
    const empId = currentUser.employeeId;
    if (!empId) return;

    // Latest payslip
    const empPayslips = payslips.filter(p => p.employeeId === empId);
    const latestPayslip = empPayslips[empPayslips.length - 1];

    const netSalaryEl = document.getElementById("empNetSalary");
    if (netSalaryEl) netSalaryEl.textContent = latestPayslip ? formatCurrency(latestPayslip.net) : "₹0";

    const salaryStatusEl = document.getElementById("empSalaryStatus");
    if (salaryStatusEl) salaryStatusEl.textContent = latestPayslip ? latestPayslip.status : "Pending";

    // Attendance stats for current month
    let presentDays = 0;
    Object.keys(attendanceRecords).forEach(date => {
        const rec = attendanceRecords[date][empId];
        if (rec && (rec.status === "Present" || rec.status === "Half Day")) {
            presentDays++;
        }
    });
    const presentEl = document.getElementById("empPresentDays");
    if (presentEl) presentEl.textContent = `${presentDays} Days`;

    // Leave Balance
    const empLeaves = leaveRequests.filter(l => l.employeeId === empId && l.status === "Approved");
    const usedDays = empLeaves.reduce((sum, l) => sum + (l.days || 1), 0);
    const totalAllowed = (settings.clQuota || 12) + (settings.slQuota || 10) + (settings.plQuota || 15);
    const balance = Math.max(0, totalAllowed - usedDays);
    const leaveBalEl = document.getElementById("empLeaveBalance");
    if (leaveBalEl) leaveBalEl.textContent = `${balance} Days`;

    // Today's Clock In Status
    const today = getTodayDate();
    const todayRecord = (attendanceRecords[today] && attendanceRecords[today][empId]) || null;
    const statusBadge = document.getElementById("empTodayStatusBadge");
    const logText = document.getElementById("clockLogText");

    if (todayRecord && todayRecord.status === "Present") {
        if (statusBadge) {
            statusBadge.className = "status-badge status-approved";
            statusBadge.textContent = "Present (Clocked In)";
        }
        if (logText) {
            logText.textContent = `Clocked in at ${todayRecord.punchIn || "09:00 AM"} today.`;
        }
    } else {
        if (statusBadge) {
            statusBadge.className = "status-badge status-pending";
            statusBadge.textContent = "Not Clocked In";
        }
        if (logText) {
            logText.textContent = "Ready to record today's attendance.";
        }
    }

    // Recent Payslips table for employee
    const table = document.getElementById("empRecentPayslipsTable");
    if (table) {
        table.innerHTML = "";
        if (empPayslips.length === 0) {
            table.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:20px;color:#6b7280;">No payslips generated yet.</td></tr>`;
        } else {
            empPayslips.slice(-4).reverse().forEach(ps => {
                table.innerHTML += `
                    <tr>
                        <td><strong>${ps.month}</strong></td>
                        <td>${formatCurrency(ps.net)}</td>
                        <td><span class="status-badge ${getStatusClass(ps.status)}">${ps.status}</span></td>
                        <td>
                            <button class="action-btn permission-btn" onclick="openPayslipModal('${ps.id}')">View</button>
                        </td>
                    </tr>
                `;
            });
        }
    }
}

// --- EMPLOYEE SELF SERVICE CLOCK IN / OUT ---
function employeeClockIn() {
    if (!currentUser || currentUser.type !== "employee") {
        showToast("Clock-in is for employees.");
        return;
    }
    const today = getTodayDate();
    const empId = currentUser.employeeId;
    if (!attendanceRecords[today]) attendanceRecords[today] = {};

    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

    attendanceRecords[today][empId] = {
        status: "Present",
        punchIn: timeStr,
        punchOut: "-"
    };

    saveSystemData();
    renderAll();
    showToast(`Clocked in successfully at ${timeStr}!`);
}

function employeeClockOut() {
    if (!currentUser || currentUser.type !== "employee") return;
    const today = getTodayDate();
    const empId = currentUser.employeeId;

    if (!attendanceRecords[today] || !attendanceRecords[today][empId]) {
        showToast("You haven't clocked in yet today.");
        return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    attendanceRecords[today][empId].punchOut = timeStr;

    saveSystemData();
    renderAll();
    showToast(`Clocked out successfully at ${timeStr}.`);
}

// --- EMPLOYEE MANAGEMENT ---
let editingEmployeeId = null;

function renderEmployees() {
    const tbody = document.getElementById("employeesTable");
    if (!tbody) return;

    const search = document.getElementById("employeeSearch")?.value.toLowerCase().trim() || "";
    const dept = document.getElementById("departmentFilter")?.value || "";
    const status = document.getElementById("statusFilter")?.value || "";

    const filtered = employees.filter(emp => {
        const matchesSearch = emp.name.toLowerCase().includes(search) ||
                              emp.id.toLowerCase().includes(search) ||
                              emp.designation.toLowerCase().includes(search);
        const matchesDept = !dept || emp.department === dept;
        const matchesStatus = !status || emp.status === status;
        return matchesSearch && matchesDept && matchesStatus;
    });

    tbody.innerHTML = "";
    if (filtered.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:30px;color:#6b7280;">No employees found matching filter.</td></tr>`;
        return;
    }

    filtered.forEach(emp => {
        const perm = employeePermissions[emp.id] || { role: "Employee" };
        tbody.innerHTML += `
            <tr>
                <td><strong>${emp.id}</strong></td>
                <td>
                    <div class="employee-cell">
                        <div class="employee-avatar">${getInitials(emp.name)}</div>
                        <div>
                            <strong>${emp.name}</strong>
                            <small>${emp.email || "-"}</small>
                        </div>
                    </div>
                </td>
                <td>${emp.department}</td>
                <td>${emp.designation}</td>
                <td>${formatCurrency(emp.salary)}</td>
                <td>
                    <span class="status-badge ${emp.status === 'Active' ? 'status-active' : 'status-inactive'}">
                        ${emp.status}
                    </span>
                </td>
                <td>
                    <span class="role-badge">${perm.role || "Employee"}</span>
                </td>
                <td>
                    <div style="display:flex; gap:6px;">
                        <button class="action-btn permission-btn" onclick="openEmployeeModal('${emp.id}')">Edit</button>
                        <button class="action-btn permission-btn" onclick="openPermissionModal('${emp.id}')">Role</button>
                        <button class="action-btn delete-btn" onclick="deleteEmployee('${emp.id}')">Delete</button>
                    </div>
                </td>
            </tr>
        `;
    });
}

function openEmployeeModal(empId = null) {
    editingEmployeeId = empId;
    const modal = document.getElementById("employeeModal");
    const title = document.getElementById("employeeModalTitle");
    const submitBtn = document.getElementById("employeeSubmitBtn");
    const idInput = document.getElementById("employeeId");

    if (empId) {
        const emp = employees.find(e => e.id === empId);
        if (!emp) return;
        title.textContent = "Edit Employee Profile";
        submitBtn.textContent = "Save Changes";
        idInput.value = emp.id;
        idInput.disabled = true;

        document.getElementById("employeeName").value = emp.name;
        document.getElementById("employeeDepartment").value = emp.department;
        document.getElementById("employeeDesignation").value = emp.designation;
        document.getElementById("employeeSalary").value = emp.salary;
        document.getElementById("employeeStatus").value = emp.status;
    } else {
        title.textContent = "Add New Employee";
        submitBtn.textContent = "Add Employee";
        idInput.disabled = false;
        document.getElementById("employeeForm").reset();
        // Generate auto next ID
        const nextNum = employees.length + 1;
        idInput.value = `EMP00${nextNum}`;
        document.getElementById("employeeStatus").value = "Active";
    }

    modal.classList.add("show");
}

function closeEmployeeModal() {
    document.getElementById("employeeModal").classList.remove("show");
    editingEmployeeId = null;
}

document.getElementById("employeeForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("employeeId").value.trim().toUpperCase();
    const name = document.getElementById("employeeName").value.trim();
    const dept = document.getElementById("employeeDepartment").value;
    const desig = document.getElementById("employeeDesignation").value.trim();
    const salary = Number(document.getElementById("employeeSalary").value);
    const status = document.getElementById("employeeStatus").value;

    if (!id || !name || !dept || !desig || salary <= 0) {
        showToast("Please fill all required fields correctly.");
        return;
    }

    if (editingEmployeeId) {
        // Update existing
        const emp = employees.find(e => e.id === editingEmployeeId);
        if (emp) {
            emp.name = name;
            emp.department = dept;
            emp.designation = desig;
            emp.salary = salary;
            emp.status = status;
            showToast(`Employee ${emp.name} updated successfully.`);
        }
    } else {
        // Add new
        if (employees.some(e => e.id === id)) {
            showToast("Employee ID already exists. Use a unique ID.");
            return;
        }
        const newEmp = {
            id: id,
            name: name,
            department: dept,
            designation: desig,
            salary: salary,
            status: status,
            joiningDate: getTodayDate(),
            phone: "+91 98765 00000",
            email: `${name.toLowerCase().replace(/\s+/g, ".")}@payflow.com`
        };
        employees.push(newEmp);

        // Default permissions
        employeePermissions[id] = {
            role: "Employee",
            viewAttendance: true,
            applyLeave: true,
            viewPayroll: true,
            viewPayslip: true,
            editProfile: false
        };
        showToast(`Employee ${name} created successfully.`);
    }

    saveSystemData();
    closeEmployeeModal();
    renderAll();
});

function deleteEmployee(empId) {
    const emp = employees.find(e => e.id === empId);
    if (!emp) return;
    if (confirm(`Are you sure you want to delete employee "${emp.name}" (${emp.id})? This will also remove their records.`)) {
        employees = employees.filter(e => e.id !== empId);
        delete employeePermissions[empId];
        saveSystemData();
        renderAll();
        showToast(`Employee ${emp.name} removed.`);
    }
}

// --- PERMISSIONS MANAGEMENT ---
function openPermissionModal(empId) {
    const emp = employees.find(e => e.id === empId);
    if (!emp) return;

    const perm = employeePermissions[empId] || {
        role: "Employee",
        viewAttendance: true,
        applyLeave: true,
        viewPayroll: true,
        viewPayslip: true,
        editProfile: false
    };

    document.getElementById("permissionEmployeeId").value = empId;
    document.getElementById("employeeRole").value = perm.role || "Employee";
    document.getElementById("permissionAttendance").checked = perm.viewAttendance ?? true;
    document.getElementById("permissionLeave").checked = perm.applyLeave ?? true;
    document.getElementById("permissionPayroll").checked = perm.viewPayroll ?? true;
    document.getElementById("permissionPayslip").checked = perm.viewPayslip ?? true;
    document.getElementById("permissionProfile").checked = perm.editProfile ?? false;

    document.getElementById("permissionModal").classList.add("show");
}

function closePermissionModal() {
    document.getElementById("permissionModal").classList.remove("show");
}

document.getElementById("permissionForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const empId = document.getElementById("permissionEmployeeId").value;
    if (!empId) return;

    employeePermissions[empId] = {
        role: document.getElementById("employeeRole").value,
        viewAttendance: document.getElementById("permissionAttendance").checked,
        applyLeave: document.getElementById("permissionLeave").checked,
        viewPayroll: document.getElementById("permissionPayroll").checked,
        viewPayslip: document.getElementById("permissionPayslip").checked,
        editProfile: document.getElementById("permissionProfile").checked
    };

    saveSystemData();
    closePermissionModal();
    renderEmployees();
    showToast("Role and permissions saved successfully.");
});

// --- ATTENDANCE MANAGEMENT ---
function handleAttendanceDateChange(newDate) {
    if (newDate) {
        currentAttendanceDate = newDate;
        renderAttendance();
    }
}

function renderAttendance() {
    const dateInput = document.getElementById("attendanceDate");
    if (dateInput && !dateInput.value) {
        dateInput.value = currentAttendanceDate;
    }
    const targetDate = dateInput ? dateInput.value : currentAttendanceDate;
    if (!attendanceRecords[targetDate]) {
        attendanceRecords[targetDate] = {};
    }

    const dayRecords = attendanceRecords[targetDate];
    const tbody = document.getElementById("attendanceTable");
    if (!tbody) return;

    let visibleEmployees = employees;
    if (currentUser?.type === "employee") {
        visibleEmployees = employees.filter(e => e.id === currentUser.employeeId);
    }

    tbody.innerHTML = "";
    let presentCount = 0;
    let absentCount = 0;
    let halfDayCount = 0;

    visibleEmployees.forEach(emp => {
        const rec = dayRecords[emp.id] || { status: "Absent", punchIn: "-", punchOut: "-" };
        if (rec.status === "Present") presentCount++;
        else if (rec.status === "Half Day") halfDayCount++;
        else absentCount++;

        const isManager = currentUser?.type === "manager";
        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="employee-cell">
                        <div class="employee-avatar">${getInitials(emp.name)}</div>
                        <div>
                            <strong>${emp.name}</strong>
                            <small>${emp.id}</small>
                        </div>
                    </div>
                </td>
                <td>${emp.department}</td>
                <td>${formatDate(targetDate)}</td>
                <td>
                    ${
                        isManager
                        ? `
                            <select onchange="updateAttendanceRecord('${emp.id}', this.value, '${targetDate}')" style="width:130px; padding:6px 10px;">
                                <option value="Present" ${rec.status === 'Present' ? 'selected' : ''}>Present</option>
                                <option value="Half Day" ${rec.status === 'Half Day' ? 'selected' : ''}>Half Day</option>
                                <option value="Absent" ${rec.status === 'Absent' ? 'selected' : ''}>Absent</option>
                                <option value="On Leave" ${rec.status === 'On Leave' ? 'selected' : ''}>On Leave</option>
                            </select>
                          `
                        : `<span class="status-badge ${getStatusClass(rec.status)}">${rec.status}</span>`
                    }
                </td>
                <td>${rec.punchIn || "-"}</td>
                <td>
                    ${
                        isManager
                        ? `<button class="action-btn permission-btn" onclick="quickToggleAttendance('${emp.id}', '${targetDate}')">Toggle</button>`
                        : `<span style="color:#6b7280; font-size:11px;">Verified</span>`
                    }
                </td>
            </tr>
        `;
    });

    // Update Attendance Stats bar
    const totalStaffEl = document.getElementById("attTotalStaff");
    const presentCountEl = document.getElementById("attPresentCount");
    const halfDayCountEl = document.getElementById("attHalfDayCount");
    const absentCountEl = document.getElementById("attAbsentCount");

    if (totalStaffEl) totalStaffEl.textContent = visibleEmployees.length;
    if (presentCountEl) presentCountEl.textContent = presentCount;
    if (halfDayCountEl) halfDayCountEl.textContent = halfDayCount;
    if (absentCountEl) absentCountEl.textContent = absentCount;
}

function updateAttendanceRecord(empId, status, date) {
    if (!attendanceRecords[date]) attendanceRecords[date] = {};
    const existing = attendanceRecords[date][empId] || {};
    attendanceRecords[date][empId] = {
        ...existing,
        status: status,
        punchIn: status === "Present" || status === "Half Day" ? (existing.punchIn && existing.punchIn !== "-" ? existing.punchIn : "09:00 AM") : "-"
    };
    saveSystemData();
    renderAttendance();
    renderDashboard();
    showToast(`Attendance updated for ${empId}: ${status}`);
}

function quickToggleAttendance(empId, date) {
    if (!attendanceRecords[date]) attendanceRecords[date] = {};
    const curr = (attendanceRecords[date][empId] && attendanceRecords[date][empId].status) || "Absent";
    const next = curr === "Present" ? "Absent" : "Present";
    updateAttendanceRecord(empId, next, date);
}

function markAllAttendance(status) {
    const targetDate = document.getElementById("attendanceDate").value || currentAttendanceDate;
    if (!attendanceRecords[targetDate]) attendanceRecords[targetDate] = {};

    employees.forEach(emp => {
        attendanceRecords[targetDate][emp.id] = {
            status: status,
            punchIn: status === "Present" ? "09:00 AM" : "-",
            punchOut: status === "Present" ? "06:00 PM" : "-"
        };
    });

    saveSystemData();
    renderAttendance();
    renderDashboard();
    showToast(`Marked all employees as "${status}" for ${formatDate(targetDate)}.`);
}

// --- LEAVE MANAGEMENT ---
function calculateLeaveDaysPreview() {
    const fromVal = document.getElementById("leaveFrom").value;
    const toVal = document.getElementById("leaveTo").value;
    const durationText = document.getElementById("leaveDurationText");

    if (!fromVal || !toVal) {
        if (durationText) durationText.textContent = "Duration: 0 Days";
        return 0;
    }

    const d1 = new Date(fromVal);
    const d2 = new Date(toVal);
    if (d2 < d1) {
        if (durationText) durationText.textContent = "⚠️ To date cannot be before From date";
        return 0;
    }

    const diffDays = Math.round((d2 - d1) / (1000 * 60 * 60 * 24)) + 1;
    if (durationText) durationText.textContent = `Duration: ${diffDays} Day${diffDays > 1 ? 's' : ''}`;
    return diffDays;
}

function openLeaveModal() {
    const modal = document.getElementById("leaveModal");
    const empSelectGroup = document.getElementById("leaveEmployeeSelectGroup");
    const empSelect = document.getElementById("leaveEmployeeId");

    empSelect.innerHTML = `<option value="">Select Employee</option>`;
    employees.forEach(emp => {
        empSelect.innerHTML += `<option value="${emp.id}">${emp.name} (${emp.id})</option>`;
    });

    if (currentUser?.type === "employee") {
        empSelect.value = currentUser.employeeId;
        empSelectGroup.style.display = "none";
    } else {
        empSelectGroup.style.display = "block";
    }

    document.getElementById("leaveFrom").value = getTodayDate();
    document.getElementById("leaveTo").value = getTodayDate();
    calculateLeaveDaysPreview();
    modal.classList.add("show");
}

function closeLeaveModal() {
    document.getElementById("leaveModal").classList.remove("show");
}

document.getElementById("leaveForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let empId = currentUser?.employeeId;
    if (currentUser?.type === "manager") {
        empId = document.getElementById("leaveEmployeeId").value;
    }

    if (!empId) {
        showToast("Please select an employee.");
        return;
    }

    const fromDate = document.getElementById("leaveFrom").value;
    const toDate = document.getElementById("leaveTo").value;
    const leaveType = document.getElementById("leaveType").value;
    const reason = document.getElementById("leaveReason").value.trim();
    const days = calculateLeaveDaysPreview();

    if (days <= 0) {
        showToast("Invalid date range.");
        return;
    }

    const newReq = {
        id: Date.now(),
        employeeId: empId,
        type: leaveType,
        from: fromDate,
        to: toDate,
        days: days,
        reason: reason,
        status: currentUser?.type === "manager" ? "Approved" : "Pending",
        appliedOn: getTodayDate()
    };

    leaveRequests.unshift(newReq);
    saveSystemData();
    closeLeaveModal();
    document.getElementById("leaveForm").reset();
    renderLeaves();
    renderDashboard();
    showToast(`Leave request submitted for ${days} day(s).`);
});

function renderLeaves() {
    const tbody = document.getElementById("leaveTable");
    if (!tbody) return;

    const statusFilter = document.getElementById("leaveFilter")?.value || "";
    let visible = leaveRequests;

    if (currentUser?.type === "employee") {
        visible = leaveRequests.filter(l => l.employeeId === currentUser.employeeId);
    }

    if (statusFilter) {
        visible = visible.filter(l => l.status === statusFilter);
    }

    tbody.innerHTML = "";
    if (visible.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:30px;color:#6b7280;">No leave records found.</td></tr>`;
    } else {
        visible.forEach(l => {
            const emp = employees.find(e => e.id === l.employeeId);
            const isManager = currentUser?.type === "manager";
            tbody.innerHTML += `
                <tr>
                    <td>
                        <div class="employee-cell">
                            <div class="employee-avatar">${getInitials(emp?.name || l.employeeId)}</div>
                            <div>
                                <strong>${emp?.name || l.employeeId}</strong>
                                <small>${l.employeeId}</small>
                            </div>
                        </div>
                    </td>
                    <td><strong>${l.type}</strong></td>
                    <td>${formatDate(l.from)}</td>
                    <td>${formatDate(l.to)}</td>
                    <td><span class="role-badge">${l.days || 1} Day(s)</span></td>
                    <td class="leave-reason" title="${l.reason}">${l.reason}</td>
                    <td><span class="status-badge ${getStatusClass(l.status)}">${l.status}</span></td>
                    <td>
                        ${
                            isManager && l.status === "Pending"
                            ? `
                                <div style="display:flex; gap:6px;">
                                    <button class="action-btn permission-btn" onclick="updateLeaveStatus(${l.id}, 'Approved')">Approve</button>
                                    <button class="action-btn delete-btn" onclick="updateLeaveStatus(${l.id}, 'Rejected')">Reject</button>
                                </div>
                              `
                            : `<span style="color:#9ca3af; font-size:11px;">Completed</span>`
                        }
                    </td>
                </tr>
            `;
        });
    }

    // Update stats
    const pendingCount = leaveRequests.filter(l => l.status === "Pending").length;
    const approvedCount = leaveRequests.filter(l => l.status === "Approved").length;
    const rejectedCount = leaveRequests.filter(l => l.status === "Rejected").length;

    document.getElementById("pendingLeaves").textContent = pendingCount;
    document.getElementById("approvedLeaves").textContent = approvedCount;
    document.getElementById("rejectedLeaves").textContent = rejectedCount;
    document.getElementById("totalLeaves").textContent = leaveRequests.length;
}

function updateLeaveStatus(leaveId, newStatus) {
    const req = leaveRequests.find(l => l.id === leaveId);
    if (!req) return;

    req.status = newStatus;
    saveSystemData();
    renderLeaves();
    renderDashboard();
    showToast(`Leave application #${leaveId} marked as ${newStatus}.`);
}

// --- PAYROLL ENGINE ---
function populatePayrollEmployeeOptions() {
    const select = document.getElementById("payrollEmployee");
    if (!select) return;

    select.innerHTML = `<option value="">Select Employee</option>`;
    employees.forEach(emp => {
        select.innerHTML += `<option value="${emp.id}">${emp.name} (${emp.id}) - Basic: ${formatCurrency(emp.salary)}</option>`;
    });

    const monthInput = document.getElementById("payrollMonth");
    if (monthInput && !monthInput.value) {
        const now = new Date();
        const m = String(now.getMonth() + 1).padStart(2, "0");
        monthInput.value = `${now.getFullYear()}-${m}`;
    }
}

function handlePayrollEmployeeSelect() {
    const empId = document.getElementById("payrollEmployee").value;
    const emp = employees.find(e => e.id === empId);
    if (emp) {
        document.getElementById("basicSalary").value = emp.salary;
        autoCalculatePayrollForm();
    }
}

function handlePayrollMonthChange() {
    autoCalculatePayrollForm();
}

function autoCalculatePayrollForm() {
    const empId = document.getElementById("payrollEmployee").value;
    const emp = employees.find(e => e.id === empId);
    if (!emp) return;

    const basic = Number(document.getElementById("basicSalary").value) || emp.salary || 30000;
    const workingDays = Number(document.getElementById("workingDays").value) || settings.standardWorkingDays || 30;

    // Calculate standard breakdown
    const hraRate = (settings.hraRate || 40) / 100;
    const daRate = (settings.daRate || 10) / 100;
    const pfRate = (settings.pfRate || 12) / 100;

    const hra = Math.round(basic * hraRate);
    const da = Math.round(basic * daRate);
    const otherAllowances = Math.round(basic * 0.05); // 5% conveyance / special

    const pf = Math.round(basic * pfRate);
    const grossEst = basic + hra + da + otherAllowances;
    const esi = grossEst <= 21000 ? Math.round(grossEst * 0.0075) : 0;
    const profTax = basic > 15000 ? 200 : 0;

    document.getElementById("hraAllowance").value = hra;
    document.getElementById("daAllowance").value = da;
    document.getElementById("allowances").value = otherAllowances;

    document.getElementById("pfDeduction").value = pf;
    document.getElementById("esiDeduction").value = esi;
    document.getElementById("taxDeduction").value = profTax;
    document.getElementById("deductions").value = 0; // LOP

    updateLivePayrollPreview();
    showToast(`Payroll structure auto-calculated for ${emp.name}.`);
}

function updateLivePayrollPreview() {
    const basic = Number(document.getElementById("basicSalary").value) || 0;
    const hra = Number(document.getElementById("hraAllowance").value) || 0;
    const da = Number(document.getElementById("daAllowance").value) || 0;
    const allowances = Number(document.getElementById("allowances").value) || 0;

    const gross = basic + hra + da + allowances;

    const pf = Number(document.getElementById("pfDeduction").value) || 0;
    const esi = Number(document.getElementById("esiDeduction").value) || 0;
    const tax = Number(document.getElementById("taxDeduction").value) || 0;
    const lop = Number(document.getElementById("deductions").value) || 0;

    const totalDeductions = pf + esi + tax + lop;
    const net = Math.max(0, gross - totalDeductions);

    const grossEl = document.getElementById("grossEarningsPreview");
    if (grossEl) grossEl.textContent = formatCurrency(gross);

    const dedEl = document.getElementById("totalDeductionsPreview");
    if (dedEl) dedEl.textContent = formatCurrency(totalDeductions);

    const netEl = document.getElementById("netSalaryPreview");
    if (netEl) netEl.textContent = formatCurrency(net);

    const wordsEl = document.getElementById("netSalaryInWords");
    if (wordsEl) wordsEl.textContent = numberToWords(net) + " Rupees Only";
}

function calculatePayroll() {
    const empId = document.getElementById("payrollEmployee").value;
    const emp = employees.find(e => e.id === empId);

    if (!emp) {
        showToast("Please select an employee.");
        return;
    }

    const monthInput = document.getElementById("payrollMonth").value;
    if (!monthInput) {
        showToast("Please select a payroll month.");
        return;
    }

    const date = new Date(monthInput + "-01");
    const monthName = date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

    const basic = Number(document.getElementById("basicSalary").value) || 0;
    const workingDays = Number(document.getElementById("workingDays").value) || 30;

    const hra = Number(document.getElementById("hraAllowance").value) || 0;
    const da = Number(document.getElementById("daAllowance").value) || 0;
    const allowances = Number(document.getElementById("allowances").value) || 0;
    const gross = basic + hra + da + allowances;

    const pf = Number(document.getElementById("pfDeduction").value) || 0;
    const esi = Number(document.getElementById("esiDeduction").value) || 0;
    const tax = Number(document.getElementById("taxDeduction").value) || 0;
    const lop = Number(document.getElementById("deductions").value) || 0;
    const totalDeductions = pf + esi + tax + lop;
    const net = Math.max(0, gross - totalDeductions);

    const recordId = `PAY-${monthInput}-${emp.id}`;

    // Remove existing if duplicate for same month
    payrollHistory = payrollHistory.filter(p => !(p.employeeId === emp.id && p.month === monthName));
    payslips = payslips.filter(p => !(p.employeeId === emp.id && p.month === monthName));

    const payrollRecord = {
        id: recordId,
        employeeId: emp.id,
        month: monthName,
        basic: basic,
        hra: hra,
        da: da,
        allowances: allowances,
        gross: gross,
        pf: pf,
        esi: esi,
        profTax: tax,
        tds: 0,
        lopDeduction: lop,
        deductions: totalDeductions,
        net: net,
        status: "Pending",
        paymentDate: "-",
        paymentMethod: "Pending Approval",
        workingDays: workingDays,
        presentDays: workingDays,
        lopDays: 0
    };

    payrollHistory.unshift(payrollRecord);
    payslips.unshift(JSON.parse(JSON.stringify(payrollRecord)));

    saveSystemData();
    renderAll();
    showToast(`Payroll processed for ${emp.name} (${monthName}). Net Pay: ${formatCurrency(net)}`);
}

function bulkProcessPayroll() {
    const monthInput = document.getElementById("payrollMonth").value || "2026-10";
    const date = new Date(monthInput + "-01");
    const monthName = date.toLocaleDateString("en-IN", { month: "long", year: "numeric" });

    let count = 0;
    employees.forEach(emp => {
        if (emp.status !== "Active") return;

        // Skip if already generated
        const alreadyDone = payrollHistory.some(p => p.employeeId === emp.id && p.month === monthName);
        if (alreadyDone) return;

        const basic = emp.salary || 30000;
        const hra = Math.round(basic * ((settings.hraRate || 40) / 100));
        const da = Math.round(basic * ((settings.daRate || 10) / 100));
        const allowances = Math.round(basic * 0.05);
        const gross = basic + hra + da + allowances;

        const pf = Math.round(basic * ((settings.pfRate || 12) / 100));
        const esi = gross <= 21000 ? Math.round(gross * 0.0075) : 0;
        const profTax = basic > 15000 ? 200 : 0;
        const totalDeductions = pf + esi + profTax;
        const net = gross - totalDeductions;

        const record = {
            id: `PAY-${monthInput}-${emp.id}`,
            employeeId: emp.id,
            month: monthName,
            basic: basic,
            hra: hra,
            da: da,
            allowances: allowances,
            gross: gross,
            pf: pf,
            esi: esi,
            profTax: profTax,
            tds: 0,
            lopDeduction: 0,
            deductions: totalDeductions,
            net: net,
            status: "Pending",
            paymentDate: "-",
            paymentMethod: "Direct Bank Transfer",
            workingDays: 30,
            presentDays: 30,
            lopDays: 0
        };

        payrollHistory.unshift(record);
        payslips.unshift(JSON.parse(JSON.stringify(record)));
        count++;
    });

    saveSystemData();
    renderAll();
    showToast(`Bulk payroll executed! Created ${count} new payroll statements for ${monthName}.`);
}

function renderPayrollHistory() {
    const tbody = document.getElementById("payrollHistory");
    if (!tbody) return;

    const statusFilter = document.getElementById("payrollStatusFilter")?.value || "";
    let visible = payrollHistory;

    if (currentUser?.type === "employee") {
        visible = payrollHistory.filter(p => p.employeeId === currentUser.employeeId);
    }

    if (statusFilter) {
        visible = visible.filter(p => p.status === statusFilter);
    }

    tbody.innerHTML = "";
    if (visible.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:30px;color:#6b7280;">No payroll history records found.</td></tr>`;
        return;
    }

    visible.forEach(item => {
        const emp = employees.find(e => e.id === item.employeeId);
        const isManager = currentUser?.type === "manager";
        tbody.innerHTML += `
            <tr>
                <td>
                    <div class="employee-cell">
                        <div class="employee-avatar">${getInitials(emp?.name || item.employeeId)}</div>
                        <div>
                            <strong>${emp?.name || item.employeeId}</strong>
                            <small>${item.employeeId}</small>
                        </div>
                    </div>
                </td>
                <td><strong>${item.month}</strong></td>
                <td>${formatCurrency(item.basic)}</td>
                <td>${formatCurrency(item.gross || item.basic)}</td>
                <td style="color:var(--red);">${formatCurrency(item.deductions || 0)}</td>
                <td><strong style="color:var(--green);">${formatCurrency(item.net)}</strong></td>
                <td><span class="status-badge ${getStatusClass(item.status)}">${item.status}</span></td>
                <td>
                    <div style="display:flex; gap:6px;">
                        ${
                            isManager && item.status === "Pending"
                            ? `<button class="action-btn permission-btn" onclick="markPayrollPaid('${item.id}')">Disburse</button>`
                            : ""
                        }
                        <button class="action-btn permission-btn" onclick="openPayslipModal('${item.id}')">Payslip</button>
                        ${
                            isManager
                            ? `<button class="action-btn delete-btn" onclick="deletePayrollItem('${item.id}')">✕</button>`
                            : ""
                        }
                    </div>
                </td>
            </tr>
        `;
    });
}

function markPayrollPaid(payrollId) {
    const item = payrollHistory.find(p => p.id === payrollId);
    if (!item) return;

    item.status = "Paid";
    item.paymentDate = getTodayDate();
    item.paymentMethod = "Direct Bank Transfer";

    const ps = payslips.find(p => p.id === payrollId);
    if (ps) {
        ps.status = "Paid";
        ps.paymentDate = item.paymentDate;
    }

    saveSystemData();
    renderAll();
    showToast(`Salary disbursed for ${item.employeeId} (${item.month}). Marked as Paid.`);
}

function deletePayrollItem(payrollId) {
    if (confirm("Delete this payroll entry?")) {
        payrollHistory = payrollHistory.filter(p => p.id !== payrollId);
        payslips = payslips.filter(p => p.id !== payrollId);
        saveSystemData();
        renderAll();
        showToast("Payroll record deleted.");
    }
}

// --- PAYSLIP RENDERING & MODAL ---
function renderPayslips() {
    const tbody = document.getElementById("payslipsTable");
    if (!tbody) return;

    const search = document.getElementById("payslipSearch")?.value.toLowerCase().trim() || "";
    const monthFilter = document.getElementById("payslipMonthFilter")?.value || "";

    let visible = payslips;
    if (currentUser?.type === "employee") {
        visible = payslips.filter(p => p.employeeId === currentUser.employeeId);
    }

    if (monthFilter) {
        visible = visible.filter(p => p.month === monthFilter);
    }

    if (search) {
        visible = visible.filter(p => {
            const emp = employees.find(e => e.id === p.employeeId);
            return p.employeeId.toLowerCase().includes(search) || (emp && emp.name.toLowerCase().includes(search));
        });
    }

    tbody.innerHTML = "";
    if (visible.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:30px;color:#6b7280;">No payslips found.</td></tr>`;
        return;
    }

    visible.forEach(ps => {
        const emp = employees.find(e => e.id === ps.employeeId);
        tbody.innerHTML += `
            <tr>
                <td><code>${ps.id || 'PS-' + ps.employeeId}</code></td>
                <td>
                    <div class="employee-cell">
                        <div class="employee-avatar">${getInitials(emp?.name || ps.employeeId)}</div>
                        <div>
                            <strong>${emp?.name || ps.employeeId}</strong>
                            <small>${emp?.department || '-'}</small>
                        </div>
                    </div>
                </td>
                <td>${ps.month}</td>
                <td>${formatCurrency(ps.gross || ps.basic)}</td>
                <td style="color:var(--red);">${formatCurrency(ps.deductions || 0)}</td>
                <td><strong style="color:var(--green);">${formatCurrency(ps.net)}</strong></td>
                <td><span class="status-badge ${getStatusClass(ps.status)}">${ps.status}</span></td>
                <td>
                    <div style="display:flex; gap:6px;">
                        <button class="action-btn permission-btn" onclick="openPayslipModal('${ps.id}')">👁️ View</button>
                        <button class="action-btn permission-btn" onclick="openPayslipModal('${ps.id}'); setTimeout(printPayslipDocument, 400);">🖨️ Print</button>
                    </div>
                </td>
            </tr>
        `;
    });
}

function openPayslipModal(payslipId) {
    const ps = payslips.find(p => p.id === payslipId) || payrollHistory.find(p => p.id === payslipId);
    if (!ps) {
        showToast("Payslip details not found.");
        return;
    }

    currentViewingPayslip = ps;
    const emp = employees.find(e => e.id === ps.employeeId) || {
        id: ps.employeeId,
        name: ps.employeeId,
        department: "General",
        designation: "Employee",
        joiningDate: "2024-01-01"
    };

    const docContainer = document.getElementById("payslipPrintableDocument");
    const gross = ps.gross || ps.basic;
    const deductions = ps.deductions || 0;
    const net = ps.net;

    docContainer.innerHTML = `
        <div class="payslip-doc-header">
            <div class="payslip-brand">
                <div class="payslip-brand-icon">P</div>
                <div class="payslip-company-info">
                    <h2>${settings.companyName || "PayFlow Technologies"}</h2>
                    <p>${settings.companyAddress || "Bengaluru, Karnataka - 560100"}</p>
                    <p>Email: ${settings.companyEmail || "payroll@payflow.com"} • Phone: ${settings.companyPhone || "+91 98765 43210"}</p>
                </div>
            </div>
            <div class="payslip-title-box">
                <span class="payslip-title-badge">SALARY PAYSLIP</span>
                <div class="payslip-period-text">Pay Period: ${ps.month}</div>
                <div style="font-size:11px; color:#64748b; margin-top:3px;">Ref: ${ps.id}</div>
            </div>
        </div>

        <div class="payslip-employee-meta">
            <div class="meta-field">
                <strong>Employee ID</strong>
                <span>${emp.id}</span>
            </div>
            <div class="meta-field">
                <strong>Employee Name</strong>
                <span>${emp.name}</span>
            </div>
            <div class="meta-field">
                <strong>Department</strong>
                <span>${emp.department}</span>
            </div>
            <div class="meta-field">
                <strong>Designation</strong>
                <span>${emp.designation}</span>
            </div>
            <div class="meta-field">
                <strong>Bank A/C No.</strong>
                <span>HDFC••••${emp.id.replace(/\D/g, '') || '4821'}</span>
            </div>
            <div class="meta-field">
                <strong>Payment Mode</strong>
                <span>${ps.paymentMethod || "Direct Bank Transfer"}</span>
            </div>
            <div class="meta-field">
                <strong>Working / Paid Days</strong>
                <span>${ps.workingDays || 30} Days</span>
            </div>
            <div class="meta-field">
                <strong>Payment Status</strong>
                <span class="status-badge ${getStatusClass(ps.status)}">${ps.status}</span>
            </div>
        </div>

        <div class="payslip-tables-row">
            <div class="payslip-table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Earnings & Allowances</th>
                            <th>Amount (${settings.currency})</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Basic Salary</td>
                            <td>${formatCurrency(ps.basic)}</td>
                        </tr>
                        <tr>
                            <td>House Rent Allowance (HRA)</td>
                            <td>${formatCurrency(ps.hra || 0)}</td>
                        </tr>
                        <tr>
                            <td>Dearness Allowance (DA)</td>
                            <td>${formatCurrency(ps.da || 0)}</td>
                        </tr>
                        <tr>
                            <td>Special / Other Allowances</td>
                            <td>${formatCurrency(ps.allowances || 0)}</td>
                        </tr>
                        <tr class="payslip-table-total">
                            <td><strong>Gross Earnings</strong></td>
                            <td><strong>${formatCurrency(gross)}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="payslip-table-wrapper">
                <table>
                    <thead>
                        <tr>
                            <th>Statutory Deductions</th>
                            <th>Amount (${settings.currency})</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Provident Fund (PF - 12%)</td>
                            <td>${formatCurrency(ps.pf || 0)}</td>
                        </tr>
                        <tr>
                            <td>Employee State Insurance (ESI)</td>
                            <td>${formatCurrency(ps.esi || 0)}</td>
                        </tr>
                        <tr>
                            <td>Professional Tax / TDS</td>
                            <td>${formatCurrency(ps.profTax || 0)}</td>
                        </tr>
                        <tr>
                            <td>Loss of Pay (Absent Days)</td>
                            <td>${formatCurrency(ps.lopDeduction || 0)}</td>
                        </tr>
                        <tr class="payslip-table-total">
                            <td><strong>Total Deductions</strong></td>
                            <td style="color:var(--red);"><strong>${formatCurrency(deductions)}</strong></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="payslip-net-box">
            <div>
                <div class="payslip-net-title">NET TAKE-HOME SALARY</div>
                <div class="payslip-net-words">${numberToWords(net)} Rupees Only</div>
            </div>
            <div class="payslip-net-value">${formatCurrency(net)}</div>
        </div>

        <div class="payslip-sign-section">
            <div class="payslip-sign-box">
                <div class="payslip-seal">PAYFLOW VERIFIED</div>
                <div class="payslip-sign-line"></div>
                <p>Authorized Signatory (HR / Finance)</p>
            </div>
            <div class="payslip-sign-box">
                <div style="height:32px;"></div>
                <div class="payslip-sign-line"></div>
                <p>Employee Acknowledgment Signature</p>
            </div>
        </div>

        <div class="payslip-footer-note">
            This is a computer-generated salary document and requires no physical signature. Generated via PayFlow Payroll System on ${formatDate(getTodayDate())}.
        </div>
    `;

    document.getElementById("payslipModal").classList.add("show");
}

function closePayslipModal() {
    document.getElementById("payslipModal").classList.remove("show");
    currentViewingPayslip = null;
}

function printPayslipDocument() {
    window.print();
}

// --- SETTINGS MANAGEMENT ---
function saveSettings() {
    settings.companyName = document.getElementById("companyName").value.trim();
    settings.companyEmail = document.getElementById("companyEmail").value.trim();
    settings.companyPhone = document.getElementById("companyPhone").value.trim();
    settings.companyAddress = document.getElementById("companyAddress").value.trim();
    settings.currency = document.getElementById("currency").value;
    settings.payrollCycle = document.getElementById("payrollCycle").value;
    settings.standardWorkingDays = Number(document.getElementById("settingWorkingDays").value) || 30;
    settings.pfRate = Number(document.getElementById("settingPfRate").value) || 12;
    settings.hraRate = Number(document.getElementById("settingHraRate").value) || 40;
    settings.daRate = Number(document.getElementById("settingDaRate").value) || 10;

    saveSystemData();
    renderAll();
    showToast("System preferences updated successfully.");
}

function loadSettingsForm() {
    if (!settings.companyName) return;
    document.getElementById("companyName").value = settings.companyName || "";
    document.getElementById("companyEmail").value = settings.companyEmail || "";
    document.getElementById("companyPhone").value = settings.companyPhone || "";
    document.getElementById("companyAddress").value = settings.companyAddress || "";
    document.getElementById("currency").value = settings.currency || "₹";
    document.getElementById("payrollCycle").value = settings.payrollCycle || "Monthly";
    document.getElementById("settingWorkingDays").value = settings.standardWorkingDays || 30;
    document.getElementById("settingPfRate").value = settings.pfRate || 12;
    document.getElementById("settingHraRate").value = settings.hraRate || 40;
    document.getElementById("settingDaRate").value = settings.daRate || 10;
}

function exportSystemData() {
    const data = {
        exportedAt: new Date().toISOString(),
        version: "2.0",
        employees: employees,
        permissions: employeePermissions,
        attendance: attendanceRecords,
        leaves: leaveRequests,
        payroll: payrollHistory,
        payslips: payslips,
        settings: settings
    };

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `payflow-database-backup-${getTodayDate()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Payroll database exported to JSON file.");
}

function importSystemData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            if (data.employees && Array.isArray(data.employees)) {
                employees = data.employees;
                employeePermissions = data.permissions || {};
                attendanceRecords = data.attendance || {};
                leaveRequests = data.leaves || [];
                payrollHistory = data.payroll || [];
                payslips = data.payslips || [];
                settings = data.settings || DEFAULT_SETTINGS;

                saveSystemData();
                renderAll();
                showToast("Data restored successfully from backup!");
            } else {
                showToast("Invalid backup file structure.");
            }
        } catch (err) {
            showToast("Failed to parse backup JSON file.");
        }
    };
    reader.readAsText(file);
}

function resetSystemData() {
    if (confirm("Are you sure you want to reset all data to default demo state? All customized payroll, attendance, and employee data will be reset.")) {
        resetToDefaults();
        renderAll();
        showToast("System reset to initial demo data.");
    }
}

// --- HELPERS ---
function formatCurrency(amount) {
    const sym = settings.currency || "₹";
    return `${sym}${Number(amount || 0).toLocaleString("en-IN")}`;
}

function getInitials(name) {
    if (!name) return "U";
    return name
        .split(" ")
        .map(w => w.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();
}

function getStatusClass(status) {
    switch (status) {
        case "Present":
        case "Paid":
        case "Approved":
        case "Active":
            return "status-approved";
        case "Absent":
        case "Rejected":
        case "Inactive":
            return "status-rejected";
        case "Half Day":
            return "status-halfday";
        case "On Leave":
            return "status-leave";
        case "Pending":
        default:
            return "status-pending";
    }
}

function getTodayDate() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

function formatDate(dateStr) {
    if (!dateStr) return "-";
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

function numberToWords(num) {
    num = Math.round(Number(num) || 0);
    if (num === 0) return "Zero";

    const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    function inWords(n) {
        if (n < 20) return a[n];
        if (n < 100) return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
        if (n < 1000) return a[Math.floor(n / 100)] + ' Hundred' + (n % 100 !== 0 ? ' and ' + inWords(n % 100) : '');
        if (n < 100000) return inWords(Math.floor(n / 1000)) + ' Thousand' + (n % 1000 !== 0 ? ' ' + inWords(n % 1000) : '');
        if (n < 10000000) return inWords(Math.floor(n / 100000)) + ' Lakh' + (n % 100000 !== 0 ? ' ' + inWords(n % 100000) : '');
        return inWords(Math.floor(n / 10000000)) + ' Crore' + (n % 10000000 !== 0 ? ' ' + inWords(n % 10000000) : '');
    }

    return inWords(num);
}

// --- TOAST NOTIFICATIONS ---
let toastTimer = null;
function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2800);
}

// --- RENDER ALL VIEWS ---
function renderAll() {
    if (!currentUser) return;
    renderDashboard();
    renderEmployees();
    renderAttendance();
    renderLeaves();
    populatePayrollEmployeeOptions();
    renderPayrollHistory();
    renderPayslips();
    loadSettingsForm();
}

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", function () {
    updateLiveClock();
    checkLoginSession();
});

// Modal outside click handler
document.addEventListener("click", function (e) {
    const empModal = document.getElementById("employeeModal");
    const permModal = document.getElementById("permissionModal");
    const leaveModal = document.getElementById("leaveModal");
    const payslipModal = document.getElementById("payslipModal");

    if (e.target === empModal) closeEmployeeModal();
    if (e.target === permModal) closePermissionModal();
    if (e.target === leaveModal) closeLeaveModal();
    if (e.target === payslipModal) closePayslipModal();
});

// Escape key closes modals
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeEmployeeModal();
        closePermissionModal();
        closeLeaveModal();
        closePayslipModal();
    }
});
