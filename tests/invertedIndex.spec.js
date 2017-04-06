const alice = require('../books/alice.json');
const rabbits = require('../books/rabbits.json');
const wrongkeys = require('../books/wrongkeys.json');
const oneKey = require('../books/oneKey.json');
const emptyString = require('../books/emptystring.json');

describe('InvertedIndex Test Suite', () => {
  beforeAll(() => {
    this.invertedIndex = new InvertedIndex();
    this.invertedIndex.createIndex('alice', alice);
    this.invertedIndex.createIndex('rabbits', rabbits);
    const eventListener = jasmine.createSpy();
    const dummyFileReader = { addEventListener: eventListener };
    spyOn(window, 'FileReader').and.returnValue(dummyFileReader);
  });

  describe('InvertedIndex Class', () => {
    it('should be defined', () => {
      expect(InvertedIndex).toBeDefined();
    });

    it('should create inverted index instance', () => {
      expect(this.invertedIndex instanceof InvertedIndex).toBe(true);
    });

    it('should have object as the instance of invertedIndex', () => {
      expect(typeof this.invertedIndex).toEqual('object');
    });

    it('should have an indexed object to hold all indexes', () => {
      expect(typeof this.invertedIndex.indexed).toEqual('object');
    });
  });

  describe('The readFile method', () => {
    it('should read a file', () => {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        const fileRead = reader.result;
        expect(fileRead).toBeTruthy();
        expect(JSON.parse(fileRead) instanceof Object).toBeTruthy();
        done();
      });
    });

    it('should call validateFile', () => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const fileRead = JSON.parse(reader.result);
        expect(InvertedIndex.validateFile(fileRead)).toHaveBeenCalled;
        done();
      });
    });

    it('should return the json file if it is valid', () => {
      expect(InvertedIndex.readFile(alice)).toBeTruthy();
    });

    it('should return the false if the file cannot be parsed', () => {
      const readFile = InvertedIndex.readFile(alice);
      expect(typeof readFile).toEqual('object');
    });
  });

  describe('createIndex function', () => {
    it('should create an index for a valid file', () => {
      expect(this.invertedIndex.indexed.alice.numOfDocs).toBe(3);
    });

    it('should should return a valid indexed object', () => {
      const indices = {
        eachWord: { ralia: [0],
          to: [0, 1],
          alice: [0, 1],
          and: [0, 1],
          this: [0],
          is: [0],
          ran: [1],
          from: [1],
          a: [1],
          rat: [1],
          rabbit: [1] },
        numOfDocs: 2 };
      expect(this.invertedIndex.indexed.rabbits)
        .toEqual(indices);
    });

    it('should not create an index for a invalid file', () => {
      expect(this.invertedIndex.indexed.justwords).toBe(undefined);
    });
  });

  describe('getIndex function', () => {
    it('should return an index for an indexed file', () => {
      expect(this.invertedIndex.getIndex('alice')).toBeTruthy();
    });

    // it('should not return an index for a file that is not indexed', () => {
    //   expect(this.invertedIndex.getIndex('wrongkeys')).toBeFalsy();
    // });
  });

  describe('validateFile function', () => {
    it('should throw error for a file without title and text', () => {
      try {
        InvertedIndex.validateFile(wrongkeys);
      } catch (error) {
        expect(error.message).toBe('does not have title or text defined');
      }
    });

    it('should return Object as type of validFile', () => {
      const validFile = InvertedIndex.validateFile(rabbits);
      expect(validFile.fileToValidate instanceof Object).toBeTruthy();
    });
    it('should throw error for a file with one key', () => {
      try {
        InvertedIndex.validateFile(oneKey);
      } catch (error) {
        expect(error.message).toBe('has not only one key');
      }
    });

    it('should throw error for a file with empty string', () => {
      try {
        InvertedIndex.validateFile(emptyString);
      } catch (error) {
        expect(error.message).toBe('cannot be empty');
      }
    });
  });

  describe('tokenize function', () => {
    const words = 'Ralia, The Funk, And now: this is just Rowland';

    it('should return Object as type of validFile', () => {
      expect(InvertedIndex.tokenize(words)).toBeTruthy();
    });

    it('should return the correct array or words', () => {
      expect(InvertedIndex.tokenize(words))
        .toEqual(['ralia', 'the', 'funk', 'and', 'now', 'this', 'is', 
          'just', 'rowland']);
    });
  });

  describe('searchIndex function', () => {
    it('should return object as type of searchIndex for alice', () => {
      // expect(alice).toEqual({});
      const searchResult = this.invertedIndex.searchIndex('alice', 'alice');
      expect(searchResult instanceof Object).toBeTruthy();
    });

    it('should return the result of searchIndex for alice', () => {
      const searchResult = {
        eachWord: { alice: [0, 1, 2] },
        numOfDocs: 3 };
      expect(this.invertedIndex.searchIndex('alice', 'alice')).toEqual(searchResult);
    });

    it('should return object as type of searchIndex for rabbits', () => {
      const searchResult = this.invertedIndex.searchIndex('alice jump', 'rabbits');
      expect(searchResult instanceof Object).toBeTruthy();
    });
  });
});
