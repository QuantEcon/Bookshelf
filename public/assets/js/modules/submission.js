/**
 * Created by tlyon on 6/7/17.
 */

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

app.controller('submissionCtrl', function ($scope, $http, $window, $sce) {
    console.log("window.location: ", $window.location);
    var url = $window.location.origin;
    //submission information
    $scope.notebook = {};

    // users' information
    $scope.comments = [];
    $scope.showReplyMap = {};
    $scope.showEditMap = {};
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
                $scope.notebookHTML = response.data.notebookHTML;

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


                setTimeout(function () {

                }, 2000);
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
                if (response.data.code === 1) {
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
                if (response.data.code === 1) {
                    $window.location = url + '/login';
                }
            }
        )
    };

    $scope.submitEditComment = function (commentID, content) {
        var data = {
            content: content
        };
        console.log("Got submit edit content: ", content);
        $http.post(url + '/submit/comment/edit/' + commentID, data).then(
            function (response) {
                $window.location.reload();
            },
            function (response) {
                $window.location.href = url + '/500';
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

    $scope.toggleEdit = function (commentID) {
        $scope.showEditMap[commentID] = !$scope.showEditMap[commentID];
    };

    $scope.deleteComment = function (commentID) {
        console.log("Delete clicked!");
    };

    $scope.upvoteSubmissionClicked = function (submissionID) {
        console.log("Upvote submission clicked");
        var data = {
            submissionID: submissionID
        };
        $http.post(url + '/vote/upvote/submission', data).then(
            function (response) {
                console.log("Upvoted submission");
                $window.location.reload();
            },
            function (response) {
                console.log("Error upvoting submission: ", response);
                if (response.data.code === 1) {
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
        $http.post(url + '/vote/downvote/submission', data).then(
            function success(response) {
                console.log("Downvoted submission");
                $window.location.reload();
            },
            function failure(response) {
                console.log("Error downvoting submission");
                if (response.data.code === 1) {
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
        $http.post(url + '/vote/upvote/comment', data).then(
            function (response) {
                console.log("Upvoted comment");
                $window.location.reload();
            },
            function (response) {
                console.log("Error upvoting comment");
                if (response.data.code === 1) {
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
        $http.post(url + '/vote/downvote/comment', data).then(
            function (response) {
                console.log("Downvoted comment");
                $window.location.reload();
            },
            function (response) {
                console.log("Error downvoting comment");
                if (response.data.code === 1) {
                    $window.location = url + '/login';
                }
            }
        )
    };

});
