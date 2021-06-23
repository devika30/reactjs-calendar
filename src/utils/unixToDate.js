export const convert = (unix) => {
  const milliseconds = unix * 1000;
  const dateObj = new Date(milliseconds);
  return {
    day: dateObj.toLocaleString("en-US", { weekday: "long" }),
    date: dateObj.toLocaleString("en-US", { day: "numeric" }),
    month: dateObj.toLocaleString("en-US", { month: "long" }),
    year: dateObj.toLocaleString("en-US", { year: "numeric" }),
    hour: dateObj.toLocaleString("en-US", { hour: "numeric" }),
    minute: dateObj.toLocaleString("en-US", { minute: "numeric" }),
    second: dateObj.toLocaleString("en-US", { second: "numeric" }),
  };
};
