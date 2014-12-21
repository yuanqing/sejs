/* jshint quotmark: false */
(function(factory) {
  // istanbul ignore if
  if (typeof exports === 'undefined') {
    this.sejs = factory;
  } else {
    module.exports = exports = factory;
  }
})(function(tmpl) {

  tmpl = tmpl.replace('\r', '');

  var lines = tmpl.split('\n');
  var str = []; // accumulators as we iterate over each character in `tmpl`
  var buf = [];
  var compiled = []; // array of lines of the compiled function
  var n = 1; // the current line number
  var isNewLine = false; // true if we have iterated onto a new line
  var isEcho = false; // true if we are between '<%=' and '%>'
  var i = -1;
  var len = tmpl.length;

  var pushStrToBuf = function() {
    if (str.length) {
      str = str.join('');
      if (isEcho) {
        str = str.trim();
        buf.push(isNewLine ? "(n=" + n + ",l='" + lines[n-1] + "'," + str + ")" : str);
        isNewLine = false;
      } else {
        buf.push("'" + str + "'");
      }
      str = [];
    }
  };

  var pushBufToCompiled = function() {
    if (buf.length) {
      compiled.push('b.push(' + buf.join(',') + ');');
      buf = [];
    }
  };

  while (++i < len) {
    switch (tmpl[i] + tmpl[i+1]) {
    case '<%':
      pushStrToBuf();
      if (tmpl[i+2] === '=') { // echo
        isEcho = true;
        i++;
      }
      i++;
      break;
    case '%>':
      if (isEcho) {
        pushStrToBuf();
        isEcho = false;
      } else {
        pushBufToCompiled();
        if (isNewLine) {
          compiled.push("n=" + n + ";l='" + lines[n-1] + "';");
          isNewLine = false;
        }
        compiled.push(str.join('').trim());
        str = [];
      }
      i++;
      break;
    default:
      switch (tmpl[i]) {
      case '\n':
        isNewLine = true;
        str.push('\\n');
        n++;
        break;
      case '\\':
        str.push('\\\\');
        break;
      default:
        str.push(tmpl[i]);
        break;
      }
    }
  }
  pushStrToBuf();
  pushBufToCompiled();

  return new Function('d', "try{var b=[],n=1,l='" + lines[0] + "';with(d||{}){" + compiled.join('') + "}return b.join('');}catch(e){e.message='\\n  '+n+'| '+l+'\\n\\n'+e.message;\n  throw e;\n}");

});
