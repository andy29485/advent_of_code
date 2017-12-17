var fs = require('fs');



fs.readFile('input/07.txt', 'utf8', function (err, s) {
  s = s.trim();
  console.log('part 1: '+day7(s));
  console.log('part 2: '+day7(s));
});
