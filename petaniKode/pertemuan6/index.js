const url = require('url');

// Belajar Parsing URL
const link = encodeURI('https://www.petanikode.com/search.php?year=2018&month=february');
const q = url.parse(link, true);

console.log('Protocol :', q.protocol);
console.log('Hostname :', q.host);
console.log('Params   :', q.search);
console.log('Path     :', q.pathname);

// Catch params as object
console.log(q.query);