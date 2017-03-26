const alice = require('./alice.json');
const rabbits = require('./rabbits.json');
const justwords = require('./justwords.json');
const notjson = require('./notjson.json');
const testsplit = require('./testsplit.json');
const wrongkeys = require('./wrongkeys.js');

describe('InvertedIndex Class', () => {
  beforeAll(() => {
    this.invertedIndex = new InvertedIndex();
  });

  describe('Constructor', () => {
    it('can create inverted index instance', () => {
      expect(typeof this.invertedIndex).toEqual('object');
      expect(this.invertedIndex instanceof InvertedIndex).toBe(true);
    });

    it('has an indexes object to hold all indexes', () => {
      expect(typeof this.invertedIndex.indexes).toEqual('object');
    });
  });

  describe('Validate Files ', () => {
    it('verifies that the JSON file is valid', () => {
      expect(this.invertedIndex.validateFile(rabbits)).toBe(true);
      expect(this.invertedIndex.validateFile(justwords)).toBe(false);
      expect(this.invertedIndex.validateFile(notjson)).toBe(false);
      expect(this.invertedIndex.validateFile(wrongkeys)).toBe(false);
    });
  });

  describe('CreateIndex', () => {
    beforeAll(() => {
      this.invertedIndex.createIndex('alice', alice);
      this.invertedIndex.createIndex('rabbits', rabbits);
    });
    it('creates an index', () => {
      expect(this.invertedIndex.getIndex('alice')).toBeTruthy();
      expect(this.invertedIndex.getIndex('rabbits')).toBeTruthy();
    });

  });
});
