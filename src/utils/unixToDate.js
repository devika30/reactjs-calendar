export const convert = (unix) => {
  const milliseconds = unix * 1000;
  const dateObj = new Date(milliseconds);
  return {
    day: dateObj.toLocaleString("en-IN", { weekday: "long" }),
    date: dateObj.toLocaleString("en-IN", { day: "numeric" }),
    month: dateObj.toLocaleString("en-IN", { month: "long" }),
    year: dateObj.toLocaleString("en-IN", { year: "numeric" }),
    hour: dateObj.toLocaleString("en-IN", { hour: "numeric" }).slice(0, 2),
    minute: dateObj.toLocaleString("en-IN", { minute: "numeric" }),
    second: dateObj.toLocaleString("en-IN", { second: "numeric" }),
  };
};
