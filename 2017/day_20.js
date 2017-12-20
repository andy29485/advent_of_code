fs = require('fs');

function day20(input) {
  var input     = input.split('\n');                  // split by particles
  var ppat      = /p=<(.*)>,\s*v=<(.*)>,\s*a=<(.*)>/; // particle pattern
  var cpat      = /(-?\d+),\s*(-?\d+),\s*(-?\d+)/;    // coordinate pattern
  var ticks     = 1000;
  var shortest  = {i:0, v:Infinity};
  var left      = 0;
  var particles = [];

  function dist(p) {
    return p.p[0]*p.p[0] + p.p[1]*p.p[1] + p.p[2]*p.p[2];
  }
  function process_tick(p) {
    for (var j=0; j<3; j++) {
      p.v[j] += p.a[j];
      p.p[j] += p.v[j];
    }
    return p;
  }

  for (var i=0; i<input.length; ++i) {
    var particle = ppat.exec(input[i]).slice(1,4);
    var particle = particle.map((x) => {
      return cpat.exec(x).slice(1,4).map( (y)=>{return parseInt(y);} );
    });
    var particle = {p: particle[0], v: particle[1], a: particle[2], r: false};

    particles.push(particle);
  }
  for (var i=0; i<ticks; ++i) {
    var locs = [];
    //console.log(i)
    for (var j=0; j<particles.length; ++j) {
      var p   = process_tick(particles[j]);
      var loc = p.p.join(',');
      var m   = particles[locs.indexOf(loc)];

      //console.log(loc);
      if (m && (m.r === false || m.r === i)) { m.r = i; p.r = i;}
      locs.push(loc);

      if(i == ticks-1) {
        var d = dist(p);
        if (d < shortest.v) {shortest.i1=j; shortest.v=d;}
        if (p.r === false)   {++left};
      }
    }
  }
  return {p1:shortest.i1, p2:left}
}

fs.readFile('inputs/20.txt', 'utf8', function (err, s) {
  var s = s.trim();
  var result = day20(s);
  console.log('part 1: '+result.p1);
  console.log('part 2: '+result.p2);
});
