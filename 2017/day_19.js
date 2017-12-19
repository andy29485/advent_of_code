const fs = require('fs');

const NORTH = 0;
const EAST  = 1;
const SOUTH = 2;
const WEST  = 3;

function getStart(input) {
  var h = input.length;
  var w = input[0].length;
  for (var i=0; i<w; ++i) {
    if (input[0][i] === '|')
      return {pos: [0, i], dir: SOUTH};
    if (input[h-1][i] === '|')
      return {pos: [h-1, i], dir: NORTH};
  }
  for (var i=0; i<h; ++i) {
    if (input[i][0] === '-')
      return {pos: [i, 0], dir: EAST};
    if (input[i][w-1] === '-')
      return {pos: [i, w-1], dir: WEST};
  }
  return {pos: [0, 0], dir: NORTH};
}

function getNext(input, location) {
  switch (location.dir) {
    case NORTH:
      location.pos[0]--;
      var current = input[location.pos[0]][location.pos[1]];
      var next    = (input[location.pos[0]-1]||[])[location.pos[1]];
      var east    = input[location.pos[0]][location.pos[1]+1];
      if (current == '+' || (current == '-' && (!next || next == ' '))) {
        if (east == undefined || east == ' ') // East is bad
          location.dir = WEST;
        else
          location.dir = EAST;
      }
      break
    case EAST:
      location.pos[1]++;
      var current = input[location.pos[0]][location.pos[1]];
      var next    = input[location.pos[0]][location.pos[1]+1];
      var south   = (input[location.pos[0]+1]||[])[location.pos[1]];
      if (current == '+' || (current == '|' && (!next || next == ' '))) {
        if (south == undefined || south == ' ') // South is bad
          location.dir = NORTH;
        else
          location.dir = SOUTH;
      }
      break
    case SOUTH:
      location.pos[0]++;
      var current = input[location.pos[0]][location.pos[1]];
      var next    = (input[location.pos[0]+1]||[])[location.pos[1]];
      var east    = input[location.pos[0]][location.pos[1]+1];
      if (current == '+' || (current == '-' && (!next || next == ' '))) {
        if (east == undefined || east == ' ') // East is bad
          location.dir = WEST;
        else
          location.dir = EAST;
      }
      break
    case WEST:
      location.pos[1]--;
      var current = input[location.pos[0]][location.pos[1]];
      var next = input[location.pos[0]][location.pos[1]-1];
      var south = (input[location.pos[0]+1]||[])[location.pos[1]];
      if (current == '+' || (current == '|' && (!next || next == ' '))) {
        if (south == undefined || south == ' ') // South is bad
          location.dir = NORTH;
        else
          location.dir = SOUTH;
      }
      break
  }
  return location;
}

function day19(input) {
  var input = input.split('\n');
  var steps = 0;
  var seen  = '';
  var cur   = '+';
  var loc   = getStart(input);

  while (cur && cur != ' ') {
    //console.log(loc.pos + ' - ' + cur);
    loc = getNext(input, loc);
    cur = input[loc.pos[0]][loc.pos[1]];
    if (' +-|'.indexOf(cur) == -1)
      seen += cur;
    ++steps;
  }
  return {p1: seen, p2: steps};
}

fs.readFile('inputs/19.txt', 'utf8', function (err, s) {
  var s = s.slice(0, -1);
  var result = day19(s);
  console.log('part 1: '+result.p1);
  console.log('part 2: '+result.p2);
});
