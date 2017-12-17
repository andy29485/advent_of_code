var fs = require('fs');

function day6(list) {
  var count = 0;
  var seen = [];
  list = list.split(/\s+/);
  for (i in list)
    list[i] = parseInt(list[i]);
  var l = list.length;
  while (seen.indexOf(list.toString()) == -1) {
    seen.push(list.toString());
    //console.log(list);
    var index = 0;
    var max = list[0];
    for (i in list) {
      if (list[i] > max) {
        max   = list[i];
        index = i;
      }
    }
    list[index] = 0;
    index = parseInt(index);
    while (max > 0) {
      //console.log('  '+list+' - '+index+' (('+index+'+1)%'+l+' = '+((index+1)%l)+')');
      max--;
      index = (index+1)%l;
      list[index]++;
    }
    count++;
  }
  return {p1: count, p2: (seen.length - seen.indexOf(list.toString()))};
}

fs.readFile('input/06.txt', 'utf8', function (err, s) {
  s = s.trim();
  var result = day6(s);
  console.log('part 1: '+result.p1);
  console.log('part 2: '+result.p2);
});
