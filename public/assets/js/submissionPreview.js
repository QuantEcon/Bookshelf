var app = angular.module('previewApp', ['hc.marked']);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

app.config(['markedProvider', function (markedProvider) {
    markedProvider.setOptions({
        gfm: true
    });
}]);

app.controller('previewCtrl', function ($scope, $http) {

    $scope.onCancel = function () {
        $http.get('/submit/cancel');
    };

    $scope.onSubmit = function () {
        $http.get('/submit/confirm');
    }

});