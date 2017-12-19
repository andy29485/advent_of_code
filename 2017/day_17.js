var fs = require('fs');

function day17(input) {
  var list  = [0];
  var steps = parseInt(input);
  var index = 0;
  var p1    = 0;
  var p2    = 0;

  for(var i=1; i<=50000000; ++i) {
    index = (index+steps)%i+1;
    //list.splice(index, 0, i);
    if (i === 2017) p1 = list[(index+1)%list.length];
    if (index == 1) p2 = i;
    //if (i<30) console.log(list.length + ' - '+ list[1] + ' - ' + p2);
  }

  return {p1: p1, p2: p2};
}

fs.readFile('inputs/17.txt', 'utf8', function (err, s) {
  s = s.trim();
  var result = day17(s);
  console.log('part 1: '+result.p1);
  console.log('part 2: '+result.p2);
});
