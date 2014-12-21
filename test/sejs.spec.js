/* globals describe, it, expect */
'use strict';

var sejs = require('..');

describe('sejs(tmpl)(data)', function() {

  it('works without `data`', function() {
    expect(sejs('foo')()).toBe('foo');
  });

  it('should work', function() {
    expect(sejs('')({ foo: 'bar' })).toBe('');
    expect(sejs('<p><%= foo %></p>')({ foo: 'bar' })).toBe('<p>bar</p>');
    expect(sejs('<% if (foo) { %><p>\n<%= foo %>\n</p><% } %>')({ foo: 'bar' })).toBe('<p>\nbar\n</p>');
  });

  it('allows \\\\ and \\n in `tmpl`', function() {
    expect(sejs('<%= foo %>\\baz')({ foo: 'bar' })).toBe('bar\\baz');
    expect(sejs('<%= foo %>\nbaz')({ foo: 'bar' })).toBe('bar\nbaz');
  });

  it('strips \\r from `tmpl`', function() {
    expect(sejs('<%= foo %>\rbaz')({ foo: 'bar' })).toBe('barbaz');
  });

  it('throws if a variable referenced in `tmpl` is not in `data`', function(done) {
    try {
      sejs('\n<%= bar %>')({});
    } catch(err) {
      expect(err.message.indexOf('2| <%= bar %>') !== -1).toBe(true);
      done();
    }
  });

});
