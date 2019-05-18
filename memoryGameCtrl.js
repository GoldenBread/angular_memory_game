app.controller("memoryGameCtrl", function($scope) {
    $scope.title = "The memory game";
    $scope.customFuncy = function() {
      return "Voice le title : " + $scope.title;
    };
  });