/**
 * Created by tlyon on 6/2/17.
 */


//todo: change this once not running on local host
var url = 'http://localhost:8080';
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

app.controller('submitCtrl', ['$scope', 'Upload', function ($scope, Upload, $http, $window) {
    // variables ============================================
    $scope.submissionFormModel = {};
    $scope.submissionFormModel.topics = [];
    $scope.preview = false;

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
    $scope.chooseDifferentFile = function () {
        $scope.submissionFormModel.file = null;
    };

    $scope.toggleTopicSelection = function (topic) {
        var i = $scope.submissionFormModel.topics.indexOf(topic);

        if (i > -1) {
            $scope.submissionFormModel.topics.splice(i, 1);
        } else {
            $scope.submissionFormModel.topics.push(topic);
        }
    };

    $scope.upload = function () {
        Upload.upload({
            url: url + '/submit/file',
            data: {
                title: $scope.submissionFormModel.title,
                summary: $scope.submissionFormModel.summary,
                language: $scope.submissionFormModel.language,
                //todo: add co-authors
                coAuthors: [],
                //todo: add topic list
                topicList: $scope.submissionFormModel.topics,

                //set default values
                comments: [],
                views: 0,
                votes: 0
            },
            file: $scope.submissionFormModel.file
        }).then(
            //success
            function (res) {
                console.log('Success ' + res.config.data.file.name + ' uploaded. \nResponse: ' + res.data);
                window.location = url + '/submit/preview';
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