var fs = require('fs');

function day12_find(input, can, cant, pipes, group) {
  var pat   = /^(\d+) <-> (.*)$/;

  function path(links) {
    for (var j=0; j<links.length; ++j) {
      if (can.indexOf(links[j]) != -1) {
        return true;
      }
    }
    return false;
  }

  for (var i=0; i<input.length; ++i) {
    //console.log(group + ' ' + i);
    var line  = pat.exec(input[i]);
    var links = line[2].split(/,\s*/);

    pipes[line[1]] = links;
    if (path(links) || line[1] == group) {
      if (can.indexOf(line[1]) == -1)
        can.push(line[1]);
    }
    else {
      cant.push(line[1]);
    }
  }

  var cont = true;
  while (cont) {
    cont = false;
    for (var i=0; i<cant.length; ++i) {
      //console.log(cant.length + ' '+i+ ' '+cant[i]);
      if (path(pipes[cant[i]])) {
        cont = true;
        for (var j=0; j<pipes[cant[i]].length; ++j) {
          var value = pipes[cant[i]][j];
          if (can.indexOf(value) == -1)
            can.push(value);
        }
        cant.splice(i--, 1);
      }
    }
  }
  return {'can': can, 'cant': cant, 'pipes':pipes};
}

function day12(input) {
  var input = input.split('\n');

  var find = day12_find(input, [], [], {}, '0');
  var groups = 1;

  while (find.cant.length > 0) {
    var look = find.cant.shift();
    find = day12_find([], [look], find.cant, find.pipes, look);
    ++groups;
  }
  return {p1: find.can.lenght, p2: groups};
}

module.exports = day12_find;

if (require.main === module) {
  fs.readFile('input/12.txt', 'utf8', function (err, s) {
    s = s.trim();
    var result = day12(s);
    console.log('part 1: '+result.p1);
    console.log('part 2: '+result.p2);
  });
}
