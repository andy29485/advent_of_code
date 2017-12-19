var fs = require('fs');

function day10(string) {
  var input = [];
  var list  = [];
  var out   = '';
  var index = 0;
  var tot = 256;
  for (var i=0; i<tot; ++i) list.push(i);
  for (var i=0; i<string.length; ++i) input.push(string.charCodeAt(i));
  input.push(17, 31, 73, 47, 23);

  //console.log(input);

  for (var k=0; k<64; ++k) {
    for (var i=0; i<input.length; ++i) {
      var len = parseInt(input[i]);
      for (var j=0; j<parseInt(len/2); ++j) {
        var x = (index+j)%tot;
        var y = (len+index-j+tot-1)%tot;
        //console.log(x+', '+y+'('+len+' '+index+' '+j+')');
        var t = list[x];
        list[x] = list[y];
        list[y] = t;
      }
      //console.log(list);
      index = (len+index+i+input.length*k)%tot;
    }
  }

  var p1 = list[0]*list[1];

  for (var i=0; i<16; ++i) {
    var x=0;
    for (var j=0; j<16; ++j) {
      x = x^list[16*i+j];
    }
    out += ('0' + x.toString(16)).slice(-2);
  }
  return {p1: p1, p2: out};
}



module.exports = function(string) {
  return day10(string).p2;
};

if (require.main === module) {
  fs.readFile('input/10.txt', 'utf8', function (err, s) {
    s = s.trim();
    var result = day10(s);
    console.log('part 1: '+result.p1);
    console.log('part 2: '+result.p2);
  });
}
