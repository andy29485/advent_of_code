fs = require('fs'); 



fs.readFile('input/03.txt', 'utf8', function (err, s) {
  console.log(day03(s));
});
