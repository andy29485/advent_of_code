fs = require('fs');

function day1 (string, step) {
  var sum  = 0;
  var list = string.split('');
  var len  = list.length;
  var step = step || Math.floor(len/2);
  for (i in list) {
    i = parseInt(i);
    c = list[i];
    //console.log('('+i+'+'+step+')%'+len+' = '+' '+(i+step)%len);
    if (c == list[(i+step)%len]) {
      sum += parseInt(c);
    }
  }
  return sum;
}

module.exports = day1;

fs.readFile('inputs/01.txt', 'utf8', function (err, s) {
  console.log('part 1: '+day1(s, 1));
  console.log('part 2: '+day1(s));
});
