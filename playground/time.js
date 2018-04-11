const moment = require('moment')
//
// let date = new Date()
// console.log(date);
// console.log(date.getMonth());

let createdAt = 1234
let date = moment(createdAt)
let timeStamp = moment().valueOf()
console.log(timeStamp);
date.add(1, 'year').subtract(9, 'months')
console.log(date.format('h:mm a'));
