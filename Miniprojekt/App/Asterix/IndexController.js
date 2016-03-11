(function () {
    var app = angular.module('asterix', ['ngSanitize']);

    app.controller('IndexController', function ($scope, $http) {
        var problemData = [];
        var problemDataIndex = 0;

        function isPunct(c) {
            return "!?,.".indexOf(c) != -1;
        };

        function nextProblem() {
            if (problemDataIndex == problemData.length)
                return null;

            var str = problemData[problemDataIndex++];
            var prob = {};
            var dispText = '';
            var puncts = [];

            for (var i = 0; i < str.length; ++i) {
                if (isPunct(str[i])) {
                    dispText += '<span class="star">*</span>';
                    puncts.push({ index: i, punct: str[i] });
                } else {
                    dispText += str[i];
                }
            }

            dispText = dispText.replace(/\n/g, '<br />');

            prob.rawText = str;
            prob.dispText = dispText;
            prob.puncts = puncts;

            $scope.userScore = 0;
            $scope.expectedScore = puncts.length;

            return prob;
        };

        function getData() {
            $http.get(MiniProj.rootPath + 'GameAsterix/Data').then(
                function (resp) {
                    problemData = resp.data;
                    $scope.curProblem = nextProblem();
                },
                function (resp) {
                    $scope.msg = 'failed to get data';
                });
        };

        function init() {
            $scope.totalScore = 0;
            $scope.showReg = false;
            $scope.showPlay = true;
            $scope.game_id = 2;

            getData();
        };

        init();

        $scope.nextProblem = function () {
            var p = nextProblem();
            if (p == null) {
                $scope.showReg = true;
                $scope.showPlay = false;
                $scope.panelHeading = null;
                $scope.alertType = 'info';
                $scope.alertMsg = 'Total poäng: ' + $scope.totalScore;
            } else {
                $scope.showPlay = true;
                $scope.panelHeading = null;
                $scope.curProblem = p;
                $scope.inputText = '';
            }
        };

        $scope.play = function () {
            var actual = $scope.inputText;
            var prob = $scope.curProblem;
            var expected = prob.rawText;
            var puncts = prob.puncts;
            var score = 0;

            for (var i = 0; i < puncts.length; ++i) {
                var pi = puncts[i].index;
                var pp = puncts[i].punct;

                if (actual[pi] == pp)
                    ++score;
            }

            if (score == 0) {
                $scope.panelType = 'danger';
            } else if (score == puncts.length) {
                $scope.panelType = 'success';
            } else {
                $scope.panelType = 'warning';
            }

            $scope.expectedScore = puncts.length;
            $scope.userScore = score;
            $scope.panelText = '<strong>Du skrev:</strong><br />' + actual.replace(/\n/g, '<br />') +
                '<hr /><strong>Rätt svar var:</strong><br />' + expected.replace(/\n/g, '<br />');
            $scope.panelHeading = actual == expected ? 'RÄTT' : 'FEL';

            $scope.totalScore += score;
            $scope.showPlay = false;
        };

        $scope.registerScore = function () {
            var data = { nickname: $scope.nickname, score: $scope.totalScore, game_id: $scope.game_id };
            $http.post(MiniProj.rootPath + 'Score/Register', data).then(function (resp) {
                $scope.alertType = 'success';
                $scope.alertMsg = 'Successfully registered: ' + data;
            },
            function (resp) {
                $scope.alertType = 'danger';
                $scope.alertMsg = 'could not register score';
            });
        };
    });

}());