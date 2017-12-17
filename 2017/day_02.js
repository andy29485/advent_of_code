fs = require('fs');
var bigInt = require("big-integer");

function day2_1 (spreadsheet) {
  var sum = 0;
  spreadsheet.split('\n').forEach(function (row) {
    if (row.length > 0) {
      row = row.split(/\s+/);
      //console.log(row);
      var min = max = row.length>0 ? parseInt(row[0]) : 0;
      row.forEach(function (elem) {
        elem = parseInt(elem);
        //console.log('  ' +elem+' '+min+' '+max);
        if (elem > max) {
          max = elem;
        }
        if (elem < min) {
          min = elem;
        }
      });
      //console.log(sum + ' += ' + max + ' - ' + min);
      //console.log();
      sum += max - min;
    }
  });
  return sum;
}

function day2_2 (spreadsheet) {
  var sum = 0;
  spreadsheet.split('\n').forEach(function (row) {
    if (row.length > 0) {
      row = row.split(/\s+/);
      //console.log(row);
      var min = max = row.length>0 ? parseInt(row[0]) : 0;
      for (var i=0; i<row.length-1; ++i) {
        for (var j=i+1; j<row.length; ++j) {
          if (row[j]%row[i] == 0) {
            max = row[j];
            min = row[i];
          }
          else if (row[i]%row[j] == 0) {
            max = row[i];
            min = row[j];
          }
        }
      }
      //console.log(sum + ' += ' + max + ' - ' + min);
      //console.log();
      sum += max / min;
    }
  });
  return sum;
}


fs.readFile('inputs/02.txt', 'utf8', function (err, s) {
  s = s.trim();
  console.log('part 1: '+day2_1(s));
  console.log('part 2: '+day2_2(s));
});
