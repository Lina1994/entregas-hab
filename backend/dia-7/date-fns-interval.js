const { eachDayOfInterval, differenceInBusinessDays } = require("date-fns");

const d1 = new Date(2000, 7, 21);
const d2 = new Date(2000, 8, 21);

const interval = eachDayOfInterval({
  start: d1,
  end: d2,
});

console.log(interval);

const days = differenceInBusinessDays(d2, d1);

console.log(days);
