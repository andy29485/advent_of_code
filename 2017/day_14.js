var fs = require('fs');
var day10_2 = require('./day10.js');
var day12_find = require('./day12.js');


function day14(input) {
  var used    = 0;
  var regions = 0;
  var last    = '0'.repeat(33);
  var nodes   = {};
  for (var i=0; i<128; ++i) {
    var row  = day10_2(input+'-'+i);
    var prev = false;
    var cntd = false;
    //console.log(row);
    for (var j=0; j<128; ++j) {
      var cnum = parseInt(row[Math.floor(j/4)],  16);
      var lnum = parseInt(last[Math.floor(j/4)], 16);
      var pow  = Math.round(Math.pow(2,3-j%4));
      var cset = (cnum&pow) > 0;
      var nset = (lnum&pow) > 0;
      var lset = (lnum&pow) > 0;

      //console.log('('+i+', '+j+') - '+(cset?1:0)+' '+(lset?1:0));
      if (cset) {
        var id = i+','+j;
        nodes[id] = [id];
        ++used;
        if (prev) {
          nodes[id].push(i+','+(j-1));
        }
        if (lset) {
          nodes[id].push((i-1)+','+j);
        }
        k = j+1
        if(k<128) {
          var nnum = parseInt(row[Math.floor(k/4)], 16);
          var pow  = Math.round(Math.pow(2,3-k%4));
          if ((lnum&pow) > 0 ) {
            nodes[id].push(i+','+k);
          }
        }
      }
      prev = cset;
    }
    last = row;
  }

  var find = {'can':[], 'cant':Object.keys(nodes), 'pipes':nodes};
  while (find.cant.length > 0) {
    var look = find.cant.shift();
    find = day12_find([], [look], find.cant, find.pipes, look);
    //console.log(find.can);
    ++regions;
  }

  return {p1: used, p2: regions};
}

fs.readFile('input/14.txt', 'utf8', function (err, s) {
  s = s.trim();
  var result = day14(s);
  console.log('part 1: '+result.p1);
  console.log('part 2: '+result.p2);
});
