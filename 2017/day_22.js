fs = require('fs');



fs.readFile('input/22.txt', 'utf8', function (err, s) {
  var s = s.trim();
  var result = day22(s);
  console.log('part 1: '+result.p1);
  console.log('part 2: '+result.p2);
});
