import React, { useState, useEffect } from "react";
import "../styles/App.css";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const App = () => {
  const today = new Date();

  const [month, setMonth] = useState(1); // February (as shown in blueprint)
  const [year, setYear] = useState(2023);
  const [editYear, setEditYear] = useState(false);
  const [days, setDays] = useState([]);

  // Get number of days in month
  const getDaysInMonth = (m, y) => {
    return new Date(y, m + 1, 0).getDate();
  };

  // Generate calendar
  useEffect(() => {
    const totalDays = getDaysInMonth(month, year);
    const firstDay = new Date(year, month, 1).getDay();

    const temp = [];
    for (let i = 0; i < firstDay; i++) temp.push("");
    for (let d = 1; d <= totalDays; d++) temp.push(d);

    setDays(temp);
  }, [month, year]);

  // Navigation handlers
  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div id="main">
      <h1 id="calendar-heading">Calendar</h1>

      {/* Month dropdown */}
      <select
        id="month-select"
        value={month}
        onChange={(e) => setMonth(Number(e.target.value))}
      >
        {months.map((m, i) => (
          <option key={i} value={i}>{m}</option>
        ))}
      </select>

      {/* Year text / input */}
      {editYear ? (
        <input
          id="year-input"
          type="number"
          defaultValue={year}
          onBlur={(e) => {
            setYear(Number(e.target.value));
            setEditYear(false);
          }}
        />
      ) : (
        <span
          id="year-display"
          onDoubleClick={() => setEditYear(true)}
        >
          {year}
        </span>
      )}

      <hr />

      {/* Calendar table */}
      <table id="days-table">
        <thead>
          <tr>
            <th>Sun</th><th>Mon</th><th>Tue</th>
            <th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil(days.length / 7) }).map((_, i) => (
            <tr key={i}>
              {days.slice(i * 7, i * 7 + 7).map((d, idx) => (
                <td key={idx}>{d}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <hr />

      {/* Navigation buttons */}
      <button id="prev-year" onClick={() => setYear(year - 1)}>&lt;&lt;</button>
      <button id="prev-month" onClick={prevMonth}>&lt;</button>
      <button id="next-month" onClick={nextMonth}>&gt;</button>
      <button id="next-year" onClick={() => setYear(year + 1)}>&gt;&gt;</button>
    </div>
  );
};

export default App;
