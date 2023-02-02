export const localDate = (date) => {
  const res = new Date(date).toLocaleDateString();
  return res;
};

export const localTime = (time) => {
  const res = new Date(time).toLocaleTimeString();
  const splitTime = res.split(" "); // split time (00:00:00) and (am pm)

  const state = splitTime[1]; // am pm

  const fullTime = splitTime[0]; // with seconds
  const slicedTime = fullTime.slice(0, fullTime.length - 3); // removed seconds

  return `${slicedTime} ${state}`;
};
