/**
 * Created by tlyon on 6/2/17.
 */


var app = angular.module('submissionApp', ['ngFileUpload', 'hc.marked']);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

app.config(['markedProvider', function (markedProvider) {
    markedProvider.setOptions({
        gfm: true
    });
}]);

app.controller('submitCtrl', ['$scope', '$http', '$window', 'Upload', function ($scope, $http, $window, Upload) {
    // variables ============================================
    console.log("window.location: ", $window.location);
    var url = $window.location.origin;
    $scope.submissionFormModel = {};
    $scope.submissionFormModel.topics = {};
    $scope.preview = false;
    $scope.edit = false;
    $scope.editID = '';

    $scope.topics = [
        'All',
        'General Economics and Teaching',
        'History of Economic Thought, Methodology, and Heterodox Approaches',
        'Mathematical and Quantitative Methods',
        'Microeconomics',
        'Macroeconomics and Monetary Economics',
        'International Economics',
        'Financial Economics',
        'Public Economics',
        'Health, Education, and Welfare',
        'Labor and Demographic Economics',
        'Law and Economics',
        'Industrial Organization',
        'Business Administration and Business Economics • Marketing • Accounting • Personnel Economics',
        'Economic History',
        'Economic Development, Innovation, Technological Change, and Growth',
        'Economic Systems',
        'Agricultural and Natural Resource Economics • Environmental and Ecological Economics',
        'Urban, Rural, Regional, Real Estate, and Transportation Economics',
        'Miscellaneous',
        'Other'
    ];

    // methods ==============================================
    $scope.init = function () {
        var pathname = window.location.pathname.split('/');
        $scope.edit = pathname[pathname.length - 1] === "edit";
        if ($scope.edit) {
            $scope.editID = pathname[2];
            $http.get(url + '/search/notebook/' + $scope.editID).then(
                function (response) {
                    console.log("Init returned: ", response);
                    $scope.submissionFormModel.title = response.data.notebook.title;
                    $scope.submissionFormModel.lang = response.data.notebook.lang;
                    for (var i = 0; i < response.data.notebook.topicList.length; i++) {
                        console.log("Toggle: ", response.data.notebook.topicList[i]);
                        $scope.toggleTopicSelection(response.data.notebook.topicList[i]);
                    }

                    // $scope.submissionFormModel.topics = response.data.notebook.topicList;
                    $scope.submissionFormModel.summary = response.data.notebook.summary;
                },
                function (response) {
                    $window.location.href = url + '/500';
                }
            )
        }
    };

    $scope.chooseDifferentFile = function () {
        $scope.submissionFormModel.file = null;
    };

    $scope.toggleTopicSelection = function (topic) {
        // var i = $scope.submissionFormModel.topics.indexOf(topic);
        //
        // if (i > -1) {
        //     $scope.submissionFormModel.topics.splice(i, 1);
        // } else {
        //     $scope.submissionFormModel.topics.push(topic);
        // }
        $scope.submissionFormModel.topics[topic] = !$scope.submissionFormModel.topics[topic];
    };

    $scope.upload = function () {
        var fullURL = '/submit/file';
        if ($scope.edit) {
            fullURL = '/submit/file/edit/' + $scope.editID;
        }
        var topics = [];
        for (var i = 0; i < $scope.topics.length; i++) {
            if ($scope.submissionFormModel.topics[$scope.topics[i]]) {
                topics.push($scope.topics[i]);
            }
        }

        Upload.upload({
            url: fullURL,
            data: {
                title: $scope.submissionFormModel.title,
                summary: $scope.submissionFormModel.summary,
                lang: $scope.submissionFormModel.lang,
                //todo: add co-authors
                coAuthors: [],
                topicList: topics,

                //set default values
                comments: [],
                views: 0,
                votes: 0
            },
            file: $scope.submissionFormModel.file
        }).then(
            //success
            function (res) {
                if ($scope.edit) {
                    console.log("Successfully edited: ", res);
                    window.location = url + '/notebook/' + $scope.editID;
                } else {
                    console.log('Success ' + res.config.data.file.name + ' uploaded. \nResponse: ' + res.data);
                    window.location = url + '/submit/preview';
                }
            },
            //failure
            function (res) {
                console.log('Error: ' + res.status);
            },
            //progress
            function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            }
        );
    };

    $scope.togglePreviewSummary = function () {
        $scope.preview = !$scope.preview;
        console.log("Toggle preview summary: ", $scope.preview);
    };

    $scope.onCancel = function () {
        $http.get('/submit/cancel');
    };

    $scope.onSubmissionSubmit = function (valid) {
        if (valid && $scope.submissionForm.file.$valid && $scope.submissionFormModel.file) {
            console.log("Valid Form!");
            console.log("FormModel: ", $scope.submissionFormModel);
            $scope.upload();
        } else {
            console.log("Form is invalid");
        }
    };


}])