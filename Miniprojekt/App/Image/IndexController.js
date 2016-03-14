(function () {
    var app = angular.module('image', []);

    app.controller('IndexController', function ($scope, $http) {


        var imageWordList = [
            { imageUrl: "/Content/Images/Games/bild1.jpg", imageWord: "KATT" },
            { imageUrl: "/Content/Images/Games/bild2.jpg", imageWord: "FOTBOLL" },
            { imageUrl: "/Content/Images/Games/bild3.jpg", imageWord: "CYKEL" },
            { imageUrl: "/Content/Images/Games/bild4.jpg", imageWord: "FISK" },
            { imageUrl: "/Content/Images/Games/bild5.jpg", imageWord: "HUS" },
            { imageUrl: "/Content/Images/Games/bild6.jpg", imageWord: "ANKA" },
            { imageUrl: "/Content/Images/Games/bild7.jpg", imageWord: "FÅR" },
            { imageUrl: "/Content/Images/Games/bild8.png", imageWord: "NYCKELPIGA" },
            { imageUrl: "/Content/Images/Games/bild9.jpg", imageWord: "GLASÖGON" },
            { imageUrl: "/Content/Images/Games/bild10.jpg", imageWord: "STOL" }];

        $scope.setCurrentImageWord = function (questionNumber) {
            if (questionNumber > imageWordList.length) {
                $scope.isPlaying = false;
            } else {
                $scope.currentImageWord = imageWordList[questionNumber - 1];
            }
            
        }

        $scope.validateText = function (word) {
            if ($scope.gotPoints)
                return;

            var point;
            var current_word = $scope.currentImageWord.imageWord
            if ($scope.inputText.toUpperCase() == current_word) {
                $scope.correct = false;
                $scope.fail = true;
                point = 1;
            }
            else {
                $scope.fail = false;
                $scope.correct = true;
                point = 0;
            }
            $scope.result += point;
            $scope.gotPoints = true;
        }

        $scope.nextImage = function () {
            $scope.questionNumber += 1;
            $scope.setCurrentImageWord($scope.questionNumber);
            $scope.inputText = "";
            $scope.gotPoints = false;
            $scope.correct = true;
            $scope.fail = true;

        }

        $scope.initApp = function () {
            $scope.correct = true;
            $scope.fail = true;
            $scope.result = 0;
            $scope.questionNumber = 1;
            $scope.setCurrentImageWord($scope.questionNumber);
            $scope.gotPoints = false;
            $scope.isPlaying = true;
        }

        $scope.totalNumberOfQuestions = function () {
            var count = 0;
            angular.forEach(imageWordList, function () {
                count += 1;
            });
            return count;
        }

        $scope.initApp()

        $scope.registerScore = function () {
            var data = { nickname: $scope.nickname, score: $scope.result, game_id: 1 };
            $http.post(MiniProj.rootPath + 'Score/Register', data).then(function (resp) {
                //$scope.alertType = 'success';
                //$scope.alertMsg = 'Successfully registered: ' + data;
                window.location = MiniProj.rootPath + 'Score/';
            },
            function (resp) {
                $scope.alertType = 'danger';
                $scope.alertMsg = 'could not register score';
            });
        };
    });

}());