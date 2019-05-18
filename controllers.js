app.controller("myCtrl", function($scope) {
    $scope.myCol = "lightblue";
    $scope.customFunc = function() {
      return "Voice la couleur choisie : " + $scope.myCol;
    };
  });