var fs = require('fs');



fs.readFile('input/16.txt', 'utf8', function (err, s) {
  s = s.trim();
  var result = day16(s);
  console.log('part 1: '+result.p1);
  console.log('part 2: '+result.p2);
});
