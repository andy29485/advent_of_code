var fs = require('fs');


function Day7Program (name, weight, holding) {
  this.name    = name;
  this.weight  = parseInt(weight);
  this.holding = holding;
}

function day7(string) {
  var programs = string.split('\n');
  var pat = /^(\w+)\s+\((\d+)\)(\s+->\s+([a-z, ]+))?$/;
  var items = [];

  function find(name) {
    for (var i=0; i<items.length; ++i) {
      if (items[i].name == name)
        return i;
    }
    return -1;
  }
  function st(l) {
    var s = '';
    for (k in l) {
      s += l[k].name;
      if (k != l.length-1)
        s += ', ';
    }
    return s;
  }
  function proc(item, i) {
    i = i || 0;
    //console.log(i+' - '+item.name);
    for (var j=0; j<item.holding.length; ++j) {
      if (item.holding[j] == '') {
        //console.log('  '+item.holding[j]+' - ');
        item.holding.pop(j)
      }
      else {
        var index = find(item.holding[j]);
        if (index !== -1) {
          var child = items.splice(index,1)[0];
          //console.log('  '+item.holding[j]+' - '+child.name+'('+index+') - '+st(items)+' - ['+i+']');
          if (index < i) {--i; /*console.log('    shift');*/}
          item.holding[j] = child;
          i = proc(child, i);
        }
      }
    }
    return i;
  }
  function we(item, p) {
    if (!item)
      return 0;
    var s = '' + item.weight;
    var w = parseInt(item.weight);
    var l = item.holding.length;
    //console.log(l);
    for (var j=0; j < l; ++j) {
      //console.log('  '+item.holding[j].name);
      x = we(item.holding[j], 1);
      s += ' + ' + x;
      w += x;
      //console.log(w);
    }
    //if (!p)
    //  console.log(w+' = '+s);
    return w;
  }

  for (var i=0; i<programs.length; ++i) {
    var match   = pat.exec(programs[i]);
    var name    = match[1];
    var weight  = match[2];
    var holding = (match[4]||'').split(/, /);
    items.push(new Day7Program(name, weight, holding));
  }
  for (var i=0; i<items.length; ++i) {
    item = items[i];
    i = proc(item, i);
  }
  function unbalance(i) {
    console.log(i);
    var w = [];
    for (var k=0; k<i.holding.length; ++k) {
      w.push(we(i.holding[k]));
    }
    //console.log(i.holding[0].name);
    if (w[0] != w[1]) {
      if (w[0] != w[2]) {
        if (i.holding[0].holding) {
          var u = unbalance(i.holding[0]);
          if (u) return u;
        }
        return i.holding[0].weight + w[2] - w[0];
      }
      else {
        if (i.holding[1].holding) {
          var u = unbalance(i.holding[1]);
          if (u) return u;
        }
        return i.holding[1].weight + w[2] - w[1];
      }
    }
    var x=1;
    while (x < w.length-1) {
      if (w[0] != w[++x]) {
        if (i.holding[x].holding) {
          var u = unbalance(i.holding[x]);
          if (u) return u;
        }
        return i.holding[x].weight + w[0] - w[x]
      }
    }
    return 0;
  }
  return {p1: items[0].name, p2: unbalance(items[0])};
}

fs.readFile('input/07.txt', 'utf8', function (err, s) {
  s = s.trim();
  var result = day7(s);
  console.log('part 1: '+result.p1);
  console.log('part 2: '+result.p2);
});
