"use strict";

var app = angular.module('app', [
    'ngRoute',
    'connectedCarSDK'
]);

angular.module('connectedCarSDK')
  .controller('ContentCtrl', ['$scope', function($scope){
    $scope.hasHeader = true;
    $scope.hasFooter = false;
    $scope.bgImg = '/images/content-bg.png';
    var images = [
      '/images/content-bg.png',
      '/images/interior-1.jpg',
      '/images/interior-2.jpg',
      '/images/interior-3.jpg',
    ];
    var bgIndex = 0;
    $scope.toggleHeader = function(){
      $scope.hasHeader = !$scope.hasHeader;
    };
    $scope.toggleFooter = function(){
      $scope.hasFooter = ! $scope.hasFooter;
    };
    $scope.toggleBackground = function(){
      bgIndex++;
      if(bgIndex === images.length) bgIndex = 0;
      $scope.bgImg = images[bgIndex];
    };
  }]);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/firstPage', {
            templateUrl: 'firstPage/views/firstPage.html',
            controller: 'FirstPageCtrl',
            settings: {
                viewName: 'Choose Driver',
            }
        })
        .when('/secondPage', {
            templateUrl: 'secondPage/views/secondPage.html',
            controller: 'SecondPageCtrl',
            settings: {
                viewName: 'Driver Score',
            }
        })
        .otherwise({
            redirectTo: '/firstPage'
        });
});

// AT&T DRIVE DEC INIT
function initDec() {
    $rootScope.decInstance = {};
    window.DecInstanceConstructor = function (inputParam) {
        var input = inputParam;
        var isOnline = input && input.successCode == '0';

        function getSuccessObject() {
            return isOnline ? input : null;
        }

        function getErrorObject() {
            return !isOnline ? input : null;
        }

        function status() {
            var returnObj = {};

            returnObj.status = isOnline ? 'success' : 'error';
            returnObj.message = isOnline ? input.successMessage : input.errorMessage;
            returnObj.code = isOnline ? input.successCode : input.errorCode;

            return returnObj;
        }

        return {
            isOnline: isOnline,
            status: status,
            getSuccessObject: getSuccessObject,
            getErrorObject: getErrorObject
        };
    };

    function decCallback(decResponse) {
        $rootScope.decInstance = new DecInstanceConstructor(decResponse);

        decSetSubscriptions();
    };

    try {
        // DO NOT REMOVE THE BELLOW COMMENT - used for grunt build process
        init(decCallback, ["appmanager", "commerce", "connectivity", "identity", "media", "navigation", "notification", "policy", "sa", "search", "settings", "sms", "va", "vehicleinfo"], 'myFirstApp');
    } catch (e) {
        $rootScope.decInstance = new DecInstanceConstructor({
            "errorCode": e.code,
            "errorMessage": e.message,
            "thrownError": e
        });
    }
}

app.run(function ($rootScope) {
    window.$rootScope = $rootScope;
    initDec();

    $rootScope.appName = 'Just Drive';
    $rootScope.showDrawer = true;
    $rootScope.serverIP = '24bf3ec1.ngrok.com/';

    $rootScope.postData = {
        "vin": 112233,
        "payload": {
            "wiperSpeed": 0, 
        },
        "timestamp": Date.now()
    };

    $rootScope.$on('$routeChangeSuccess',
        function (event, next, current) {
            $rootScope.showDrawer = false;

            $rootScope.$broadcast('changeDrawer', [false]);

            if (next && next.$$route && next.$$route.settings) {
                $rootScope.viewName = next.$$route.settings.viewName;
            }
        });

    $rootScope.appLinks = [
        { text: 'Choose Driver', desc: 'Select the current driver. ', href: '#/firstPage', selected: true },
        { text: 'Driver Score', desc: 'View your distraction score. ', href: '#/secondPage', selected: false }
    ];
});
