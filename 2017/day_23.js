fs = require('fs');



fs.readFile('inputs/25.txt', 'utf8', function (err, s) {
  var s = s.trim();
  var result = day25(s);
  console.log('part 1: '+result.p1);
  console.log('part 2: '+result.p2);
});
