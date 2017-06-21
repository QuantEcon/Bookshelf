/**
 * Created by tlyon on 6/1/17.
 */
// Controllers =========================================================
var app = angular.module('mainApp', [
        'hc.marked',
        'angularUtils.directives.dirPagination',
        'angularMoment'
    ]
);

// Config ==============================================================
app.config(function ($interpolateProvider) {
    $interpolateProvider.startSymbol('{[{');
    $interpolateProvider.endSymbol('}]}');
});

app.config(['markedProvider', function (markedProvider) {
    markedProvider.setOptions({
        gfm: true
    });
}]);

app.controller('mainCtrl', function ($scope, $timeout, $window) {
    var url = $window.location.origin;
    console.log("window.location: ", $window.location);
    // Vars ==========================================
    $scope.submissions = [];
    $scope.authors = [];
    $scope.dataReady = false;

    // Methods =======================================
    $scope.initSubmissions = function (userID) {
        console.log("mainCtrl: init submissions");
        $timeout(function () {
            $scope.$broadcast('initSearch', {init: true, userID: userID});
        })
    };


    // Events ========================================
    $scope.$on('searchResults', function (event, results) {
        //todo parse and sort results
        console.log("mainCtrl: Got search submissions results: ", results);
        $scope.submissions = results.data.submissions;
        $scope.authors = results.data.authors;
        // $timeout(function () {
        //     $scope.dataReady = true;
        // }, 2000);
        $scope.dataReady = true;
    });
});

app.controller('searchCtrl', function ($scope, $http, $window) {
    var url = $window.location.origin;
    // Vars ===========================================
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

    $scope.searchParams = {};
    $scope.searchParams.page = 1;
    $scope.searchParams.sortBy = "Trending";
    $scope.searchParams.time = "Today";
    $scope.searchParams.topic = $scope.topics[0];
    $scope.searchParams.language = "All";
    $scope.searchParams.keywords = "";
    $scope.numSubs = 0;

    $scope.hasCurrentSearch = false;

    $scope.showSearchBar = false;

    // Methods ========================================

    $scope.searchSubmissions = function (params, args) {
        if (!args.init) {
            console.log("searchCtrl: Set current search!");
            $scope.hasCurrentSearch = true;
        }
        if (args.userID) {
            console.log("searchCtrl: Performing submissions search for user");
            $scope.searchParams.author = args.userID;
        }

        console.log("searchCtrl: search submissions:", $scope.searchParams, args);

        params.page = 1;
        $scope.searchParams.page = 1;

        $http.get(url + '/search/all-submissions', {
            params: {
                language: params.language,
                topic: params.topic,
                author: params.author,
                time: params.time,
                sortBy: params.sortBy
            }
        }).then(function success(response) {
                console.log("searchCtrl: Search returned: ", response);
                var results = {
                    params: params,
                    data: response.data
                };
                $scope.numSubs = response.data.totalSubmissions;
                $scope.$emit('searchResults', results);
            }, function error(response) {
                console.log("searchCtrl: An error occurred during the search");
                var results = {
                    err: response
                };
                $scope.$emit('searchResults', results);
            }
        )
    };

    $scope.searchUsers = function (params) {

        console.log("searchCtrl: search users: ", params);
        $http.get(url + '/search/users', {
            params: {
                _id: params.userID,
            }
        }).then(function success(response) {
                console.log("searchCtrl: Search users returned: ", response);
                var results = {
                    params: params,
                    data: response.data,
                };
                $scope.$emit('searchUsersResult', results);
            },
            function failure(response) {
                console.log("searchCtrl: An error occurred during the search");
                var results = {
                    err: response
                };
                $scope.$emit('searchUsersResults', results);
            }
        );
    };

    $scope.toggleSearchBar = function () {
        console.log("Toggle search: ", $scope.hasCurrentSearch);
        $scope.showSearchBar = !$scope.showSearchBar;
    };


    $scope.clearSearch = function (args) {
        console.log("Clear search");
        $scope.hasCurrentSearch = false;
        $scope.searchParams = {};
        $scope.searchParams.page = 1;
        $scope.searchParams.sortBy = "Trending";
        $scope.searchParams.time = "Today";
        $scope.searchParams.topic = $scope.topics[0];
        $scope.searchParams.language = "All";
        $scope.searchParams.keywords = "";
        $scope.numSubs = 0;

        $scope.searchSubmissions($scope.searchParams, args);
    };

    // Events =========================================
    $scope.$on('initSearch', function (event, args) {
        console.log("searchCtrl: Got init search: ", args);
        $scope.searchSubmissions($scope.searchParams, args);
    });

    $scope.$on('initUserSearch', function (event, args) {
        console.log("searchCtrl: Got init user search:", args);
        $scope.searchUsers(args);
    });
});

app.controller('userPageCtrl', function ($scope, $timeout) {
    // Vars ===========================================
    $scope.dataReady = false;
    // extract user id from url
    $scope.userID = window.location.pathname.split('/')[2];
    $scope.userSummary = '';
    $scope.userJoined = '';

    // Methods ========================================
    $scope.initUserData = function () {
        var args = {
            userID: $scope.userID,
        };
        console.log("userPageCtrl: Init user search: ", args);

        $timeout(function () {
            $scope.$broadcast('initUserSearch', args);
        });

    };

    // Events =========================================
    $scope.$on('searchUsersResult', function (event, results) {
        console.log("userPageCtrl: Got user search result: ", results.data);
        $scope.userSummary = results.data[0].summary;
        $scope.userJoined = results.data[0].joinDate;
        $scope.dataReady = true;
    });

});