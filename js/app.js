angular.module("InvertedIndexApp", [])
  .controller("IndexController", ["$scope", ($scope) => {

  const invertedIndex = new InvertedIndex();
  $scope.fileName = null;
  $scope.fileNames = [];
  $scope.indexedFiles = {};
  $scope.displayIndexes = false;
  $scope.displaySearchResult = false;
  $scope.errorHandler = "";
  $scope.phrase = "";

  $scope.createIndex = (file) => {
    $scope.fileName = file.name.split('.')[0];
    if (!file.name.toLowerCase().match(/\.json$/)) {
      $scope.errorHandler = `${file.name} is not a JSON file.`;
      return;
    } else {
      invertedIndex.readFile(file).then((response) => {
        if (response.success) {
          invertedIndex.createIndex($scope.fileName, response.fileToValidate);
          $scope.$apply(() => {
            $scope.fileNames.push(file.name);
          });
        } else {
          $scope.errorHandler = `${file.name} ${response.message}`;
          return;
        }
      });
    }
  };

  $scope.displayIndex = () => {
    const filename  = $scope.getFile.split('.')[0];
    $scope.indexedFiles = invertedIndex.getIndex(filename);
    $scope.displayIndexes = true;
    $scope.displaySearchResult = false;
  };

  $scope.displaySearch = () => {
    if ($scope.phrase.length < 1) {
      $scope.errorHandler = "Please enter a word to search";
    } else {
      if ($scope.searchOption === "All") {
        $scope.searchResults = invertedIndex.searchAllIndexes($scope.phrase);
        $scope.displaySearchResult = true;
        $scope.displayIndexes = false;
      } else {
        const filename  = $scope.searchOption.split('.')[0];
      //  $scope.indexedFiles = invertedIndex.getIndex(filename);
        $scope.searchResults = invertedIndex.searchIndex(filename, $scope.phrase);
        $scope.displaySearchResult = true;
        $scope.displayIndexes = false;
      };
    }
  }
}])
.filter('range', () => (input, range) => {
  for (let i = 0; i < parseInt(range, 10); i += 1) {
    input.push(i);
  }

  return input;
});

// Document ready.
document.addEventListener('DOMContentLoaded', () => {
  // Attach file upload listener
  document.getElementById('upload')
    .addEventListener('change', function createFile(file) {
      if (this.files[0]) {
        angular.element(this).scope().createIndex(this.files[0]);
      }
    });
});
