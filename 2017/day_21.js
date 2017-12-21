fs = require('fs');
D = false;

function day21(rules) {
  var p       = ['.#.','..#','###']; // pattern
  var rules   = rules.split('\n').map((x) => {return x.split(' => ');});
  var iters   = 0;
  var p1 = p2 = 0;

  function match_rule(section) {
    var size = section.length;
    for (var n=0; n<rules.length; ++n) {
      var rule=rules[n][0].replace(/\//g, '');
      if (rule.length != size*size) continue;
      if (rule.replace(/#/g,'') != section.join('').replace(/#/g,'')) continue;
      if(D)console.log('    checking rule: '+rules[n][0]);

      corner_loop:
      for (var t=0; t<8; ++t) {
        for (var i=0; i<size; ++i) {
          for (var j=0; j<size; ++j) {
            switch(t) {
              case 0:
                var r = rule[i*size            + j];
                break;
              case 1:
                var r = rule[i*size            + size-j-1];
                break;
              case 2:
                var r = rule[(size-i-1)*size   + j];
                break;
              case 3:
                var r = rule[(size-i-1)*size   + size-j-1];
                break;
              case 4: // normal
                var r = rule[j*size            + i];
                break;
              case 5:
                var r = rule[j*size            + size-i-1];
                break;
              case 6:
                var r = rule[(size-j-1)*size   + i];
                break;
              case 7:
                var r = rule[(size-j-1)*size   + size-i-1];
                break;
            }
            if(D)console.log('      '+t+'('+i+','+j+')'+section[i][j]+' = '+r);
            if (section[i][j] != r) continue corner_loop;
          }
        }
        return rules[n][1].split('/');
      }
    }
    return false;
  }

  var next = p;
  while (next.length>-1 && iters++ < 19) {
    p    = next;
    next = [];
    var size = (p.length%2==0) ? 2 : 3;

    for(var i=0; i<p.length; i+=size) {
      for(var j=0; j<p[i].length; j+=size) {
        if(D)console.log('  subsecion: ('+i+', '+j+')');
        var sub_section = p.slice(i,i+size).map(x=>x.slice(j,j+size));
        if(D)console.log('  '+sub_section.join('/'))
        var match       =  match_rule(sub_section);

        if (match) {
          var s = match.length;
          var offset = Math.floor(s*i/size);
          if(D)console.log('    replacing with: '+match.join('/'));
          for (var k=0; k<s; ++k) {
            var ki = k+offset
            next[ki] = (next[ki] || '') + match[k];
          }
        }
      }
    }
    if(D)console.log('next: '+next.join('/'));
    if(iters== 6) p1 = p.join('').replace(/[^#]/g, '').length;
    if(iters==19) p2 = p.join('').replace(/[^#]/g, '').length;
  }
  if(D)console.log(p);
  return {p1: p1, p2: p2};
}

fs.readFile('inputs/21.txt', 'utf8', function (err, s) {
  var s = s.trim();
  var result = day21(s);
  console.log('part 1: '+result.p1);
  console.log('part 2: '+result.p2);
});
