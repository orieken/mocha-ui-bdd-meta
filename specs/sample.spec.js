var expect = require('expect.js');

describe('no meta on suite',  function() {
  it('meta on it',{words: 1}, function() {
    expect(this.test.meta).to.eql({ words: 1});
  });
});

describe('meta on suite',{x: 1},  function() {
  it('no meta on it', function() {
    expect(this.test.meta).to.eql({ x: 1});
  });

  it('meta on it', { words: 1 }, function() {
    const suiteMeta = this.test.parent.meta;
    const testMeta = this.test.meta;

    expect(this.test.parent.meta).to.eql({ x: 1});
    expect(this.test.meta).to.eql(Object.assign({}, suiteMeta, testMeta));
  });
});
