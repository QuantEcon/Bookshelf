/**
 * Created by tlyon on 6/7/17.
 */
//todo: change this once not running on local host
// todo: migrate to centralized file
var url = 'http://localhost:8080';
var app = angular.module('submissionApp', ['hc.marked', 'angularMoment', 'ngSanitize']);

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

    // users' information
    $scope.comments = [];
    $scope.showReplyMap = {};
    $scope.replies = [];
    $scope.commentAuthors = [];

    $scope.showComments = false;
    $scope.showNotebook = true;
    $scope.currentUsersSubmission = false;
    $scope.submissionID = window.location.pathname.split('/')[2];
    $scope.dataReady = false;

    $scope.init = function () {
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
                $scope.currentUser = response.data.currentUser;
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
                if(response.data.code === 1){
                    $window.location = url + '/login';
                }
            })
    };

    $scope.submitReplyTo = function (commentID, content) {
        console.log("Submit reply to %s: %s", commentID, content);
        var data = {
            inReplyTo: commentID,
            content: content
        };
        $http.post(url + '/submit/reply', data).then(
            function success(response) {
                console.log("Successfully posted reply");
                $window.location.reload();
            },
            function failure(response) {
                console.log("Error posting reply: ", response);
                if(response.data.code === 1){
                    $window.location = url + '/login';
                }
            }
        )
    };

    $scope.toggleView = function () {
        $scope.showComments = !$scope.showComments;
        $scope.showNotebook = !$scope.showNotebook;
    };

    $scope.downloadNotebook = function () {
        console.log("Download clicked");
    };

    $scope.toggleReply = function (commentID) {
        $scope.showReplyMap[commentID] = !$scope.showReplyMap[commentID];
    };

    $scope.upvoteSubmissionClicked = function (submissionID) {
        console.log("Upvote submission clicked");
        var data = {
            submissionID: submissionID
        };
        $http.post(url + '/upvote/submission', data).then(
            function (response) {
                console.log("Upvoted submission");
                $window.location.reload();
            },
            function (response) {
                console.log("Error upvoting submission: ", response);
                if(response.data.code === 1){
                    $window.location = url + '/login';
                }
            }
        );

    };
    $scope.downvoteSubmissionClicked = function (submissionID) {
        console.log("Downvote submission clicked");
        var data = {
            submissionID: submissionID
        };
        $http.post(url + '/downvote/submission', data).then(
            function success(response) {
                console.log("Downvoted submission");
                $window.location.reload();
            },
            function failure(response) {
                console.log("Error downvoting submission");
                if(response.data.code === 1){
                    $window.location = url + '/login';
                }
            }
        );
    };

    $scope.upvoteCommentClicked = function (commentID) {
        console.log("Upvote comment clicked");
        var data = {
            commentID: commentID
        };
        $http.post(url + '/upvote/comment', data).then(
            function (response) {
                console.log("Upvoted comment");
                $window.location.reload();
            },
            function (response) {
                console.log("Error upvoting comment");
                if(response.data.code === 1){
                    $window.location = url + '/login';
                }
            }
        )
    };
    $scope.downvoteCommentClicked = function (commentID) {
        console.log("Downvote comment clicked");
        var data = {
            commentID: commentID
        };
        $http.post(url + '/downvote/comment', data).then(
            function (response) {
                console.log("Downvoted comment");
                $window.location.reload();
            },
            function (response) {
                console.log("Error downvoting comment");
                if(response.data.code === 1){
                    $window.location = url + '/login';
                }
            }
        )
    };

});
