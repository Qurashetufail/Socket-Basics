var moment =  require('moment');
var now = moment();

//basic time stamp
console.log(now.format());
console.log(now.format('X'));
console.log(now.format('x'));
console.log(now.valueOf());
var timestamp=now.valueOf();
var timestampMoment= moment.utc(timestamp);
console.log(timestampMoment.local().format('hh:mma Z'));
// now.subtract(1,'year');
// console.log(now.format());
// console.log(now.format('MMM Do YYYY, h:mma'));