const fs = require("fs");
let code = fs.readFileSync("frontend/src/components/Employees.jsx", "utf8");

code = code.replace(
  '<h4 className="fw-bold m-0">20</h4>',
  '<h4 className="fw-bold m-0">{presentToday}</h4>',
);
code = code.replace("83% attendance", "{attendancePercentage}% attendance");
code = code.replace(
  /<h4 className="fw-bold m-0">.*7,80,000<\/h4>/,
  '<h4 className="fw-bold m-0">₹ {totalPayroll}</h4>',
);

fs.writeFileSync("frontend/src/components/Employees.jsx", code);
console.log("Replaced mockups");
