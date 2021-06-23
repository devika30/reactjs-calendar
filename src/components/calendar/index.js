import React, { useState, Fragment } from "react";
import moment from "moment";

const Calendar = (props) => {
  const [state, setState] = useState({
    dateContext: moment(),
    selectedDay: null,
  });

  let weekdaysShort = [
    ...moment.weekdaysShort().slice(1),
    moment.weekdaysShort()[0],
  ];

  //Function returns the current year value
  const getCurrentYear = () => state.dateContext.format("Y");

  //Function returns the current month value
  const getCurrentMonth = () => state.dateContext.format("MMMM");

  //Function returns the number of days in the month
  const daysInMonth = () => state.dateContext.daysInMonth();

  //Function returns the current day value
  const currentDay = () => state.dateContext.format("D");

  //Retuns the number of blank spaces before a month starts
  const firstDayOfMonth = () =>
    moment(state.dateContext).startOf("month").format("d") - 1;

  //Function to change month and get that months details
  const changeMonth = (direction) => {
    let dateContext = { ...state.dateContext };
    direction === "next"
      ? (dateContext = moment(dateContext).add(1, "month"))
      : (dateContext = moment(dateContext).subtract(1, "month"));
    setState((prevState) => ({ ...prevState, dateContext }));
  };

  //Function to set selected date. For same date , toggle between date/null
  const selectDate = (day) => {
    if (day == state.selectedDay) {
      setState((prevState) => ({ ...prevState, selectedDay: null }));
    } else {
      setState((prevState) => ({ ...prevState, selectedDay: day }));
    }
  };

  //Pushing blank values to array to format the calendar
  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    //key = {i*80} to keep every key sort of unique
    blanks.push(<td key={i * 80}>{""}</td>);
  }

  //Pushing dates in arr after checking conditions if that date is selected or is the current date.
  let day = [];
  for (let d = 1; d <= daysInMonth(); d++) {
    let className = d == currentDay() ? " current-day " : "";
    let selectedClass = d == state.selectedDay ? " selected-day " : "";
    day.push(
      <td
        key={d}
        className={className + selectedClass}
        onClick={() => selectDate(d)}
      >
        <span>{d}</span>
      </td>
    );
  }

  //Spreading al data into totalElements
  let totalElements = [...blanks, ...day];
  let rows = [];
  let cells = [];

  totalElements.forEach((el, i) => {
    //Push 7 elements into cell first
    if (i % 7 !== 0) {
      cells.push(el);
    } else {
      //Then once 7 elements are there, push that array into row.
      let insertRow = [...cells];
      rows.push(insertRow);
      //Empty cells array for next iteration
      cells = [];
      cells.push(el);
    }
    //If element is the last element in total Elements, make a new row and push.
    if (i === totalElements.length - 1) {
      let insertRow = [...cells];
      rows.push(insertRow);
    }
  });

  //Header Component (lists current month and year)
  const Header = () => {
    const month = getCurrentMonth();
    const year = getCurrentYear();
    return (
      <Fragment>
        <span className="header">
          {month}&nbsp;{year}
        </span>
      </Fragment>
    );
  };

  //Navigation Component
  const Navigation = () => {
    return (
      <Fragment>
        <button onClick={() => changeMonth("prev")}>
          <i class="fas fa-chevron-left"></i>
        </button>
        <button onClick={() => changeMonth("next")}>
          <i class="fas fa-chevron-right"></i>
        </button>
      </Fragment>
    );
  };

  //Mapping all days Of Week
  const daysOfWeek = weekdaysShort.map((day) => <td key={day}>{day}</td>);

  //Mapping all dates
  const days = rows.map((d, i) => <tr key={i}>{d}</tr>);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-sm-12 col-md-8 col-lg-6">
          <table className="calendar-container">
            <thead>
              <tr>
                <td colSpan="5">
                  <Header />
                </td>
                <td colSpan="2">
                  <Navigation />
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>{daysOfWeek}</tr>
              {days}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
