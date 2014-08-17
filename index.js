var fs = require('fs');

var sejs = {};

sejs.compile = function(tmpl, filePath) {

  filePath = filePath || 'sejs';

  var buf = [], echoBuf = [], str = '';
  var newLine = false, echo = false;
  var n = 1, i, len;

  var pushToEchoBuf = function() {
    if (str !== '') {
      if (echo) {
        str = str.trim();
        echoBuf.push(newLine ? '(n=' + n + ',' + str + ')' : str);
        newLine = false;
      } else {
        echoBuf.push("'" + str + "'");
      }
      str = '';
    }
  };

  var pushToBuf = function() {
    if (echoBuf.length) {
      buf.push('b.push(' + echoBuf.join(',') + ');');
      echoBuf = [];
    }
  };

  for (i=0, len = tmpl.length; i<len; ++i) {
    switch (tmpl[i] + tmpl[i+1]) {
    case '<%':
      pushToEchoBuf();
      if (tmpl[i+2] === '=') { // echo
        echo = true;
        i += 1;
      }
      i += 1;
      break;
    case '%>':
      i += 1;
      if (echo) {
        pushToEchoBuf();
        echo = false;
      } else {
        pushToBuf(); // empties echoBuf
        if (newLine) {
          buf.push('n=' + n + ';');
          newLine = false;
        }
        buf.push(str.trim() + ' ');
        str = '';
      }
      break;
    default:
      switch (tmpl[i]) {
      case '\r':
        break;
      case '\n':
        n += 1;
        newLine = true;
        str += '\\n';
        break;
      case '\\':
        str += '\\\\';
        break;
      default:
        str += tmpl[i];
        break;
      }
    }
  }
  pushToEchoBuf();
  pushToBuf();

  return new Function('d', "try{var n=1,b=[];with(d||{}){" + buf.join('') + "}return b.join('');}catch(err){err.message='" + filePath + ":'+n+'\\n'+err.message;throw err;}");
};

sejs.render = function(tmpl, data, tmplFile) {
  return sejs.compile(tmpl, tmplFile)(data);
};

sejs.renderFile = function(tmplFile, data, cb) {
  if (typeof data === 'function') {
    cb = data;
    data = {};
  }
  fs.readFile(tmplFile, 'utf8', function(err, tmpl) {
    if (err) return cb(err);
    cb(null, sejs.render(tmpl, data, tmplFile));
  });
};

module.exports = exports = sejs;
