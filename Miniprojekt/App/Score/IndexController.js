(function () {
    var app = angular.module('score', []);

    app.controller('IndexController', function ($scope, $http) {
        function getGames() {
            $http.get(MiniProj.rootPath + 'Score/Games').then(function (resp) {
                $scope.games = resp.data;
            });
        };
        function getResults() {
            $http.get(MiniProj.rootPath + 'Score/Results').then(function (resp) {
                $scope.results = resp.data;
            },
            function (resp) {
                $scope.alertMsg = 'could not get data';
            });
        };

        function init() {
            getGames();
            getResults();
            $scope.selectedGame = -1;
        };

        $scope.filterResults = function (r) {
            var sel = $scope.selectedGame;

            return sel == -1 || sel == r.game_id;
        };

        init();
    });
}());