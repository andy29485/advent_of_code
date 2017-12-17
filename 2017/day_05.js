fs = require('fs');

function day5(list, p2) {
  list = list.split('\n');
  for (i in list)
    list[i] = parseInt(list[i]);
  var index = 0;
  var count = 0;
  while (index >= 0 && index < list.length) {
    old = index
    index += list[index];
    if (list[old] >= 3 && p2)
      list[old]--;
    else
      list[old]++;
    count++;
  }
  return count;
}

fs.readFile('input/05.txt', 'utf8', function (err, s) {
  s = s.trim();
  console.log('part 1: '+day5(s));
  console.log('part 2: '+day5(s, true));
});
