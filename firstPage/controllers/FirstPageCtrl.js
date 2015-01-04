'use strict';

angular.module('app')
    .controller('FirstPageCtrl', ["$scope", function ($scope) {

        $rootScope.$watch('decInstance.isOnline', function(value){
            $scope.isDecOnline = value;
        });

        var deregisterIdentificationWatch = $rootScope.$watch('identification', function (value, oldvalue) {
            if (!value || angular.equals(value, oldvalue)) return;
            console.info('Change detected on the identification namespace: ', value);
            $scope.identification = $rootScope.identification;
        });


        $scope.drivers = [
          { text: 'James Cameron', desc: '', href: '#/secondPage', selected: true },
          { text: 'Michael Bay', desc: '', href: '#/secondPage', selected: false },
          { text: 'Mr. T', desc: '', href: '#/secondPage', selected: false }
        ];

        $scope.$on('$destroy', function () {
            //stop watching when scope is destroyed
            if (deregisterIdentificationWatch) deregisterIdentificationWatch();
        });

    }]);