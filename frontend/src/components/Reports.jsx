import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import axios from "axios";

export default function Reports({ user }) {
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    if (user.role !== "manager") return;

    const fetchAllData = async () => {
      try {
        const empRes = await axios.get("http://localhost:5000/api/employees");
        const attRes = await axios.get("http://localhost:5000/api/attendance");
        const payRes = await axios.get("http://localhost:5000/api/payroll");
        const leaveRes = await axios.get("http://localhost:5000/api/leaves");

        const emps = empRes.data;
        const atts = attRes.data;
        const pays = payRes.data;
        const leaves = leaveRes.data;

        // Payroll Stats
        const totalGross = pays.reduce(
          (sum, p) => sum + (p.basicSalary + (p.allowances || p.hra + p.da)),
          0,
        );
        const totalDeductions = pays.reduce(
          (sum, p) => sum + (p.otherDeductions || p.pf),
          0,
        );
        const totalNet = pays.reduce((sum, p) => sum + p.netSalary, 0);
        const processed = pays.filter((p) => p.status === "Paid").length;
        const pendingPay = pays.filter((p) => p.status === "Pending").length;

        // Attendance Stats
        const todayStr = new Date().toISOString().split("T")[0];
        const todaysAtt = atts.filter((a) => a.date.startsWith(todayStr));
        const present = todaysAtt.filter((a) => a.status === "Present").length;
        const absent = todaysAtt.filter((a) => a.status === "Absent").length;
        const onLeave = todaysAtt.filter((a) => a.status === "Half Day").length;
        const attRate =
          emps.length > 0 ? ((present / emps.length) * 100).toFixed(1) : 0;

        // Leave Stats
        const pendingLeaves = leaves.filter(
          (l) => l.status === "Pending",
        ).length;
        const approvedLeaves = leaves.filter(
          (l) => l.status === "Approved",
        ).length;
        const rejectedLeaves = leaves.filter(
          (l) => l.status === "Rejected",
        ).length;

        // Department Stats
        const deptCounts = {};
        emps.forEach((e) => {
          const d = e.department || "Unassigned";
          deptCounts[d] = (deptCounts[d] || 0) + 1;
        });

        setReportData({
          totalEmps: emps.length,
          payroll: {
            totalGross,
            totalDeductions,
            totalNet,
            processed,
            pendingPay,
          },
          attendance: { present, absent, onLeave, attRate },
          leaves: {
            total: leaves.length,
            pending: pendingLeaves,
            approved: approvedLeaves,
            rejected: rejectedLeaves,
          },
          departments: deptCounts,
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchAllData();
  }, [user]);

  if (user.role !== "manager") return null;
  if (!reportData) return <div className="p-4">Loading reports...</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold m-0" style={{ color: "var(--burgundy-dark)" }}>
            Company Reports
          </h2>
          <p className="text-muted mt-1">
            Analyze organization-wide payroll, attendance, and employee data.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {/* Payroll Report */}
        <div className="col-md-6">
          <Card
            className="shadow-sm border-0 h-100"
            title={<h5 className="fw-bold m-0">Payroll Report</h5>}
          >
            <div className="d-flex justify-content-between mb-2">
              <span>Total Employees</span>
              <span className="fw-bold">{reportData.totalEmps}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Processed</span>
              <span className="fw-bold text-success">
                {reportData.payroll.processed}
              </span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span>Pending</span>
              <span className="fw-bold text-warning">
                {reportData.payroll.pendingPay}
              </span>
            </div>

            <div className="d-flex justify-content-between mb-2">
              <span>Total Gross Salary</span>
              <span className="fw-bold">
                ₹{reportData.payroll.totalGross.toLocaleString()}
              </span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Total Deductions</span>
              <span className="fw-bold text-danger">
                ₹{reportData.payroll.totalDeductions.toLocaleString()}
              </span>
            </div>
            <div className="d-flex justify-content-between pt-2 border-top">
              <span className="fw-bold">Total Net Payroll</span>
              <span className="fw-bold text-success">
                ₹{reportData.payroll.totalNet.toLocaleString()}
              </span>
            </div>
          </Card>
        </div>

        {/* Attendance Report */}
        <div className="col-md-6">
          <Card
            className="shadow-sm border-0 h-100"
            title={<h5 className="fw-bold m-0">Attendance Report (Today)</h5>}
          >
            <div className="d-flex justify-content-between mb-2">
              <span>Total Employees</span>
              <span className="fw-bold">{reportData.totalEmps}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Present</span>
              <span className="fw-bold text-success">
                {reportData.attendance.present}
              </span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Absent</span>
              <span className="fw-bold text-danger">
                {reportData.attendance.absent}
              </span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span>On Leave / Half Day</span>
              <span className="fw-bold text-warning">
                {reportData.attendance.onLeave}
              </span>
            </div>

            <div className="d-flex justify-content-between pt-2 border-top">
              <span className="fw-bold">Attendance Rate</span>
              <span className="fw-bold text-success">
                {reportData.attendance.attRate}%
              </span>
            </div>
          </Card>
        </div>

        {/* Leave Report */}
        <div className="col-md-6">
          <Card
            className="shadow-sm border-0 h-100"
            title={<h5 className="fw-bold m-0">Leave Report</h5>}
          >
            <div className="d-flex justify-content-between mb-2">
              <span>Total Requests</span>
              <span className="fw-bold">{reportData.leaves.total}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Approved</span>
              <span className="fw-bold text-success">
                {reportData.leaves.approved}
              </span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Pending</span>
              <span className="fw-bold text-warning">
                {reportData.leaves.pending}
              </span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Rejected</span>
              <span className="fw-bold text-danger">
                {reportData.leaves.rejected}
              </span>
            </div>
          </Card>
        </div>

        {/* Employee Report */}
        <div className="col-md-6">
          <Card
            className="shadow-sm border-0 h-100"
            title={<h5 className="fw-bold m-0">Employee Report</h5>}
          >
            <h6 className="text-muted mb-3">Department Summary</h6>
            {Object.entries(reportData.departments).map(([dept, count]) => (
              <div key={dept} className="d-flex justify-content-between mb-2">
                <span>{dept}</span>
                <span className="fw-bold">{count}</span>
              </div>
            ))}
            {Object.keys(reportData.departments).length === 0 && (
              <span className="text-muted">No departments found.</span>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
