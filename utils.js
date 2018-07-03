const subDays = require('date-fns/sub_days');
const subHours = require('date-fns/sub_hours');
const subMinutes = require('date-fns/sub_minutes');

function randomDateTime(finishes) {
  const ref = finishes ? finishes : new Date;
  if(!(ref instanceof Date)) throw Error("Not a Date instance");
  let ret = subDays(ref, Math.floor(2*Math.random()))
  ret = subHours(ret, Math.floor(10*Math.random()))
  ret = subMinutes(ret, Math.floor(30*Math.random()))
  return ret;
}


module.exports = {
  randomDateTime,
}
