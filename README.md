# mocha-ui-bdd-meta

Mocha BDD UI with Metadata

[![Node.js CI](https://github.com/orieken/mocha-ui-bdd-meta/actions/workflows/node.js.yml/badge.svg?branch=main)](https://github.com/orieken/mocha-ui-bdd-meta/actions/workflows/node.js.yml)

### BDD-style interface with meta:

```typescript

describe('Array', { foo: 'bar' }, function () {
  describe('#indexOf()', { baz: 'buz' }, function () {
    it('should return -1 when not present', { bux: 'bex' }, function () {
      this.meta //? {foo: 'bar', baz: 'buz', bux: 'bex'}
      // ...
    });

    it('should return the index when present', function () {
      // ...
    });
  });
});
```
