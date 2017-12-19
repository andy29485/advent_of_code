var fs = require('fs');

function day16(input) {
  var list  = [];
  var perms = [];
  var total = 1000000000;
  var pat   = /([sxp])([a-z0-9]+)\/?([a-z0-9]+)?$/;
  var input = input.split(/[,\s]+/);
  var size  = 16;


  for(var i=0; i<size; ++i)
    list.push(String.fromCharCode(97 + i));

  for(var n=0; n<total; ++n) {
    for(var i=0; i<input.length; ++i) {
      var action = pat.exec(input[i]);
      var j = k = -1;
      switch (action[1]) {
        case 's':
          var shift = parseInt(action[2])%size;
          for (var j=0; j<shift; ++j)
            list.unshift(list.pop());
          break
        case 'x':
          var j = parseInt(action[2]);
          var k = parseInt(action[3]);
        case 'p':
          if (j == -1 || k == -1) {
            j = list.indexOf(action[2]);
            k = list.indexOf(action[3]);
          }
          var t = list[j];
          list[j] = list[k];
          list[k] = t;
          break
      }
      //console.log(action + ' '+list.join(''));
    }
    var str = list.join('');
    if (perms.indexOf(str) != -1)
      return {p1: perms[0], p2: perms[(total-1)%perms.length]};
    perms.push(str);
  }

}

fs.readFile('inputs/16.txt', 'utf8', function (err, s) {
  s = s.trim();
  var result = day16(s);
  console.log('part 1: '+result.p1);
  console.log('part 2: '+result.p2);
});
