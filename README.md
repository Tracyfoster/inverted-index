[![Coverage Status](https://coveralls.io/repos/github/andela-tezebuike/inverted-index/badge.svg?branch=master)](https://coveralls.io/github/andela-tezebuike/inverted-index?branch=master)
[![Build Status](https://travis-ci.org/andela-tezebuike/inverted-index.svg?branch=master)](https://travis-ci.org/andela-tezebuike/inverted-index)
[![Code Climate](https://codeclimate.com/github/andela-tezebuike/inverted-index/badges/gpa.svg)](https://codeclimate.com/github/andela-tezebuike/inverted-index)

# **INVERTED-INDEX**
*An inverted index is an index data structure storing a mapping from content, such as words or numbers, to its locations in a database file, or in a document or a set of documents. The purpose of an inverted index is to allow fast full text searches, at a cost of increased processing when a document is added to the database.*

*Inverted index takes a JSON array of text objects and creates an index from the array. The index allows a user to search for text blocks in the array that contain a specified collection of words..*

# **Features**
* Create indices from uploaded file.
* Find the indexes for a particular file.
* Allows single/multiple JSON files upload
* Search created index.

# **Why the project is useful**
The purpose of an inverted index is to allow user perform fast and full text search

# **How can I get started with the project**
* Open your browser to visit the [homepage](https://indexx-app.herokuapp.com/index.html)
* Upload file to be indexed using the upload button
* Select file to be indexed using the dropdown box
* Click create index button to output the index of the particular file
* Full text search can be made at the top left corner of the page.

# **To run locally**
* Clone the git repository
* Run `npm install`
* Run `npm start`.

# **External dependencies for the app**
* Node.js
* AngularJS 1.5+
* EcmaScript 6 (JavaScript 2015)

# **How to run tests**
1. Install npm dependencies ```npm install```
2. To test the app run: ```gulp```
3. To run the tests run: ```npm test```

# **Limitations of the project**
* This application can only work for one file at a time.
* Files must be in json format with ```title``` and ```text``` as keys.
- For example:\```javascript
[
  {
    "title": "How to Read a book",
    "text": "Men are rational animals. Their rationality agreement is the source of their power to agree. "
  },

  {
    "title": "The Naked Ape.",
    "text": "Indeed, we have the most subtle and complex facial expression system of all living animals."
  }
]
```

# **Contributing to the project**
* Fork this repository to your account.
* Clone your repositry: ```git clone git@github.com:your-username/inverted-index.git```
* Create your feature branch: ```git checkout -b new-feature```
* Commit your changes: ```git commit -m "did something"```
* Push to the remote branch: ```git push origin new-feature```
* Open a pull request.

# **Troubleshooting & FAQ**
* [https://github.com/andela-tezebuike/inverted-index/issues](https://github.com/andela-tezebuike/inverted-index/issues)

# **License**
* MIT