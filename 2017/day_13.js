var fs = require('fs');

function day13(input) {
  var pat      = /(\d+): (\d+)/;
  var input    = input.split('\n');
  var scanners = {};
  var sev      = 0;
  var max      = 0;
  function pos(x, depth) {
    var neg = depth==0?0:depth==1?1:2;
    var dep = depth*2 - neg;
    return Math.abs((x+depth-neg)%dep-depth+neg);
  }

  for (var i=0; i<input.length; ++i) {
    //console.log(input[i]);
    line = pat.exec(input[i]);
    scanners[line[1]] = line[2];
    max = Math.max(max, parseInt(line[1]));
  }
  var j  = -1;
  var p1 =  0;
  outer:
  while (true) {
    var sev = 0;
    ++j;
    for (var i=0; i<max+1; ++i) {
      var depth = scanners[i] | 0;
      //console.log(('0000'+i).slice(-2) + ' - ' + depth + ' ' + pos(i, depth));
      if (depth && pos(j+i, depth)==0) {
        sev += i*depth;
        //console.log(('0000'+j).slice(-3) +' '+ ('0000'+i).slice(-3) +  ' - ' + depth);
      }
    }
    if (j === 0)
      p1 = sev;
    if (sev === 0)
      return {p1: p1, p2: j};
  }
}

fs.readFile('input/13.txt', 'utf8', function (err, s) {
  s = s.trim();
  var result = day13(s);
  console.log('part 1: '+result.p1);
  console.log('part 2: '+result.p2);
});
