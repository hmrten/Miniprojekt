(function () {
    var app = angular.module('asterix', ['ngSanitize']);

    app.controller('IndexController', function ($scope, $http) {

        var rawTexts = [];

        function isPunct(c) {
            return "!?,.".indexOf(c) != -1;
        };

        function generateProblem() {
            var r = Math.floor(Math.random() * rawTexts.length);
            var s = rawTexts[r];

            var str = '';
            var dispText = '';
            var puncts = [];

            for (var i = 0; i < s.length; ++i) {
                if (isPunct(s[i])) {
                    str += s[i] + ' is punctuation @ index: ' + i + '<br />';
                    //dispText += '*';
                    dispText += '<span class="star">*</span>';
                    puncts.push(i);
                } else {
                    dispText += s[i];
                }
            }
            $scope.str = str;

            $scope.rawText = s;
            $scope.dispText = dispText;
            $scope.puncts = puncts;
        };

        function getData() {
            $http.get(MiniProj.rootPath + 'GameAsterix/Data').then(
                function (resp) {
                    rawTexts = resp.data;
                    generateProblem();
                },
                function (resp) {
                    $scope.msg = 'failed to get data';
                });
        };

        getData();

        $scope.play = function () {
            var s1 = $scope.inputText;
            var s2 = $scope.rawText;

            if (s1 == s2) {
                $scope.msg = 'CORRECT !';
            } else {
                $scope.msg = 'WRONG';
            }
        };
    });

}());