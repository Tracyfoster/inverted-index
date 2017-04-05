/**
 * InvertedIndex class
 * @class
 */
class InvertedIndex {
  /**
   * class constructor
   * @constructor
   */
  constructor() {
    this.indexed = {};
  }

  /**
   * Get the index for a particular file
   * @function
   * @param {String} fileName
   * @return {Object} index object
   */
  getIndex(fileName) {
    return this.indexed[fileName];
  }

  /**
   * Read files using FileReader
   * @function
   * @param {String} file
   * @return {Promise} validateFile response
   */
  static readFile(file) {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = () => {
          const fileToValidate = JSON.parse(reader.result);
          const response = InvertedIndex.validateFile(fileToValidate);
          resolve(response);
        };
        reader.readAsText(file);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Validate File
   * @function
   * @param {string} fileToValidate content of the file uploaded
   * @return {Object} result.success should return true or false
   */
  static validateFile(fileToValidate) {
    let result = {};
    const errorMsg = {
      success: false,
      message: 'has an invalid JSON format.'
    };
    try {
      result = {
        success: true,
        message: 'File is valid',
        fileToValidate
      };
      fileToValidate.forEach((book) => {
        if (typeof book !== 'object' || Object.keys(book).length !== 2) {
          errorMsg.message = 'does not have the right format';
          throw errorMsg;
        }
        if (book.title === undefined || book.text === undefined) {
          errorMsg.message = 'does not have title or text defined';
          throw errorMsg;
        }
        if (typeof book.title !== 'string' || typeof book.text !== 'string') {
          errorMsg.message = 'Title and text values should be String';
          throw errorMsg;
        }
        if (book.title === '' || book.text === '') {
          errorMsg.message = 'cannot be empty';
          throw errorMsg;
        }
      });
    } catch (error) {
      if (error.success === false) return errorMsg;
    }
    return result;
  }
  /**
   * Get individual words from a string of text.
   * @function
   * @param {String} words text to be tokenized.
   * @return {Array} array of string tokens
   */
  static tokenize(words) {
    const pattern = /[ .:;?!~,`'&|()<>{}[\]\r\n/\\]+/;
    return words.toLowerCase().split(pattern);
  }

  /**
   * Create index
   * @function
   * @param {string} fileName
   * @param {Array} books
   * @return {Object} index object
   */
  createIndex(fileName, books) {
    const indices = {};
    books.forEach((book, index) => {
      let words = '';
      words = (`${book.title} ${book.text}`);
      words = InvertedIndex.tokenize(words);
      words.forEach((word) => {
        if (indices[word]) {
          if (indices[word].indexOf(index) === -1) {
            indices[word].push(index);
          }
        } else {
          indices[word] = [index];
        }
      });
    });
    this.indexed[fileName] = {
      eachWord: indices,
      numOfDocs: books.length
    };
  }

  /**
   * Search Index.
   * @function
   * @param {String} phrase search string
   * @returns {Object} search result object.
   */
  searchIndex(phrase) {
    const result = {};
    const files = this.indexed;
    Object.keys(files).forEach((filename) => {
      const storedIndex = this.getIndex(filename);
      const searchWords = InvertedIndex.tokenize(phrase);
      const search = {
        eachWord: {},
        numOfDocs: storedIndex.numOfDocs
      };
      searchWords.forEach((word) => {
        if (storedIndex.eachWord[word]) {
          search.eachWord[word] = storedIndex.eachWord[word];
        } else search.eachWord[word] = [];
      });
      result[filename] = search;
    });
    return result;
  }
}
