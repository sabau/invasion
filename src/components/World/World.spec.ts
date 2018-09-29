import {expect} from 'chai';
import {initWorld, parseCity, parseDirections, stringifyWorld, validateWorld} from './World';

describe('Checking World', () => {
  describe('Ability to import world', () => {

    it('Should get empty world with empty string', () => {
      const worldObject = initWorld('');
      expect(worldObject).to.be.deep.equal({});
    });

    it('Should parse directions', () => {
      const worldObject = parseDirections(['west=Foo', 'east=Bar']);
      expect(worldObject).to.be.deep.equal({west: 'Foo', east: 'Bar'});
    });


    it('Should ignore wrong directions when parsing them', () => {
      const worldObject = parseDirections(['westt=Foo', 'east=Bar']);
      expect(worldObject).to.be.deep.equal({east: 'Bar'});
    });

    it('Should override duplicated directions when parsing them', () => {
      const worldObject = parseDirections(['west=Foo', 'west=Bar']);
      expect(worldObject).to.be.deep.equal({west: 'Bar'});
    });

    it('Should parseCity', () => {
      const worldObject = parseCity('Foo');
      expect(worldObject).to.be.deep.equal({Foo: {}});
    });

    it('Should parseCity with directions', () => {
      const worldObject = parseCity('Foo west=Bar');
      expect(worldObject).to.be.deep.equal({Foo: {west: 'Bar'}});
    });

    it('Should get a proper world', () => {
      const worldObject = initWorld('./src/components/World/fixtures/world-looping');
      expect(worldObject).to.be.deep.equal({Foo: {north: 'Bar'}, Bar: {south: 'Foo'}});
    });

    it('Should accept valid world', () => {
      const worldObject = initWorld('./src/components/World/fixtures/world-looping');
      expect(validateWorld(worldObject)).to.be.true;
    });

    it('Should reject invalid world', () => {
      const worldObject = initWorld('./src/components/World/fixtures/world-inconsistent');
      expect(validateWorld(worldObject)).to.be.false;
    });

  });

  describe('Ability to print the world', () => {
    const worldObject = {};

    it('should print an empty string if fed with empty world', () => {
      const worldString = stringifyWorld(worldObject);
      expect(worldString).to.be.deep.equal('');
    });
  });
});
