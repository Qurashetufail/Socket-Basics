var moment =  require('moment');
var now = moment();
console.log(now);
// //basic time stamp
// console.log(now.format());
// console.log(now.format('X'));
// console.log(now.format('x'));
// console.log(now.valueOf());
// var timestamp=now.valueOf();
// var timestampMoment= moment.utc(timestamp);
// console.log(timestampMoment.local().format('hh:mm:ss a Z'));
// // now.subtract(1,'year');
// // console.log(now.format());
// // console.log(now.format('MMM Do YYYY, h:mma'));

function time(){
	now = moment();
	var times=now.valueOf();
	console.log(times);
}

setTimeout(function(){
	for(var i=0;i<5;i++){
	if(i === 3){
		continue;
	}
	time();
}
},2000)

time();