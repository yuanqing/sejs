# sEJS [![npm Version](http://img.shields.io/npm/v/sejs.svg?style=flat)](https://www.npmjs.org/package/sejs) [![Build Status](https://img.shields.io/travis/yuanqing/sejs.svg?style=flat)](https://travis-ci.org/yuanqing/sejs) [![Coverage Status](https://img.shields.io/coveralls/yuanqing/sejs.svg?style=flat)](https://coveralls.io/r/yuanqing/sejs)

> Embedded JavaScript templates without the bells and whistles.

## Why

sEJS spun out of an endeavor to understand how JavaScript templating (in the vein of [ERB](http://ruby-doc.org/stdlib-2.1.2/libdoc/erb/rdoc/ERB.html) or PHP) works.

sEJS is:

- A smaller [EJS](https://github.com/visionmedia/ejs).

- Similar to [John Resig&rsquo;s micro-templating script](http://ejohn.org/blog/javascript-micro-templating/), but without regular expressions and with better error reporting.

## Usage

```js
var tmpl = '<% if (foo) { %>' +
           '<h1><%= foo.bar %>, <%= foo.baz %>!</h1>' +
           '<% } %>';
var data = {
  foo: {
    bar: 'Hello',
    baz: 'World'
  }
};
sejs.render(tmpl, data); //=> "<h1>Hello, World!</h1>"
```

Place JavaScript between `<%` and `%>` tags. To print a variable, use `<%=` for the opening tag.

## API

### sejs.render(tmpl, data)

Renders `tmpl`.

- `tmpl` is a raw EJS template `string`.

- `data` is an `object` containing values to be used in the template.

### sejs.renderFile(tmplFile, data, cb)

Renders the template in `tmplFile`.

- `tmplFile` is the path to a template file.

- `data` is an `object` containing values to be used in the template.

- The `rendered` result is returned via the `cb(err, rendered)` callback.

## Installation

Install via [npm](https://www.npmjs.org/package/sejs):

```bash
$ npm i --save sejs
```

## License

[MIT license](https://github.com/yuanqing/sejs/blob/master/LICENSE)
