import {expect} from 'chai';
import {alienMeetings, generateAliens, moveAliens} from 'components/Alien/Alien';

describe('Checking Alien', () => {
  describe('Ability to generate aliens', () => {

    it('Should get empty world with empty string', () => {
      const alienObject = generateAliens({Foo: {north: 'Bar'}, Bar: {south: 'Foo'}}, 0);
      expect(alienObject).to.be.deep.equal({});
    });

    it('Should get empty world with empty string', () => {
      const alienObject = generateAliens({Foo: {}}, 1);
      expect(alienObject).to.be.deep.equal({Foo: [{name: 0, city: 'Foo'}]});
    });
  });

  describe('Ability to move aliens', () => {

    it('Should move in the next city an alien, if living in a 2 city world', () => {
      const alienDict = moveAliens(
        {Foo: [{name: 0, city: 'Foo'}]},
        {Foo: {north: 'Bar'}, Bar: {south: 'Foo'}}
      );
      expect(alienDict).to.be.deep.equal({Bar: [{name: 0, city: 'Foo'}]});
    });

    it('Should forget about isolated aliens', () => {
      const alienDict = moveAliens(
        {Foo: [{name: 0, city: 'Foo'}]},
        {Foo: {}, Bar: {}}
      );
      expect(alienDict).to.be.deep.equal({});
    });
  });

  describe('Ability to meet aliens', () => {

    it('Should leave alone the aliens if they are on different cities', () => {
      const world = {Foo: {north: 'Bar'}, Bar: {south: 'Foo'}};
      const aliens = {Foo: [{name: 0, city: 'Foo'}], Bar: [{name: 1, city: 'Bar'}]};
      const alienObject = alienMeetings(aliens, world);
      expect(alienObject).to.be.deep.equal({aliens, world});
    });

    it('Should destroy a city, its roads and remove the aliens after a meeting', () => {
      const world = {Foo: {north: 'Bar'}, Bar: {south: 'Foo'}};
      const aliens = {Foo: [{name: 0, city: 'Foo'}, {name: 1, city: 'Bar'}]};
      const alienObject = alienMeetings(aliens, world);
      expect(alienObject).to.be.deep.equal({aliens: {}, world: {Bar: {}}});
    });
  });
});
