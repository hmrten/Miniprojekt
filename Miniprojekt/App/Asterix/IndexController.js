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

            var dispText = '';
            var puncts = [];

            for (var i = 0; i < s.length; ++i) {
                if (isPunct(s[i])) {
                    //dispText += '*';
                    dispText += '<span class="star">*</span>';
                    puncts.push({ index: i, punct: s[i] });
                } else {
                    dispText += s[i];
                }
            }

            dispText = dispText.replace(/\n/g, '<br />');

            $scope.rawText = s;
            $scope.dispText = dispText;
            $scope.puncts = puncts;
            $scope.userScore = 0;
            $scope.totalScore = puncts.length;
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
            var actual = $scope.inputText;
            var expected = $scope.rawText;
            var puncts = $scope.puncts;
            var score = 0;

            for (var i = 0; i < puncts.length; ++i) {
                var pi = puncts[i].index;
                var pp = puncts[i].punct;

                if (actual[pi] == pp)
                    ++score;
            }

            if (score == 0) {
                $scope.panelType = 'danger';
            } else if (score == $scope.totalScore) {
                $scope.panelType = 'success';
            } else {
                $scope.panelType = 'warning';
            }

            $scope.userScore = score;

            if (actual == expected) {
                $scope.panelHeading = 'RÄTT';
                $scope.panelText = '';
            } else {
                $scope.panelHeading = 'FEL';
            }
            $scope.panelText = expected.replace(/\n/g, '<br />');
        };
    });

}());