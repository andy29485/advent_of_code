var fs = require('fs');


function day8(input) {
  var regs  = {'a':0};
  var lines = input.split('\n');
  var pat   = /^([a-z]+)\s+(inc|dec)\s+([+-]?\d+) if ([a-z]+) (==|<=|>=|!=|<|>) ([+-]?\d+)$/;
  var max   = 0;
  function get(name) {
    return regs[name] = regs[name]|0;
  }
  function check(match) {
    switch (match[5]) {
      case '==':
        return get(match[4]) == match[6];
        break
      case '!=':
        return get(match[4]) != match[6];
        break
      case '>=':
        return get(match[4]) >= match[6];
        break
      case '<=':
        return get(match[4]) <= match[6];
        break
      case '>':
        return get(match[4]) > match[6];
        break
      case '<':
        return get(match[4]) < match[6];
        break
    }
  }

  for (var i=0; i<lines.length; ++i) {
    if (!lines[i]) continue;

    var match = pat.exec(lines[i]);
    match[3]  = parseInt(match[3]);
    match[6]  = parseInt(match[6]);
    if (match[2] == 'dec') match[3] *= -1;

    if (check(match))
      regs[match[1]] = get(match[1]) + match[3];
    if (max < regs[match[1]])
      max = regs[match[1]];

  }

  var max1 = regs.a;
  var max2 = max;
  for (r in regs)
    max1 = regs[r] > max1 ? regs[r] : max1;
  return {p1: max1, p2:max2};
}

fs.readFile('input/09.txt', 'utf8', function (err, s) {
  s = s.trim();
  var result = day8(s);
  console.log('part 1: '+result.p1);
  console.log('part 2: '+result.p2);
});
