// Import library moment dari node_modules
const moment = require('moment');
const salam = require('./salam');

console.log(salam.salamNodeJs());
console.log('Sekarang :', moment().format('D MMMM YYYY, h:mm:ss a'));