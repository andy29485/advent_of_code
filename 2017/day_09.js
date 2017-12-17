var fs = require('fs'); 



fs.readFile('input/09.txt', 'utf8', function (err, s) {
  s = s.trim();
  console.log('part 1: '+day9(s));
  console.log('part 2: '+day9(s));
});
