(function ()
{
    var app = angular.module("Myapp", []);

    var MyController = function ($scope) {

        $scope.count = 0;


    }

    app.controller ("MyController", ["$scope",MyController]);

}());


