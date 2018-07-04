const addDays = require('date-fns/add_days');
const subDays = require('date-fns/sub_days');
const subHours = require('date-fns/sub_hours');
const subMinutes = require('date-fns/sub_minutes');

function randomDateTime(finishes) {
  const distDays = finishes ? 2 : 90;
  const ref = finishes ? finishes : new Date;
  if(!(ref instanceof Date)) throw Error("Not a Date instance");
  let ret = subDays(ref, Math.floor(distDays*Math.random()))
  if( Math.random() > 0.5 ) ret = addDays(ref, Math.floor(distDays*Math.random()));
  ret = subHours(ret, Math.floor(10*Math.random()))
  ret = subMinutes(ret, Math.floor(30*Math.random()))
  return ret;
}


module.exports = {
  randomDateTime,
}
