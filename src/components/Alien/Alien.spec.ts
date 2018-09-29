import {expect} from 'chai';
import {generateAliens} from 'components/Alien/Alien';

describe('Checking Alien', () => {
  describe('Ability to generate aliens', () => {

    it('Should get empty world with empty string', () => {
      const alienObject = generateAliens({Foo: {north: 'Bar'}, Bar: {south: 'Foo'}}, 0);
      expect(alienObject).to.be.deep.equal({});
    });

  });
});
