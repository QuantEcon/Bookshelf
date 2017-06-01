/**
 * Created by tlyon on 6/1/17.
 */
// Controllers =========================================================
var url = 'http://localhost:8080';
var app = angular.module('mainApp', ['hc.marked', 'angularUtils.directives.dirPagination']);

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

app.controller('mainCtrl', function ($scope) {
    // Vars ==========================================
    $scope.submissions = [];
    $scope.authors = [];

    // Methods =======================================
    $scope.init = function () {
        console.log("Init: Hello world!");
        $scope.$emit('initSearch', "start");
    };

    // Events ========================================
    $scope.$on('searchResults', function (event, results) {
        //todo parse and sort results
        console.log("Got search results: ", results);
        $scope.submissions = results.data.submissions;
        $scope.authors = results.data.authors;
    });
});

app.controller('searchCtrl', function ($scope, $http) {
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
    $scope.search = function (params, init, userID) {
        if (!init) {
            console.log("Set current search!");
            $scope.hasCurrentSearch = true;
        }
        if (userID) {
            console.log("Performing search for user");
            $scope.searchParams.author = userID;
        }
        console.log("Performing search: ", params, init);
        params.page = 1;
        $scope.searchParams.page = 1;
        var searchURL = url + '/search';

        $http.get(url + '/search', {
            params: {
                language: params.language,
                topic: params.topic,
                author: params.author
            }
        }).then(function success(response) {
                console.log("Search returned: ", response);
                var results = {
                    params: params,
                    data: response.data
                };
                $scope.numSubs = response.data.submissions.length;
                $scope.$emit('searchResults', results);
            }, function error(response) {
                console.log("An error occurred during the search");
                var results = {
                    err: response
                };
                $scope.$emit('searchResults', results);
            }
        )
    };

    $scope.toggleSearchBar = function () {
        console.log("Toggle search: ", $scope.hasCurrentSearch);
        $scope.showSearchBar = !$scope.showSearchBar;
    };

    $scope.initSearch = function (userID) {
        console.log("Init search");

        $scope.search($scope.searchParams, true, userID);
    };

    $scope.initSearchUser = function () {
        console.log("Init user search");
    };

    $scope.clearSearch = function () {
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

        $scope.initSearch();
    };

    // Events =========================================
    $scope.$on('initSearch', function (event, args) {
        console.log("Got initSearch");
        $scope.search($scope.searchParams);
    });


});

app.controller('userPageCtrl', function ($scope) {
    //extract user id from url
    $scope.userID = window.location.pathname.split('/')[2];

});