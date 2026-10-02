import React, { useState } from "react";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import axios from "axios";

export default function Login({ onLogin }) {
  const [managerEmail, setManagerEmail] = useState("manager@payflow.com");
  const [managerPassword, setManagerPassword] = useState("admin123");

  const [employeeId, setEmployeeId] = useState("EMP001");
  const [employeePassword, setEmployeePassword] = useState("123");

  const [error, setError] = useState("");

  const handleManagerLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/employees/login",
        {
          email: managerEmail,
          password: managerPassword,
          type: "manager",
        },
      );

      onLogin(res.data);
    } catch (err) {
      setError("Invalid Manager credentials.");
    }
  };

  const handleEmployeeLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/employees/login",
        {
          employeeId,
          password: employeePassword,
          type: "employee",
        },
      );

      onLogin(res.data);
    } catch (err) {
      setError("Invalid Employee ID or password.");
    }
  };

  return (
    <div
      className="login-page"
      style={{
        minHeight: "100vh",
        background: "#FFF7ED",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative Background */}
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          background: "#4C0519",
          borderRadius: "50%",
          top: "-280px",
          left: "-180px",
          opacity: 0.08,
        }}
      />

      <div
        style={{
          position: "absolute",
          width: "450px",
          height: "450px",
          background: "#9F1239",
          borderRadius: "50%",
          bottom: "-280px",
          right: "-180px",
          opacity: 0.07,
        }}
      />

      {/* Login Container */}
      <Card
        className="login-card"
        style={{
          width: "430px",
          maxWidth: "100%",
          borderRadius: "22px",
          border: "1px solid #E7E5E4",
          background: "#FFFFFF",
          boxShadow: "0 20px 60px rgba(76, 5, 25, 0.12)",
          overflow: "hidden",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Top Brand Section */}
        <div
          style={{
            background: "#4C0519",
            margin: "-20px -20px 25px -20px",
            padding: "32px 25px 28px",
            textAlign: "center",
            borderRadius: "0 0 22px 22px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                background: "#C9972B",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#4C0519",
                fontSize: "25px",
                fontWeight: "800",
              }}
            >
              <i className="pi pi-shield"></i>
            </div>

            <span
              style={{
                color: "#FFFFFF",
                fontSize: "30px",
                fontWeight: "700",
                letterSpacing: "-1px",
              }}
            >
              Pay<span style={{ color: "#F59E0B" }}>Ledger</span>
            </span>
          </div>

          <p
            style={{
              color: "#FDE8EF",
              margin: 0,
              fontSize: "14px",
            }}
          >
            Payroll Management System
          </p>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-4">
          <h3
            style={{
              color: "#18181B",
              fontWeight: "700",
              marginBottom: "6px",
            }}
          >
            Welcome Back
          </h3>

          <p
            style={{
              color: "#71717A",
              fontSize: "14px",
              margin: 0,
            }}
          >
            Sign in to continue to your PayLedger account
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: "#FEF2F2",
              color: "#B91C1C",
              border: "1px solid #FECACA",
              borderRadius: "10px",
              padding: "10px 12px",
              textAlign: "center",
              fontSize: "14px",
              marginBottom: "18px",
            }}
          >
            <i
              className="pi pi-exclamation-circle"
              style={{ marginRight: "7px" }}
            />
            {error}
          </div>
        )}

        {/* Login Tabs */}
        <TabView
          pt={{
            nav: {
              style: {
                borderBottom: "1px solid #E7E5E4",
              },
            },
          }}
        >
          {/* ================= MANAGER ================= */}
          <TabPanel header="Manager">
            <form
              onSubmit={handleManagerLogin}
              className="d-flex flex-column gap-3 mt-3"
            >
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#18181B",
                    fontWeight: "600",
                    fontSize: "14px",
                    marginBottom: "7px",
                  }}
                >
                  Manager Email
                </label>

                <span className="p-input-icon-left w-100">
                  <i className="pi pi-envelope" />

                  <InputText
                    value={managerEmail}
                    onChange={(e) => setManagerEmail(e.target.value)}
                    className="w-100"
                    placeholder="Enter manager email"
                    style={{
                      borderRadius: "10px",
                      padding: "12px 12px 12px 40px",
                      border: "1px solid #D6D3D1",
                    }}
                  />
                </span>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    color: "#18181B",
                    fontWeight: "600",
                    fontSize: "14px",
                    marginBottom: "7px",
                  }}
                >
                  Password
                </label>

                <Password
                  value={managerPassword}
                  onChange={(e) => setManagerPassword(e.target.value)}
                  toggleMask
                  className="w-100"
                  inputStyle={{
                    width: "100%",
                    borderRadius: "10px",
                    padding: "12px",
                    border: "1px solid #D6D3D1",
                  }}
                  feedback={false}
                  placeholder="Enter password"
                />
              </div>

              <Button
                label="Login as Manager"
                icon="pi pi-sign-in"
                type="submit"
                className="w-100 mt-2"
                style={{
                  background: "#9F1239",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px",
                  fontWeight: "600",
                  boxShadow: "0 5px 15px rgba(159, 18, 57, 0.20)",
                }}
              />
            </form>
          </TabPanel>

          {/* ================= EMPLOYEE ================= */}
          <TabPanel header="Employee">
            <form
              onSubmit={handleEmployeeLogin}
              className="d-flex flex-column gap-3 mt-3"
            >
              <div>
                <label
                  style={{
                    display: "block",
                    color: "#18181B",
                    fontWeight: "600",
                    fontSize: "14px",
                    marginBottom: "7px",
                  }}
                >
                  Employee ID
                </label>

                <span className="p-input-icon-left w-100">
                  <i className="pi pi-id-card" />

                  <InputText
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    className="w-100"
                    placeholder="Example: EMP001"
                    style={{
                      borderRadius: "10px",
                      padding: "12px 12px 12px 40px",
                      border: "1px solid #D6D3D1",
                    }}
                  />
                </span>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    color: "#18181B",
                    fontWeight: "600",
                    fontSize: "14px",
                    marginBottom: "7px",
                  }}
                >
                  Password
                </label>

                <Password
                  value={employeePassword}
                  onChange={(e) => setEmployeePassword(e.target.value)}
                  toggleMask
                  className="w-100"
                  inputStyle={{
                    width: "100%",
                    borderRadius: "10px",
                    padding: "12px",
                    border: "1px solid #D6D3D1",
                  }}
                  feedback={false}
                  placeholder="Enter password"
                />
              </div>

              <Button
                label="Login as Employee"
                icon="pi pi-sign-in"
                type="submit"
                className="w-100 mt-2"
                style={{
                  background: "#9F1239",
                  border: "none",
                  borderRadius: "10px",
                  padding: "12px",
                  fontWeight: "600",
                  boxShadow: "0 5px 15px rgba(159, 18, 57, 0.20)",
                }}
              />
            </form>
          </TabPanel>
        </TabView>

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: "25px",
            paddingTop: "18px",
            borderTop: "1px solid #E7E5E4",
          }}
        >
          <p
            style={{
              color: "#71717A",
              fontSize: "12px",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} PayLedger · Payroll Management System
          </p>
        </div>
      </Card>
    </div>
  );
}
