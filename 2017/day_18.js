fs = require('fs');

function day18_1(input) {
  var reg   = {};
  var freq  = 0;
  var pat   = /^([a-z]+)\s+([a-z0-9-]+)\s*([a-z0-9-]+)?$/;
  var input = input.split('\n');

  function get(j) {
    return reg[j] || parseInt(j) || j;
  }

  for(var i=0; i<input.length; ++i) {
    var command = pat.exec(input[i]);
    //console.log(i+' '+input[i]+'  - ('+get(command[2])+', '
    //+get(command[3])+') - '+reg.a);
    var j = k = -1;
    switch (command[1]) {
      case 'snd':
        freq = get(command[2]);
      case 'set':
        reg[command[2]] = get(command[3]);
        break;
      case 'add':
        reg[command[2]] = get(command[2]) + get(command[3]);
        break;
      case 'mul':
        reg[command[2]] = get(command[2]) * get(command[3]);
        break;
      case 'mod':
        reg[command[2]] = get(command[2]) % get(command[3]);
        break;
      case 'rcv':
        if (get(command[2])!=0) return freq;
        break;
      case 'jgz':
        if (get(command[2])>0) i += get(command[3])-1;
        break;
    }
  }
  return freq;
}

function day18_2(input) {
  var reg1  = {p:0};
  var reg2  = {p:1};
  var freq1 = [];
  var freq2 = [];
  var reg   = reg1;
  var count = 0;
  var wait  = false;
  var pat   = /^([a-z]+)\s+([a-z0-9-]+)\s*([a-z0-9-]+)?$/;
  var input = input.split('\n');

  function get(r, j) {
    return isNaN(r[j]) ? isNaN(parseInt(j)) ? j : parseInt(j) : r[j];
  }

  for(var i=j=0; i<input.length||j<input.length;) {
    var command = pat.exec(input[wait?j:i]);

    if (i >= input.length) wait=true;

    if (wait) {++j; reg = reg2;}
    else      {++i; reg = reg1;}

    /*
    console.log((wait?'wait   ':'normal ')+ ('   '+(wait?j:i)).slice(-4)+' - '+
            command[1]+' - ('+('   '+get(reg, command[2])).slice(-3)+', '+
            ('  '+(get(reg,command[3])||(wait?freq2:freq1)[0]||'-')).slice(-3)+
            ') - '+JSON.stringify(reg)
    );
    */

    switch (command[1]) {
      case 'snd':
        if (wait) {freq1.push(get(reg, command[2])); wait=false; ++count;}
        else      {freq2.push(get(reg, command[2]))}
        break;
      case 'set':
        reg[command[2]] = get(reg, command[3]);
        break;
      case 'add':
        reg[command[2]] = get(reg, command[2]) + get(reg, command[3]);
        break;
      case 'mul':
        reg[command[2]] = get(reg, command[2]) * get(reg, command[3]);
        break;
      case 'mod':
        reg[command[2]] = get(reg, command[2]) % get(reg, command[3]);
        break;
      case 'rcv':
        if (wait) {
          if (freq2.length == 0)
            return count;
          reg[command[2]] = freq2.shift();
        }
        else {
          if (freq1.length == 0) {
            wait=true;
            --i;
          }
          else
            reg[command[2]] = freq1.shift();
        }
        break;
      case 'jgz':
        var gtz = get(reg, command[2])>0;
        if (wait && gtz) j += get(reg, command[3])-1;
        else if (gtz)    i += get(reg, command[3])-1;
        break;
    }
  }
  return count;
}

fs.readFile('inputs/18.txt', 'utf8', function (err, s) {
  s = s.trim();
  console.log('part 1: '+day18_1(s));
  console.log('part 2: '+day18_2(s));
});
