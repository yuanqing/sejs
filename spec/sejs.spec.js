/* globals describe, it, expect, jasmine */
'use strict';

var sejs = require('..');
var fs = require('fs');

describe('sejs.render(tmpl, data)', function() {

  it('should work', function() {
    expect(sejs.render('', { foo: 'bar' })).toEqual('');
    expect(sejs.render('<p><%= foo %></p>', { foo: 'bar' })).toEqual('<p>bar</p>');
    expect(sejs.render('<% if (foo) { %><p>\n<%= foo %>\n</p><% } %>', { foo: 'bar' })).toEqual('<p>\nbar\n</p>');
  });

  it('should work if no `data` given', function() {
    expect(sejs.render('')).toEqual('');
    expect(sejs.render('foo')).toEqual('foo');
  });

  it('should allow \\\\ and \\n in `tmpl`', function() {
    expect(sejs.render('<%= foo %>\\baz', { foo: 'bar' })).toEqual('bar\\baz');
    expect(sejs.render('<%= foo %>\nbaz', { foo: 'bar' })).toEqual('bar\nbaz');
  });

  it('should ignore \\r in `tmpl`', function() {
    expect(sejs.render('<%= foo %>\rbaz', { foo: 'bar' })).toEqual('barbaz');
  });

  it('should throw if a variable in `tmpl` is not in `data`', function() {
    try {
      sejs.render('<%= foo %>');
    } catch(e) {
      expect(e.message.indexOf('1\nfoo is not defined') !== -1).toBe(true);
    }
  });

});

describe('sejs.renderFile(tmplFile, data, cb)', function() {

  var fixtureDir = __dirname + '/fixtures/';
  var tmplFile = fixtureDir + 'foo.html';

  it('should return an `err` if `tmplFile` does not exist', function(done) {
    var dummyFile = fixtureDir + 'foo';
    expect(fs.existsSync(dummyFile)).toBe(false);
    sejs.renderFile(dummyFile, function(err) {
      expect(err).toEqual(jasmine.any(Error));
      done();
    });
  });

  it('should return the rendered string in the `cb`', function(done) {
    sejs.renderFile(tmplFile, { foo: 'bar' }, function(err, rendered) {
      expect(err).toBe(null);
      expect(rendered).toBe('bar');
      done();
    });
  });

});
