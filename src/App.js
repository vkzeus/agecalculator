import React, { useState } from "react";
import "./App.css";

const AgeCalculator = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });
  const [errors, setErrors] = useState({ day: "", month: "", year: "" });

  const validateInputs = () => {
    let errors = { day: "", month: "", year: "" };
    let isValid = true;
    const today = new Date();
    const inputYear = parseInt(year, 10);
    const inputMonth = parseInt(month, 10);
    const inputDay = parseInt(day, 10);

    if (!day) {
      errors.day = "This field is required";
      isValid = false;
    } else if (inputDay < 1 || inputDay > 31) {
      errors.day = "Must be a valid day";
      isValid = false;
    }

    if (!month) {
      errors.month = "This field is required";
      isValid = false;
    } else if (inputMonth < 1 || inputMonth > 12) {
      errors.month = "Must be a valid month";
      isValid = false;
    }

    if (!year) {
      errors.year = "This field is required";
      isValid = false;
    } else if (inputYear > today.getFullYear()) {
      errors.year = "Must be in past";
      isValid = false;
    }

    if (isValid && inputMonth && inputDay) {
      const validDaysInMonth = new Date(inputYear, inputMonth, 0).getDate();
      if (inputDay > validDaysInMonth) {
        errors.day = "Must be a valid day";
        isValid = false;
      }
    }

    setErrors(errors);
    return isValid;
  };

  const calculateAge = () => {
    if (!validateInputs()) return;

    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    let diffYears = today.getFullYear() - birthDate.getFullYear();
    let diffMonths = today.getMonth() - birthDate.getMonth();
    let diffDays = today.getDate() - birthDate.getDate();

    if (diffDays < 0) {
      diffMonths--;
      diffDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (diffMonths < 0) {
      diffYears--;
      diffMonths += 12;
    }

    setAge({ years: diffYears, months: diffMonths, days: diffDays });
  };

  return (
    <div className="content">
      <div className="input">
        <div>
          <label>Day</label>
          <input
            id="dayIn"
            type="number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
          {errors.day && <p className="error">{errors.day}</p>}
        </div>
        <div>
          <label>Month</label>
          <input
            id="monthIn"
            type="number"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
          {errors.month && <p className="error">{errors.month}</p>}
        </div>
        <div>
          <label>Year</label>
          <input
            id="yearIn"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          {errors.year && <p className="error">{errors.year}</p>}
        </div>
      </div>

      <button id="calculateBtn" onClick={calculateAge}>
        Calculate
      </button>

      <div className="output">
        <p>
          <span id="yearOut">{age.years}</span> Years
        </p>
        <p>
          <span id="monthOut">{age.months}</span> Months
        </p>
        <p>
          <span id="dayOut">{age.days}</span> Days
        </p>
      </div>

      <div className="attribution">
        <a href="https://www.crio.do" target="_blank" rel="noopener noreferrer">
          Crio
        </a>
      </div>
    </div>
  );
};

export default AgeCalculator;
