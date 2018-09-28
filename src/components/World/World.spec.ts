import {expect} from 'chai';
import {initWorld, stringifyWorld} from './World';

describe('Checking World', () => {
  describe('Ability to import world', () => {
    const worldDescription = '';

    it('Should get empty world with empty string', () => {
      const worldObject = initWorld(worldDescription);
      expect(worldObject).to.be.deep.equal({cities: {}, roads: {}});
    });
  });

  describe('Ability to print the world', () => {
    const worldObject = {cities: {}, roads: {}};

    it('should print an empty string if fed with empty world', () => {
      const worldString = stringifyWorld(worldObject);
      expect(worldString).to.be.deep.equal('');
    });
  });
});
