/**
 * Created by tlyon on 6/1/17.
 */
// Controllers =========================================================
var app = angular.module('mainApp', [
        'hc.marked',
        'angularUtils.directives.dirPagination',
        'angularMoment',
        'ngStorage'
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
    $scope.currentPage = 1;
    $scope.totalSubmissions = 0;

    // Methods =======================================
    $scope.pageChangeHandler = function (newPageNumber) {
        console.log("Page changed: ", newPageNumber);
        $scope.$broadcast('pageChanged', {newPage: newPageNumber})
    };

    $scope.initSubmissions = function (userID) {
        console.log("mainCtrl: init submissions");
        $timeout(function () {
            $scope.$broadcast('initSearch', {init: true, userID: userID});
        })
    };

    // Events ========================================
    $scope.$on('searchResults', function (event, results) {
        console.log("mainCtrl: Got search submissions results: ", results);
        $scope.submissions = results.data.submissions;
        $scope.authors = results.data.authors;
        $scope.totalSubmissions = results.totalSubmissions;
        // $timeout(function () {
        //     $scope.dataReady = true;
        // }, 2000);
        $scope.dataReady = true;
    });

    $scope.$on('setPage', function (event, args) {
        console.log("mainCtrl: clear search");
        $scope.pagination.current = args.page;
    })
});

app.controller('searchCtrl', function ($scope, $http, $window, paginationService, $localStorage) {

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

    $scope.storage = $localStorage;

    $localStorage.$default({
        searchParams: {
            page: 1,
            sortBy: "Trending",
            time: "All time",
            topic: $scope.topics[0],
            lang: "All",
            keywords: ""
        },
        hasCurrentSearch: false,
        previousSearch: ""
    });

    $scope.numSubs = 0;

    $scope.searchParams = $localStorage.searchParams;

    $scope.previousSearch = $localStorage.previousSearch;

    $scope.hasCurrentSearch = $localStorage.hasCurrentSearch;

    $scope.showSearchBar = false;

    // Methods ========================================


    $scope.searchSubmissions = function (params, args) {
        $scope.previousSearch = params.keywords;
        $localStorage.previousSearch = params.keywords;

        if (!args.init || $localStorage.hasCurrentSearch) {
            console.log("searchCtrl: Set current search!");
            $scope.hasCurrentSearch = true;
            $localStorage.hasCurrentSearch = true;
        }

        if (args.userID) {
            if (!url.includes(args.userID)) {
                console.log("Not on user's page!");
                $scope.searchParams.author = null;
            }
            console.log("searchCtrl: Performing submissions search for user");
            $scope.searchParams.author = args.userID;
        } else {
            console.log("No user id!");
            $scope.searchParams.author = null;
        }

        var page = 1;
        if (args.newPage) {
            page = args.newPage;
        }
        $scope.searchParams.page = args.newPage;

        console.log("searchCtrl: search submissions:", $scope.searchParams, args);

        $http.get(url + '/search/all-submissions', {
            params: {
                lang: params.lang,
                topic: params.topic,
                author: params.author,
                time: params.time,
                sortBy: params.sortBy,
                keywords: params.keywords,
                page: page
            }
        }).then(function success(response) {
                console.log("searchCtrl: Search returned: ", response);
                var results = {
                    params: params,
                    data: response.data,
                    totalSubmissions: response.data.totalSubmissions
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
        $scope.$emit('setPage', {page: 1});

        console.log("Reset local storage");
        $localStorage.$reset();
        $localStorage.$default({
            searchParams: {
                page: 1,
                sortBy: "Trending",
                time: "All time",
                topic: $scope.topics[0],
                lang: "All",
                keywords: ""
            },
            hasCurrentSearch: false,
            previousSearch: ""
        });

        $scope.searchParams = $localStorage.searchParams;
        $scope.previousSearch = $localStorage.previousSearch;
        $scope.hasCurrentSearch = $localStorage.hasCurrentSearch;

        $scope.numSubs = 0;

        $scope.searchSubmissions($scope.searchParams, args);
    };

    // Events =========================================
    var sortByInit = true;
    $scope.$watch('searchParams.sortBy', function () {
        if (sortByInit) {
            sortByInit = false;
            return;
        }
        console.log("sortby changed!");
        $scope.searchSubmissions($scope.searchParams, {
            init: true,
            newPage: $scope.searchParams.page,
            userID: $scope.searchParams.author
        })
    });

    var topicInit = true;
    $scope.$watch('searchParams.topic', function () {
        if (topicInit) {
            topicInit = false;
            return;
        }
        console.log("sortby changed!");
        $scope.searchSubmissions($scope.searchParams, {
            init: true,
            newPage: $scope.searchParams.page,
            userID: $scope.searchParams.author
        })
    });

    var timeInit = true;
    $scope.$watch('searchParams.time', function () {
        if (timeInit) {
            timeInit = false;
            return;
        }
        console.log("time changed: ", $scope.searchParams);
        $scope.searchSubmissions($scope.searchParams, {
            init: true,
            newPage: $scope.searchParams.page,
            userID: $scope.searchParams.author
        })
    });

    var languageInit = true;
    $scope.$watch('searchParams.lang', function () {
        if (languageInit) {
            languageInit = false;
            return;
        }
        console.log("sortby changed!");
        $scope.searchSubmissions($scope.searchParams, {
            init: true,
            newPage: $scope.searchParams.page,
            userID: $scope.searchParams.author
        })
    });

    $scope.$on('initSearch', function (event, args) {
        console.log("searchCtrl: Got init search: ", args);
        $scope.searchSubmissions($scope.searchParams, args);
    });

    $scope.$on('initUserSearch', function (event, args) {
        console.log("searchCtrl: Got init user search:", args);
        $scope.searchUsers(args);
    });

    $scope.$on('pageChanged', function (event, args) {
        console.log("Got page changed: ", args);
        $scope.searchSubmissions.page = args.newPage;
        args.init = true;
        $scope.searchSubmissions($scope.searchParams, args)
    });

    $scope.$on('logout', function (event, args) {
        $scope.clearSearch(args);
        $http.get(url + '/logout');
    })
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
                userID: $scope.userID
            };
            console.log("userPageCtrl: Init user search: ", args);

            $timeout(function () {
                $scope.$broadcast('initUserSearch', args);
            });

        };

        $scope.logout = function () {
            $timeout(function () {
                $scope.$broadcast('logout', {init: true});
            });
        };

        // Events =========================================
        $scope.$on('searchUsersResult', function (event, results) {
            console.log("userPageCtrl: Got user search result: ", results.data);
            $scope.userSummary = results.data[0].summary;
            $scope.userJoined = results.data[0].joinDate;
            $scope.dataReady = true;
        });

    }
);