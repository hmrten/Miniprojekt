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

        function init() {
            getData();
            $scope.showReg = false;
            $scope.game_id = 2;
        };

        init();

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
            $scope.panelText = '<strong>Du skrev:</strong><br />' + actual.replace(/\n/g, '<br />') +
                '<hr /><strong>Rätt svar var:</strong><br />' + expected.replace(/\n/g, '<br />');
            $scope.panelHeading = actual == expected ? 'RÄTT' : 'FEL';
            $scope.showReg = true;
        };

        $scope.registerScore = function () {
            var data = { nickname: $scope.nickname, score: $scope.userScore, game_id: $scope.game_id };
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