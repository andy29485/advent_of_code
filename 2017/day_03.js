fs = require('fs');


function day3 (location) {
  var level = 0;
  var total = 1;
  while (location > total+8*level) {
    total += 8*level;
    ++level;
  }
  if (level === 0)
    return 0;
  for (var dir=0; dir<=4; ++dir) {
    var num = total+(level*2)*dir+level;
    if (num > location) {
      var lst = num-level*2;
      var a   = Math.abs(lst-location);
      var b   = Math.abs(num-location);
      return level+(a<b ? a : b);
    }
  }
}

function day3_2(num) {
  var spiral = {'0,0': 1};
  var coords = [0, 1];
  var level  = 1;
  var step   = 0;
  var dir    = 0;
  function sum(pos) {
    var s = 0;
    for (var i = -1; i <= 1; ++i) {
      for (var j = -1; j <= 1; ++j) {
        s += spiral[(pos[0]+i) +','+ (pos[1]+j)] | 0;
      }
    }
    return s;
  }

  while (sum(pos) < num) {
    if (step == level) {
      dir  = (dir+1)%4;
      step = 0;
      if (dir%2) {
        ++level;
      }
    }
    else {
      switch (dir) {
        case 0:
          pos[1]++;
          break
        case 1:
          pos[0]--;
          break
        case 2:
          pos[1]--;
          break
        case 3:
          pos[0]++;
          break
      }
    }
  }
  return spiral[(pos[0]+i) +','+ (pos[1]+j)];
}

fs.readFile('input/03.txt', 'utf8', function (err, s) {
  s = s.trim();
  console.log('part 1: '+day3(s));
  console.log('part 2: '+day3_2(s));
});
