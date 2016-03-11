(function ()
{
    var app = angular.module("Myapp", []);

    var MyController = function ($scope,$timeout) {

        $scope.count = 0;
        var colorArray = ["#00ff33", "#ff0000", "#0026ff","#ffd800"];
        
    }

    app.controller ("MyController", ["$scope",MyController]);

}());


