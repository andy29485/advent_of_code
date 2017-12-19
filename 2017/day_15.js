var fs = require('fs');
var bigInt = require("big-integer");

function day15 (gA, gB, p2) {
  var gA   = bigInt(gA);
  var gB   = bigInt(gB);
  var tot  = bigInt();
  var size = 40000000

  function next(num, factor, mod) {
    num = num.multiply(factor).mod(2147483647);
    while (num.mod(mod).compare(0))
      num = num.multiply(factor).mod(2147483647);
    return num;
  }

  if (p2) {
    size = 5000000;
  }
  for (var i=0; i<size; ++i) {
    if (p2) {
      gA = next(gA, 16807, 4);
      gB = next(gB, 48271, 8);
    }
    else {
      gA = next(gA, 16807, 1);
      gB = next(gB, 48271, 1);
    }
    if (gA.xor(gB).toString(2).slice(-16) == 0) {
      //console.log(gA.value+'\n'+gB.value+'\n');
      tot = tot.add(1);
    }
  }

  return tot.toJSNumber();
}

fs.readFile('input/15.txt', 'utf8', function (err, s) {
  var s = s.split('\n');
  var p = /(\d+)\s*$/;
  var a = parseInt(p.exec(s[0])[1]);
  var b = parseInt(p.exec(s[0])[1]);

  console.log('part 1: '+day15(a, b, false));
  console.log('part 2: '+day15(a, b, true));
});
