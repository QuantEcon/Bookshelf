var app = angular.module('myApp', ['hc.marked']);

app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

app.config(['markedProvider', function (markedProvider) {
    markedProvider.setOptions({
        gfm: true
    });
}]);

app.controller('editProfileCtrl', function ($scope, $http, $window) {
    var url = $window.location.origin;
    $scope.formModel = {};
    $scope.activeAvatar = "";
    //set default values
    $scope.formModel.name = "";
    $scope.formModel.email = "";
    $scope.formModel.summary = "";
    $scope.oneSocial = true;
    $scope.previewSummary = false;

    $scope.saveSuccess = false;
    $scope.saveFailure = false;

    $scope.init = function () {
        $http.get(url + '/search/users', {
            params: {
                _id: 'my-profile'
            }
        }).then(
            function success(res) {
                console.log("Returned: ", res.data);
                $scope.formModel.name = res.data[0].name;
                $scope.formModel.email = res.data[0].email;
                $scope.formModel.website = res.data[0].website;
                $scope.formModel.summary = res.data[0].summary;
                $scope.oneSocial = res.data[0].oneSocial;
            },
            function failure(res) {
                $window.location = url + '/500';
            }
        );
    };

    $scope.togglePreviewSummary = function () {
        $scope.previewSummary = !$scope.previewSummary;
        console.log("Toggle preview summary: ", $scope.previewSummary);
    };

    $scope.onProfileSubmit = function (valid) {
        if (valid) {
            if ($scope.editProfileForm.$pristine) {
                $window.location.href = url + '/user/my-profile';
            }
            console.log("CLicked on submit");
            console.log($scope.formModel);
            $http.post(url + '/edit-profile', $scope.formModel).then(
                function success(res) {
                    console.log("Saved profile: ", res);

                    $scope.formModel.name = res.data.user.name;
                    $scope.formModel.email = res.data.user.email;
                    $scope.formModel.website = res.data.user.website;
                    $scope.formModel.summary = res.data.user.summary;
                    $scope.oneSocial = res.data.user.oneSocial;

                    $scope.saveSuccess = true;
                    $scope.saveFailure = false;
                    $scope.editProfileForm.$setPristine()
                },
                function failure(data) {
                    console.log("Error saving profile");
                    $scope.saveSuccess = false;
                    $scope.saveFailure = true; 
                    $scope.editProfileForm.$setPristine();
                }
            );
        } else {
            console.log("Form is invalid!");
        }

    };
    $scope.onCancel = function () {
        console.log("Cancel clicked!");
        $window.location.href = url + '/user/my-profile'
    };

    $scope.removeGithub = function () {
        $http.get(url + '/edit-profile/remove/github');
        console.log("reloading...");
        $window.location.reload()
    };

    $scope.toggleGithub = function () {
        $http.get(url + '/edit-profile/toggle/github');
        console.log("reloading...");
        $window.location.reload()
    };

    $scope.removeFB = function () {
        $http.get(url + '/edit-profile/remove/fb');
        console.log("reloading...");
        $window.location.reload()
    };

    $scope.toggleFB = function () {
        $http.get(url + '/edit-profile/toggle/fb');
        console.log("reloading...");
        $window.location.reload()
    };

    $scope.removeTwitter = function () {
        $http.get(url + '/edit-profile/toggle/fb');
        console.log("reloading...");
        $window.location.reload()
    };
    $scope.toggleTwitter = function () {
        $http.get(url + '/edit-profile/toggle/twitter');
        console.log("reloading...");
        $window.location.reload()
    };

    $scope.removeGoogle = function () {
        $http.get(url + '/edit-profile/toggle/google');
        console.log("reloading...");
        $window.location.reload()
    };
    $scope.toggleGoogle = function () {
        $http.get(url + '/edit-profile/toggle/google');
        console.log("reloading...");
        $window.location.reload()
    };

    $scope.useFBPhoto = function () {
        $http.get(url + '/edit-profile/use-photo/fb');
        $window.location.reload();
    };
    $scope.useTwitterPhoto = function () {
        $http.get(url + '/edit-profile/use-photo/twitter');
        $window.location.reload();
    };
    $scope.useGithubPhoto = function () {
        $http.get(url + '/edit-profile/use-photo/github');
        $window.location.reload();
    };
    $scope.useGooglePhoto = function () {
        $http.get(url + '/edit-profile/use-photo/google');
        $window.location.reload();
    };


});