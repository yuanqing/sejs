# sEJS [![npm Version](http://img.shields.io/npm/v/sejs.svg?style=flat)](https://www.npmjs.org/package/sejs) [![Build Status](https://img.shields.io/travis/yuanqing/sejs.svg?style=flat)](https://travis-ci.org/yuanqing/sejs) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/sejs.svg?style=flat)](https://coveralls.io/r/yuanqing/sejs)

> Embedded JavaScript templates without the bells and whistles.

## Why

sEJS spun out of an endeavor to understand how JavaScript templating (in the vein of [ERB](http://ruby-doc.org/stdlib-2.1.2/libdoc/erb/rdoc/ERB.html) or PHP) works. It is:

- A smaller [EJS](https://github.com/tj/ejs).

- Similar to [John Resig&rsquo;s micro-templating script](http://ejohn.org/blog/javascript-micro-templating/), but without regular expressions and with better error reporting.

## Usage

```js
var tmpl = '<% if (foo) { %>' +
           '<%= foo.bar %>, <%= foo.baz %>!' +
           '<% } %>';
var data = {
  foo: {
    bar: 'Hello',
    baz: 'World'
  }
};

sejs(tmpl)(data); //=> 'Hello, World!'
```

Place JavaScript between `<%` and `%>` tags. To print a variable, use `<%=` for the opening tag.

## API

### sejs(tmpl)(data)

Returns a String, the result of rendering `tmpl` using values from `data`.

- `tmpl` &mdash; The template String.
- `data` &mdash; An Object literal of values.

## Installation

Install via [npm](https://www.npmjs.org/):

```bash
$ npm i --save sejs
```

Install via [bower](http://bower.io/):

```bash
$ bower i --save yuanqing/sejs
```

To use sEJS in the browser, include [the minified script](https://github.com/yuanqing/tmplt/blob/master/sejs.min.js) in your HTML:

```html
<body>
  <!-- ... -->
  <script src="path/to/sejs.min.js"></script>
  <script>
    // sejs available here
  </script>
</body>
```

## Changelog

- 0.2.0
  - `sejs(tmpl)(data)` replaces `sejs.render(tmpl, data)`
  - Remove `sejs.renderFile(tmplFile, data, cb)`
  - Add bower.json
  - Add a minified version of the module
- 0.1.0
  - Initial release

## License

[MIT license](https://github.com/yuanqing/sejs/blob/master/LICENSE)
