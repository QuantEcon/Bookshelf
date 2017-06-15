/**
 * Created by tlyon on 6/7/17.
 */
//todo: change this once not running on local host
// todo: migrate to centralized file
var url = 'http://localhost:8080';
var app = angular.module('submissionApp', ['hc.marked']);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

app.config(['markedProvider', function (markedProvider) {
    markedProvider.setOptions({
        gfm: true
    });
}]);

app.controller('submissionCtrl', function ($scope, $http, $window) {
    //submission information
    $scope.notebook = {};

    // user's information
    $scope.comments = [];
    $scope.replies = [];
    $scope.commentAuthors = [];

    $scope.showComments = false;
    $scope.showNotebook = true;
    $scope.currentUsersSubmission = false;
    $scope.submissionID = window.location.pathname.split('/')[2];
    $scope.dataReady = false;

    $scope.init = function () {
        //todo: get submission information
        $http.get(url + '/search/notebook/' + $scope.submissionID)
            .then(function success(response) {
                console.log("submissionCtrl: search returned: ", response);
                // set notebook information
                $scope.notebook = response.data.notebook;

                //set current user's submission
                $scope.currentUsersSubmission = response.data.currentUsersSubmission;

                //set comments/replies
                $scope.comments = response.data.comments;
                $scope.replies = response.data.replies;

                // set user's information
                $scope.currentUserID = response.data.currentUserID;
                $scope.commentAuthors = response.data.commentAuthors;
                $scope.author = response.data.author;
                $scope.coAuthors = response.data.coAuthors;


                $scope.dataReady = true;
            }, function error(response) {
                console.log("submissionCtrl: Error occurred during the search");
                window.location.href = url + '/500';
            })

    };

    $scope.submitCommentClicked = function (content) {
        console.log("Submit comment clicked: ", content);
        //todo: send to server
        var data = {
            submissionID: $scope.submissionID,
            content: content
        };
        $http.post(url + '/submit/comment', data).then(
            function success(response) {
                console.log("Successfully posted comment: ", response);
                $window.location.reload();
            },
            function failure(response) {
                console.log("Error posting comment: ", response);
            })
    };

    $scope.toggleView = function () {
        $scope.showComments = !$scope.showComments;
        $scope.showNotebook = !$scope.showNotebook;
    };

    $scope.downloadNotebook = function () {
        console.log("Download clicked");
    };


});

app.controller('voteCtrl', function ($scope) {
    $scope.downvoteClicked = function (submissionID) {
        console.log("Downvote clicked: ", submissionID);
    };

    $scope.upvoteClicked = function () {
        console.log("Upvote clicked");
    }
});