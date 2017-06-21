var app = angular.module('previewApp', ['hc.marked', 'ngSanitize']);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

app.config(['markedProvider', function (markedProvider) {
    markedProvider.setOptions({
        gfm: true
    });
}]);

app.controller('previewCtrl', function ($scope, $http, $window) {
    // Vars ================================================================
    $scope.notebook = {};
    var url = $window.location.origin;

    // Methods =============================================================
    $scope.init = function () {
        $http.get('/notebook/current-submission').then(function (res) {
            console.log("Got init response: ", res.data);
            $scope.notebook = res.data.notebook;
            $scope.author = res.data.author;
        });
    };

    $scope.onCancel = function () {
        console.log("Cancelling...");
        $http.get('/submit/cancel');
        $window.location.href = url + '/';
    };

    $scope.onSubmit = function () {
        console.log("Submitting...");
        $http.get('/submit/confirm').then(function (res) {
            console.log("Got response: ", res.data);
            $window.location.href = url + '/notebook/' + res.data;
        });
    }

});