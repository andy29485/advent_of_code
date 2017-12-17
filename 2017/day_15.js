var fs = require('fs');
var bigInt = require("big-integer");


fs.readFile('input/15.txt', 'utf8', function (err, s) {
  s = s.trim();
  console.log('part 1: '+day15(s));
  console.log('part 2: '+day15(s));
});
