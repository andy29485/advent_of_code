var fs = require('fs');


function day9(line) {
  var DEF = 0; var GAR = 1; var IGN = 2;
  var score = 0;
  var count = 0;
  var garb  = 0;
  var state = DEF;

  for (var i=0; i<line.length; ++i) {
    c = line[i];
    //console.log(c + ' - ' + (state==DEF ? 'def' : state==GAR ? 'gar' : 'ign') + ' - ' + score + ', ' + count);
    switch(state) {
      case DEF:
        switch (c) {
          case '{': score+=(++count); continue;
          case '}': count--;          continue;
          case '<': state = GAR;      continue;
        }
        continue;
      case GAR:
        switch (c) {
          case '>': state = DEF; continue;
          case '!': state = IGN; continue;
        }
        ++garb;
        continue;
      case IGN:
        state = GAR;
    }

  }
  return {p1: score, p2: garb};
}

fs.readFile('input/09.txt', 'utf8', function (err, s) {
  s = s.trim();
  var result = day9(s);
  console.log('part 1: '+result.p1);
  console.log('part 2: '+result.p2);
});
