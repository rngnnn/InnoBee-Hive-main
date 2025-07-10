import React, { useState } from "react";
import {
  IoMdArrowDropleftCircle,
  IoMdArrowDroprightCircle,
} from "react-icons/io";

const generateDaysInMonth = (year, month) => {
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const DateTimePicker = ({ showPicker, togglePicker }) => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [hour, setHour] = useState(today.getHours());
  const [minute, setMinute] = useState(today.getMinutes());

  const daysInMonth = generateDaysInMonth(currentYear, currentMonth);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleHourChange = (e) => {
    const newHour = parseInt(e.target.value, 10);
    if (newHour >= 0 && newHour < 24) {
      setHour(newHour);
    }
  };

  const handleMinuteChange = (e) => {
    const newMinute = parseInt(e.target.value, 10);
    if (newMinute >= 0 && newMinute < 60) {
      setMinute(newMinute);
    }
  };

  // Function to navigate between months
  const changeMonth = (direction) => {
    if (direction === "next") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  // Function to change the year directly via input
  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentYear(newYear);
  };

  // Helper to determine the empty days at the start of the calendar grid
  const getStartOffset = (firstDayOfMonth) => {
    return firstDayOfMonth.getDay();
  };

  const startOffset = getStartOffset(new Date(currentYear, currentMonth, 1));

  return (
    <>
      {showPicker && (
        <div className="p-4 mt-2 border rounded shadow-md bg-white absolute bottom-full left-0 text-xs">
          {/* Month and Year Controls */}
          <div className="flex items-center justify-between mb-4 bg-gray-300 rounded">
            <button
              className="bg-gray-300 text-gray-800 py-1 px-2 rounded"
              onClick={() => changeMonth("prev")}
            >
              <IoMdArrowDropleftCircle />
            </button>
            <div className="flex items-center gap-2 ">
              <select
                value={currentMonth}
                onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
                className=" p-1 rounded bg-gray-300 outline-none"
              >
                {months.map((month, index) => (
                  <option value={index} key={month}>
                    {month}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={currentYear}
                onChange={handleYearChange}
                className="w-20  p-1 rounded bg-gray-300 outline-none"
                min="1900"
                max="2100"
              />
            </div>
            <button
              className="bg-gray-300 text-gray-800 py-1 px-2 rounded"
              onClick={() => changeMonth("next")}
            >
              <IoMdArrowDroprightCircle />
            </button>
          </div>

          {/* Calendar with Days of the Week */}
          <div className="grid grid-cols-7 gap-2 text-center mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="font-bold text-gray-700 text-xs">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {Array.from({ length: startOffset }, (_, i) => (
              <div key={`empty-${i}`} className="p-1"></div>
            ))}

            {daysInMonth.map((day) => (
              <button
                key={day.toDateString()}
                onClick={() => handleDateClick(day)}
                className={`p-1 rounded text-xs ${
                  selectedDate.toDateString() === day.toDateString()
                    ? "bg-pri-color text-white"
                    : "bg-gray-200"
                }`}
              >
                {day.getDate()}
              </button>
            ))}
          </div>

          {/* Time Picker */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <label className="mr-2">Hour:</label>
              <input
                type="number"
                value={hour}
                onChange={handleHourChange}
                className="w-16 p-1 border rounded focus:ring focus:ring-yellow"
                min="0"
                max="23"
              />
            </div>

            <div className="flex items-center">
              <label className="mr-2">Minute:</label>
              <input
                type="number"
                value={minute}
                onChange={handleMinuteChange}
                className="w-16 p-1 border rounded focus:ring focus:ring-yellow-300"
                min="0"
                max="59"
              />
            </div>
          </div>
          {/* Display the selected date and time */}
          <div className="mt-4">
            <p>Selected Date: {selectedDate.toLocaleDateString()}</p>
            <p>
              Selected Time: {String(hour).padStart(2, "0")}:
              {String(minute).padStart(2, "0")}
            </p>
          </div>
          <div className="flex justify-end" onClick={togglePicker}>
            <button className="bg-gray-200 px-3 py-1 rounded">Done</button>
          </div>
        </div>
      )}
    </>
  );
};

export default DateTimePicker;
