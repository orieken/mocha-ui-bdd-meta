const expect = require('expect.js');

const Level1 = { foo: 'bar' };
const Level2 = { hi: 'bye' };
const TestLevel = { hola: 'adios' };

describe('no meta on suite', function () {
  it('meta on it', TestLevel, function () {
    expect((this as any).test?.meta).to.eql(TestLevel);
  });
});

describe('meta on suite', Level1, function () {
  it('no meta on it', function () {
    expect((this as any).test?.meta).to.eql(Level1);
  });

  it('meta on it', TestLevel, function () {
    expect((this as any).test?.meta).to.eql({ ...Level1, ...TestLevel });
  });
});

describe('Level 1', Level1, function () {
  it('it has meta from Level 1 and spec', TestLevel, function () {
    expect((this as any).test?.meta).to.eql({ ...Level1, ...TestLevel });
  });
  describe('Level 2', Level2, function () {

    it('it has meta from Level 1, level 2', function () {
      expect((this as any).test?.meta).to.eql({ ...Level1, ...Level2 });
    });

    it('it has meta from Level 1, level 2, and spec', TestLevel, function () {
      expect(this.test?.meta).to.eql({ ...Level1, ...Level2, ...TestLevel });
    });
  });
});

xdescribe('no meta on suite', function () {
  xit('meta on it', TestLevel, () => {
    expect(this.test?.meta).to.eql(TestLevel);
  });
});
