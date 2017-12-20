fs = require('fs');



fs.readFile('inputs/24.txt', 'utf8', function (err, s) {
  var s = s.trim();
  var result = day24(s);
  console.log('part 1: '+result.p1);
  console.log('part 2: '+result.p2);
});
