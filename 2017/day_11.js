var fs = require('fs');

function day11(input) {
  var input = input.split(/,\s*/);
  var max   = 0;
  var x = y = z = 0;

  function dist(x, y, z) {
    return Math.max(Math.abs(x), Math.abs(y), Math.abs(z));
  }

  for (var i=0; i<input.length; ++i) {
    dir = input[i];
    switch (dir) {
      case 'n':
        x+=1; z+=1; break
      case 'ne':
        y+=1; z+=1; break
      case 'nw':
        x+=1; y-=1; break
      case 's':
        x-=1; z-=1; break
      case 'sw':
        y-=1; z-=1; break
      case 'se':
        x-=1; y+=1; break
    }
    max = Math.max(max, dist(x,y,z));
  }
  return {p1: dist(x,y,z), p2: max};
}

fs.readFile('input/11.txt', 'utf8', function (err, s) {
  s = s.trim();
  var result = day11(s);
  console.log('part 1: '+result.p1);
  console.log('part 2: '+result.p2);
});
