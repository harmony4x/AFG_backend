const slug = require('slug')
const moment = require('moment');
require('moment/locale/vi');


// Set the locale to Vietnamese

const timeString = '2023-06-05T:02:12.769Z'; // Assuming the time is 1 hour ago
const date = moment(timeString);

const relativeTime = date.fromNow(true);
moment.locale('vi');
console.log(relativeTime); // Output: "1 hour ago"