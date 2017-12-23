fs = require('fs');

const NORTH = 0;
const EAST  = 1;
const SOUTH = 2;
const WEST  = 3;

var fl = Math.floor;
var rd = Math.round;
var D=false;

String.prototype.ra=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}

function day22_1(input) {
  var map = input.split('\n');
  var pos = [fl(map.length/2), fl(map[0].length/2), NORTH];
  var infected = 0;

  function step() {
    map[pos[0]] = map[pos[0]]||''
    if ((map[pos[0]][pos[1]]||'.') == '.') {
      pos[2]      = (pos[2]+3)%4;               // Turn Left
      map[pos[0]] = map[pos[0]].ra(pos[1],'#'); // Infect
      ++infected;
    }
    else {
      pos[2]      = (pos[2]+1)%4;               // Turn Right
      map[pos[0]] = map[pos[0]].ra(pos[1],'.'); // Clean
    }
    switch (pos[2]){
      case NORTH:
        --pos[0];
        if (pos[0] < 0) {pos[0] = 0; map.unshift('.'.repeat(map[0].length));}
        break;
      case SOUTH:
        ++pos[0];
        if (pos[0] >= map.length) {map.push('.'.repeat(map[0].length));}
        break;
      case EAST:
        ++pos[1];
        if (pos[1] >= map[0].length) {map=map.map(x=>x+'.');}
        break;
      case WEST:
        --pos[1];
        if (pos[1] < 0) {pos[1]=0; map=map.map(x=>'.'+x);}
        break;
    }
  }

  function print() {
    var pmap = map.map(
      x=>' '+x.split('').join(' ')+' '
    ).join('\n');
    pmap = pmap.ra(2*((2+map.length)*pos[0]+pos[1]),   '[');
    pmap = pmap.ra(2*((2+map.length)*pos[0]+pos[1]+1), ']');
    console.log('\n'+pos);
    console.log(pmap);
  }

  for(var i=0; i<10000; ++i) {
    if(D)print();
    step(map, pos);
  }
  return infected;
}


function day22_2(input) {
  var map = input.split('\n');
  var pos = [fl(map.length/2), fl(map[0].length/2), NORTH];
  var infected = 0;

  function step() {
    map[pos[0]] = map[pos[0]]||''
    switch ((map[pos[0]][pos[1]]||'.')) {
      case '.':
        pos[2]      = (pos[2]+3)%4;               // Turn Left
        map[pos[0]] = map[pos[0]].ra(pos[1],'W'); // Waken
        break;
      case 'W':
        map[pos[0]] = map[pos[0]].ra(pos[1],'#'); // Infect
        ++infected;
        break;
      case 'F':
        pos[2]      = (pos[2]+2)%4;               // Reverse
        map[pos[0]] = map[pos[0]].ra(pos[1],'.'); // Clean
        break;
      case '#':
        pos[2]      = (pos[2]+1)%4;               // Turn Right
        map[pos[0]] = map[pos[0]].ra(pos[1],'F'); // Flag
        break;
    }
    switch (pos[2]){
      case NORTH:
        --pos[0];
        if (pos[0] < 0) {pos[0] = 0; map.unshift('.'.repeat(map[0].length));}
        break;
      case SOUTH:
        ++pos[0];
        if (pos[0] >= map.length) {map.push('.'.repeat(map[0].length));}
        break;
      case EAST:
        ++pos[1];
        if (pos[1] >= map[0].length) {map=map.map(x=>x+'.');}
        break;
      case WEST:
        --pos[1];
        if (pos[1] < 0) {pos[1]=0; map=map.map(x=>'.'+x);}
        break;
    }
  }

  function print() {
    var pmap = map.map(
      x=>' '+x.split('').join(' ')+' '
    ).join('\n');
    pmap = pmap.ra(2*((2+map.length)*pos[0]+pos[1]),   '[');
    pmap = pmap.ra(2*((2+map.length)*pos[0]+pos[1]+1), ']');
    console.log('\n'+pos);
    console.log(pmap);
  }

  for(var i=0; i<10000000; ++i) {
    if(D)print();
    step(map, pos);
  }
  return infected;
}

fs.readFile('inputs/22.txt', 'utf8', function (err, s) {
  var s = s.trim();
  console.log('part 1: '+day22_1(s));
  console.log('part 2: '+day22_2(s));
});
