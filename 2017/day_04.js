fs = require('fs');

function day4(list) {
  var num_valid_1 = 0;
  var num_valid_2 = 0;
  list.split('\n').forEach(function (passphrase) {
    if (day4_checker1(passphrase))
      ++num_valid_1;
    if (day4_checker2(passphrase))
      ++num_valid_2;
  });
  return {n1: num_valid_1, n2: num_valid_2};
}

function day4_checker1(passphrase) {
  var list  = [];
  var words = passphrase.split(' ');

  for (i in words) {
    word = words[i];
    if (list.indexOf(word) != -1)
      return false;
    list.push(word);
  }
  return true;
}

function day4_checker2(passphrase) {
  var list  = [];
  var words = passphrase.split(' ');

  for (i in words) {
    word = words[i];
    for (i in list) {
      test = list[i];
      for (j in word) {
        c = word[j];
        if (test.indexOf(c) == -1)
          break;
        else if (j == word.length-1 && test.length == 1)
          return false;
        else
          test = test.replace(c, '');
      }
    }
    list.push(word);
  }
  return true;
}

fs.readFile('input/04.txt', 'utf8', function (err, s) {
  s = s.trim();
  result = day4(s);
  console.log('part 1: '+result.n1);
  console.log('part 2: '+result.n2);
});
