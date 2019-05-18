app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "start.html"
    })
    .when("/memorygame", {
        templateUrl : "memoryGame.html",
        controller : "memoryGameCtrl"
    });
});
