'use strict';

// var angular, console, $rootScope;

angular.module('app')
    .controller('SecondPageCtrl', ["$scope", "$http", '$interval', '$alert', function ($scope, $http, $interval, $alert) {
        $rootScope.$watch('decInstance.isOnline', function(value){
            $scope.isDecOnline = value;
        });

        // {'currentScore': last_score, 'avgScore': avg_score}
        $scope.score = '--';

        var statuses = [
            'green',
            'yellow',
            'orange',
            'red'
        ];

        $scope.status = {
            smooth: statuses[0],
            messaging: statuses[0],
            speed: statuses[0],
            weather: statuses[0]
        };

        $scope.pickups = [
          // { text: 'Michael Bay', desc: '125 Hollywood Cresent', href: '', selected: false },
          // { text: 'John Wayne', desc: '2234 Lakewood Drive', href: '', selected: false }
        ];

        function logSuccessfulPost (response) {
            console.log('### API post');
            console.log(JSON.stringify(response));
        }

        function logError (response) {
            console.error('### Just Drive API post error');
        }

        function setScore (response) {
            $scope.score = Math.abs(parseInt(response.data.score.currentScore, 10));
        }

        function newDestination(response) {
            console.log('#### response', response);
            $alert.show({
                type: 'success',
                showConfirmationBtn: true,
                buttonText: 'OK',
                autoCloseInterval: 3000,
                title: 'Route Set',
                text: 'New destination set'
            });
            // Destination destination = new Destination();
            // poiLat = response.data.payload.path[response.data.payload.path.length-1][0];
            // poiLongitude = response.data.payload.path[response.data.payload.path.length-1][1];
            // Routing routing = new Routing();
            // routing.setLatitude(poiLat);
            // routing.setLongitude(poiLong);
            // destination.setRouting(routing);
            // drive.navigation.destination.set(destination);

            // drive.navigation.routes.waypoints.set(response.data.payload.path)
            // .then(function () {
                
            // });
        }

        function acceptPickup () {
            var data = {
                user: $scope.pickups[0].text,
                address: $scope.pickups[0].desc,
                lat: -115.195564,
                lon: 36.114094
            };
            $http.post('http://' + $rootScope.serverIP + 'api/approve_pickup', {"payload": data})
                .then(newDestination, logError);
        }

        function listOfPickups (response) {
            $scope.pickups = [];
            for (var i = response.data.payload.length - 1; i >= 0; i--) {
                $scope.pickups.push({text: response.data.payload[i].user, desc: response.data.payload[i].address});
            }
            // delete this if needed
            // 
            if( $scope.pickups.length > 0 ) {
                var message = $scope.pickups[0].text + ' is at ' + $scope.pickups[0].desc;
                message = message.substr(0, 40) + '...',
                $alert.show({
                    type: 'info',
                    showConfirmationBtn: true,
                    buttonText: 'Accept',
                    onClose: acceptPickup(),
                    title: 'Ride Request',
                    text: message
                });
            }
        }


        var fakeStep = 0;
        var previousSpeed;
        var smooth = 0;

        var fakeData = [
            {
                'navigation': {
                    'position': {
                        "latitude": 10.000,
                        "heading": 26.5,
                        "longitude": 24.283,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '50'
                },
                "lightStatus": {
                    "rightTurn": "false",
                    "parking": "false",
                    "break": "false",
                    "fog": "false",
                    "highBeam": "false",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "false",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
            {
                'navigation': {
                    'position': {
                        "latitude": 10.050,
                        "heading": 26.5,
                        "longitude": 24.333,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '60'
                },
                "lightStatus": {
                    "rightTurn": "false",
                    "parking": "false",
                    "break": "false",
                    "fog": "false",
                    "highBeam": "false",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "false",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
            {
                'navigation': {
                    'position': {
                        "latitude": 10.100,
                        "heading": 26.5,
                        "longitude": 24.383,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '35'
                },
                "lightStatus": {
                    "rightTurn": "true",
                    "parking": "false",
                    "break": "true",
                    "fog": "false",
                    "highBeam": "false",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "false",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
            {
                'navigation': {
                    'position': {
                        "latitude": 10.000,
                        "heading": 26.5,
                        "longitude": 24.283,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '100'
                },
                "lightStatus": {
                    "rightTurn": "false",
                    "parking": "false",
                    "break": "true",
                    "fog": "false",
                    "highBeam": "false",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "false",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
            {
                'navigation': {
                    'position': {
                        "latitude": 10.000,
                        "heading": 26.5,
                        "longitude": 24.283,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '70'
                },
                "lightStatus": {
                    "rightTurn": "false",
                    "parking": "false",
                    "break": "false",
                    "fog": "false",
                    "highBeam": "false",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "false",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
            {
                'navigation': {
                    'position': {
                        "latitude": 10.000,
                        "heading": 26.5,
                        "longitude": 24.283,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '100'
                },
                "lightStatus": {
                    "rightTurn": "false",
                    "parking": "false",
                    "break": "false",
                    "fog": "false",
                    "highBeam": "false",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "true",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
            {
                'navigation': {
                    'position': {
                        "latitude": 10.000,
                        "heading": 26.5,
                        "longitude": 24.283,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '100'
                },
                "lightStatus": {
                    "rightTurn": "false",
                    "parking": "false",
                    "break": "false",
                    "fog": "false",
                    "highBeam": "true",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "false",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
            {
                'navigation': {
                    'position': {
                        "latitude": 10.000,
                        "heading": 26.5,
                        "longitude": 24.283,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '55'
                },
                "lightStatus": {
                    "rightTurn": "false",
                    "parking": "false",
                    "break": "false",
                    "fog": "false",
                    "highBeam": "false",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "false",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
            {
                'navigation': {
                    'position': {
                        "latitude": 10.000,
                        "heading": 26.5,
                        "longitude": 24.283,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '58'
                },
                "lightStatus": {
                    "rightTurn": "false",
                    "parking": "false",
                    "break": "false",
                    "fog": "false",
                    "highBeam": "false",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "false",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
            {
                'navigation': {
                    'position': {
                        "latitude": 10.000,
                        "heading": 26.5,
                        "longitude": 24.283,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '60'
                },
                "lightStatus": {
                    "rightTurn": "false",
                    "parking": "false",
                    "break": "false",
                    "fog": "false",
                    "highBeam": "false",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "false",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
            {
                'navigation': {
                    'position': {
                        "latitude": 10.000,
                        "heading": 26.5,
                        "longitude": 24.283,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '60'
                },
                "lightStatus": {
                    "rightTurn": "false",
                    "parking": "false",
                    "break": "false",
                    "fog": "false",
                    "highBeam": "false",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "false",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
            {
                'navigation': {
                    'position': {
                        "latitude": 10.000,
                        "heading": 26.5,
                        "longitude": 24.283,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '64'
                },
                "lightStatus": {
                    "rightTurn": "false",
                    "parking": "false",
                    "break": "false",
                    "fog": "false",
                    "highBeam": "false",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "false",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
            {
                'navigation': {
                    'position': {
                        "latitude": 10.000,
                        "heading": 26.5,
                        "longitude": 24.283,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '70'
                },
                "lightStatus": {
                    "rightTurn": "false",
                    "parking": "false",
                    "break": "false",
                    "fog": "false",
                    "highBeam": "false",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "false",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
            {
                'navigation': {
                    'position': {
                        "latitude": 10.000,
                        "heading": 26.5,
                        "longitude": 24.283,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '75'
                },
                "lightStatus": {
                    "rightTurn": "false",
                    "parking": "false",
                    "break": "false",
                    "fog": "false",
                    "highBeam": "false",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "false",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
            {
                'navigation': {
                    'position': {
                        "latitude": 10.000,
                        "heading": 26.5,
                        "longitude": 24.283,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '28'
                },
                "lightStatus": {
                    "rightTurn": "false",
                    "parking": "false",
                    "break": "false",
                    "fog": "false",
                    "highBeam": "false",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "false",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
            {
                'navigation': {
                    'position': {
                        "latitude": 10.000,
                        "heading": 26.5,
                        "longitude": 24.283,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '28'
                },
                "lightStatus": {
                    "rightTurn": "false",
                    "parking": "false",
                    "break": "false",
                    "fog": "false",
                    "highBeam": "false",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "false",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
            {
                'navigation': {
                    'position': {
                        "latitude": 10.000,
                        "heading": 26.5,
                        "longitude": 24.283,
                        "altitude": 1029,
                        "velocity": 30,
                        "precision": 2,
                    }
                },
                'vehicleSpeed': {
                    'speed': '28'
                },
                "lightStatus": {
                    "rightTurn": "false",
                    "parking": "false",
                    "break": "false",
                    "fog": "false",
                    "highBeam": "false",
                    "hazard": "false",
                    "_break": "false",
                    "leftTurn": "false",
                    "head": "false"
                },
                "climateControl": {
                    "zones": [{
                                  "zone": "front",
                                  "airflowDirection": "defrostfloor"
                              }, {
                                  "fanSpeedLevel": "0",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "airConditioning": "false"
                              }, {
                                  "airRecirculation": "false",
                                  "zone": "front"
                              }, {
                                  "heater": "false",
                                  "zone": "front"
                              }, {
                                  "zone": "front",
                                  "seatHeater": "0"
                              }, {
                                  "seatCooler": "0",
                                  "zone": "front"
                              }],
                    "steeringWheelHeater": "0",
                    "temperature": {
                        "interiorTemperature": "0"
                    }
                }
            },
        ];

        $interval(function() {
            $http.post('http://' + $rootScope.serverIP + 'api/score', {})
                .then(setScore, logError);

            $http.post('http://' + $rootScope.serverIP + 'api/get_pickups', {})
                .then(listOfPickups, logError);
        }, 5000);

        $interval(function(fakeStep) {
            var fake = fakeData[fakeStep];

            $scope.postData.payload = fake;
            $scope.postData.timestamp = Date.now();

            var vs = $scope.postData.payload.vehicleSpeed.speed;
            if( vs < 35) {
                $scope.status.speed = 'green';
                $scope.status.smooth = 'green';
            } else if( vs >= 35 && vs < 55 ) {
                $scope.status.speed = 'yellow';
                $scope.status.smooth = 'yellow';
            } else if( vs >= 55 && vs < 72 ) {
                $scope.status.speed = 'orange';
                $scope.status.smooth = 'orange';
            } else if( vs >= 72 ) {
                $scope.status.speed = 'red';
                $scope.status.smooth = 'red';
            }

            $http.post( 'http://' + $rootScope.serverIP + 'api/data', $scope.postData)
                .then(logSuccessfulPost, logError);

            // Navigation
            drive.navigation.position.latitude.set(fake.navigation.position.latitude).then(function(response) {
                // console.log('### latitude set', response);
                drive.navigation.position.latitude.get().then(function(response) {
                });
            });
            drive.navigation.position.heading.set(fake.navigation.position.heading).then(function(response) {
                // console.log('### heading set', response);
                drive.navigation.position.heading.get().then(function(response) {
                    // console.log('### heading get', response);
                });
            });
            drive.navigation.position.longitude.set(fake.navigation.position.longitude).then(function(response) {
                // console.log('### longitude set', response);
                drive.navigation.position.longitude.get().then(function(response) {
                    // console.log('### longitude get', response);
                });
            });
            drive.navigation.position.altitude.set(fake.navigation.position.altitude).then(function(response) {
                // console.log('### altitude set', response);
                drive.navigation.position.altitude.get().then(function(response) {
                    // console.log('### altitude get', response);
                });
            });
            drive.navigation.position.velocity.set(fake.navigation.position.velocity).then(function(response) {
                // console.log('### velocity set', response);
                drive.navigation.position.velocity.get().then(function(response) {
                    // console.log('### velocity get', response);
                });
            });
            drive.navigation.position.precision.set(fake.navigation.position.precision).then(function(response) {
                // console.log('### precision set', response);
                drive.navigation.position.precision.get().then(function(response) {
                    // console.log('### precision get', response);
                });
            });

            // Speed
            drive.vehicleinfo.vehicleSpeed.speed.set(fake.vehicleSpeed.speed).then(function(response) {
                console.log('### speed set', response);
                drive.vehicleinfo.vehicleSpeed.speed.get().then(function(response) {
                    console.log('### speed get', response);
                });
            });

            // light status
            drive.vehicleinfo.lightStatus.rightTurn.set(fake.lightStatus.rightTurn).then(function(response) {
                // console.log('### speed set', response);
                drive.vehicleinfo.lightStatus.rightTurn.get().then(function(response) {
                    // console.log('### speed get', response);
                });
            });
            drive.vehicleinfo.lightStatus.parking.set(fake.lightStatus.parking).then(function(response) {
                // console.log('### speed set', response);
                drive.vehicleinfo.lightStatus.parking.get().then(function(response) {
                    // console.log('### speed get', response);
                });
            });
            drive.vehicleinfo.lightStatus.break.set(fake.lightStatus.break).then(function(response) {
                // console.log('### speed set', response);
                drive.vehicleinfo.lightStatus.break.get().then(function(response) {
                    // console.log('### speed get', response);
                });
            });
            drive.vehicleinfo.lightStatus.fog.set(fake.lightStatus.fog.set).then(function(response) {
                // console.log('### speed set', response);
                drive.vehicleinfo.lightStatus.fog.get().then(function(response) {
                    // console.log('### speed get', response);
                });
            });
            drive.vehicleinfo.lightStatus.highBeam.set(fake.lightStatus.highBeam.set).then(function(response) {
                // console.log('### speed set', response);
                drive.vehicleinfo.lightStatus.highBeam.get().then(function(response) {
                    // console.log('### speed get', response);
                });
            });
            drive.vehicleinfo.lightStatus.hazard.set(fake.lightStatus.hazard).then(function(response) {
                // console.log('### speed set', response);
                drive.vehicleinfo.lightStatus.hazard.get().then(function(response) {
                    // console.log('### speed get', response);
                });
            });
            drive.vehicleinfo.lightStatus.leftTurn.set(fake.lightStatus.leftTurn).then(function(response) {
                // console.log('### speed set', response);
                drive.vehicleinfo.lightStatus.leftTurn.get().then(function(response) {
                    // console.log('### speed get', response);
                });
            });
            drive.vehicleinfo.lightStatus.head.set(fake.lightStatus.head).then(function(response) {
                // console.log('### speed set', response);
                drive.vehicleinfo.lightStatus.head.get().then(function(response) {
                    // console.log('### speed get', response);
                });
            });


            // drive.vehicleinfo.climateControl.zones[0]['airflowDirection'].set(fake.climateControl.zones[0]['airflowDirection']).then(function(response) {
            //     console.log('### air flow set', response);
            //     drive.vehicleinfo.climateControl.zones[0]['airflowDirection'].get().then(function(response) {
            //         console.log('### air flow get', response);
            //     });
            // });

            if(fakeStep < (fakeData.length)) {
                fakeStep += 1;
            } else {
                fakeStep = 0;
            }

        }, 7000);

        $rootScope.$watchCollection('postData', function(value, oldvalue){
            if (!value || angular.equals(value, oldvalue)) return;
            $scope.postData = $rootScope.postData;
            // var vs = $scope.postData.payload.vehicleSpeed;
            // if( vs < 35) {
            //     $scope.status.speed = 'green';
            // } else if( vs >= 35 && vs < 55 ) {
            //     $scope.status.speed = 'yellow';
            // } else if( vs >= 55 && vs < 72 ) {
            //     $scope.status.speed = 'orange';
            // } else if( vs >= 72 ) {
            //     $scope.status.speed = 'red';
            // }
            // $http.post( 'http://' + $rootScope.serverIP + 'api/data', $rootScope.postData)
            //     .then(logSuccessfulPost, logError);
        });

        // var deregisterIdentificationWatch = $rootScope.$watch('identification', function (value, oldvalue) {
        //     if (!value || angular.equals(value, oldvalue)) return;
        //     console.info('Change detected on the identification namespace: ', value);
        //     $scope.identification = $rootScope.identification;
        // });

        // var deregisterPoisWatch = $rootScope.$watch('pois', function (value, oldvalue) {
        //     if (!value || angular.equals(value, oldvalue)) return;
        //     console.info('Change detected on the pois namespace: ', value);
        // });

        // var deregisterFuelWatch = $rootScope.$watch('fuel', function (value, oldvalue) {
        //     if (!value || angular.equals(value, oldvalue)) return;
        //     console.info('Change detected on the fuel namespace: ', value);
        //     $scope.fuel = $rootScope.fuel;

        // });

        // var deregisterTireWatch = $rootScope.$watch('tire', function (value, oldvalue) {
        //     if (!value || angular.equals(value, oldvalue)) return;
        //     console.info('Change detected on the tire namespace: ', value);
        //     $scope.tire = $rootScope.tire;

        // });

        // var deregisterDiagnosticWatch = $rootScope.$watch('diagnostic', function (value, oldvalue) {
        //     if (!value || angular.equals(value, oldvalue)) return;
        //     console.info('Change detected on the diagnostic namespace: ', value);
        //     $scope.diagnostic = $rootScope.diagnostic;

        // });

        // var deregisterIgnitionWatch = $rootScope.$watch('ignition', function (value, oldvalue) {
        //     if (!value || angular.equals(value, oldvalue)) return;
        //     console.info('Change detected on the ignition namespace: ', value);
        //     $scope.ignition = $rootScope.ignition;

        // });

        // var deregisterParkingBreakWatch = $rootScope.$watch('parkingBreak', function (value, oldvalue) {
        //     if (!value || angular.equals(value, oldvalue)) return;
        //     console.info('Change detected on the parking break namespace: ', value);
        //     $scope.parkingBreak = $rootScope.parkingBreak;

        // });

        // var deregisterLightStatusWatch = $rootScope.$watch('lightStatus', function (value, oldvalue) {
        //     if (!value || angular.equals(value, oldvalue)) return;
        //     console.info('Change detected on the lightStatus namespace: ', value);
        //     $scope.lightStatus = $rootScope.lightStatus;

        // });

        // var deregisterClimateControlWatch = $rootScope.$watch('climateControl', function (value, oldvalue) {
        //     if (!value || angular.equals(value, oldvalue)) return;
        //     console.info('Change detected on the climate control namespace: ', value);
        //     $scope.climateControl = $rootScope.climateControl;

        // });

        // var deregisterDoorWatch = $rootScope.$watch('door', function (value, oldvalue) {
        //     if (!value || angular.equals(value, oldvalue)) return;
        //     console.info('Change detected on the door namespace: ', value);
        //     $scope.door = $rootScope.door;

        // });

        // var deregisterSideWindowWatch = $rootScope.$watch('sideWindow', function (value, oldvalue) {
        //     if (!value || angular.equals(value, oldvalue)) return;
        //     console.info('Change detected on the sideWindow namespace: ', value);
        //     $scope.sideWindow = $rootScope.sideWindow;

        // });

        // var deregisterPositionWatch = $rootScope.$watch('position', function (value, oldvalue) {
        //     if (!value || angular.equals(value, oldvalue)) return;
        //     console.info('Change detected on the position namespace: ', value);
        //     $scope.position = $rootScope.position;
        // });

        // $scope.ignition = {
        //     "vehiclePowerMode": false
        // };
        // $scope.parkingBreak = {
        //     "status":"inactive"
        // };
        // $scope.diagnostic = {
        //     "engine": "OK",
        //     "antilockBrakingSystem": "OK",
        //     "airBags":"OK",
        //     "troubleCodes": "AC101"
        // };

        // $scope.fuel = {
        //     "level": 100
        // };
        // $scope.identification = {
        //     "vin": "112233",
        //     "model": "S60",
        //     "brand": "Volvo"
        // };

        // $scope.door = {
        //     "zones":[
        //         {"status":"ajar","lock":"true","zone":"driver"},
        //         {"status":"ajar","lock":"true","zone":"passenger"},
        //         {"status":"ajar","lock":"true","zone":"rear+left"},
        //         {"status":"ajar","lock":"false","zone":"rear+right"},
        //         {"status":"ajar","lock":"true","zone":"trunk"},
        //         {"status":"ajar","lock":"true","zone":"fuel"}
        //     ]
        // };

        // $scope.sideWindow = {
        //     "zones":[
        //         {"openness":0,"lock":true,"zone":"front+left"},
        //         {"openness":0,"lock":true,"zone":"front+right"},
        //         {"openness":0,"lock":true,"zone":"rear+left"},
        //         {"openness":0,"lock":true,"zone":"rear+right"}
        //     ]
        // };

        // $scope.tire = {
        //     "zones":[
        //         {"pressure":29,"zone":"front+left"},
        //         {"pressure":29,"zone":"front+right"},
        //         {"pressure":27,"zone":"rear+left"},
        //         {"pressure":29,"zone":"rear+right"}
        //     ]
        // };

        // $scope.climateControl = {
        //     "temperature":{
        //         "interiorTemperature":23
        //     },
        //     "zones":[
        //         {"airflowDirection":"frontpanel","zone":"front"},
        //         {"fanSpeedLevel":0,"zone":"front"},
        //         {"airRecirculation":false,"zone":"front"},
        //         {"airConditioning":true,"zone":"front"},
        //         {"heater":false,"zone":"front"},
        //         {"seatHeater":0,"zone":"front"},
        //         {"seatCooler":0,"zone":"front"}
        //     ]
        // };

        // $scope.lightStatus = {
        //     "brake":true,
        //     "fog":true,
        //     "hazard":true,
        //     "headlights":true,
        //     "leftTurn":true,
        //     "parking":true,
        //     "rightTurn":true
        // };

        // $scope.position = {
        //     "latitude": 1.1,
        //     "longitude": 2.2,
        //     "altitude": "3",
        //     "heading": "4.4",
        //     "precision": "",
        //     "velocity": "5"
        // };

        // $scope.poiChange = function () {
        //     console.log("sample-app: Showing storage");
        //     var datastruct = "";
        //     var e = "",
        //         o = 0;
        //     for (console.log("Local Storage length is" + localStorage.length), o = 0; o <= localStorage.length - 1; o++){
        //         e = localStorage.key(o);
        //         var n = /\d/g;
        //         n.test(e)||(datastruct += e + " : " + localStorage.getItem(e) + "\n");
        //     }
        //     //alert(datastruct);
        //     console.log("This is Stoffe's local storage", datastruct);

        //     $scope.door = {
        //         "zones":[
        //             {"status":"ajar","lock":"true","zone":"driver"},
        //             {"status":"ajar","lock":"false","zone":"passenger"},
        //             {"status":"ajar","lock":"false","zone":"rear+left"},
        //             {"status":"ajar","lock":"false","zone":"rear+right"},
        //             {"status":"ajar","lock":"false","zone":"trunk"},
        //             {"status":"ajar","lock":"false","zone":"fuel"}
        //         ]
        //     };
        // };

        // $scope.$on('$destroy', function () {
        //     //stop watching when scope is destroyed
        //     if (deregisterPoisWatch) deregisterPoisWatch();
        //     if (deregisterFuelWatch) deregisterFuelWatch();
        //     if (deregisterTireWatch) deregisterTireWatch();
        //     if (deregisterDiagnosticWatch) deregisterDiagnosticWatch();
        //     if (deregisterIgnitionWatch) deregisterIgnitionWatch();
        //     if (deregisterParkingBreakWatch) deregisterParkingBreakWatch();
        //     if (deregisterLightStatusWatch) deregisterLightStatusWatch();
        //     if (deregisterClimateControlWatch) deregisterClimateControlWatch();
        //     if (deregisterSideWindowWatch) deregisterSideWindowWatch();
        //     if (deregisterIdentificationWatch) deregisterIdentificationWatch();
        //     if (deregisterPositionWatch) deregisterPositionWatch();
        // });
        // 
        // var decFactory = {};

        // decFactory.showStorageData = function(content){
        //     console.log("sample-app: Showing storage");
        //     var datastruct = "";
        //     var e = "",
        //         o = 0;
        //     for (console.log("Local Storage length is" + localStorage.length), o = 0; o <= localStorage.length - 1; o++){
        //         e = localStorage.key(o);
        //         var n = /\d/g;
        //         n.test(e)||(datastruct += e + " : " + localStorage.getItem(e) + "\n");
        //     }
        //     alert(datastruct);
        // };

        // decFactory.stringToObj = function(path,value,obj) {
        //     var parts = path.split("."), part;
        //     var l = parts.length;
        //     var key = parts[l-1];
        //     var restparts = parts.slice(0,l-1);

        //     //alert("Parts " + parts + " Key " + key + "  Rest " + restparts);
        //     while(part = restparts.shift()) {
        //         if( typeof obj[part] != "object") obj[part] = {};
        //         obj = obj[part]; // update "pointer"
        //     }
        //     obj[key] = value;
        // };

        // decFactory.showStorageSubscriptions = function(content){
        //     showLocalStorageForSubscriptions();
        //     //console.log("sample-app: Showing storage subscriptions");
        //     //var datastruct = "";
        //     //var e = "",
        //     //    o = 0;
        //     //for (console.log("Local Storage length is" + localStorage.length), o = 0; o <= localStorage.length - 1; o++){
        //     //    e = localStorage.key(o);
        //     //    var n = /\d/g;
        //     //    n.test(e)&&(datastruct += e + " : " + localStorage.getItem(e) + "\n");
        //     //}
        //     //alert(datastruct);
        // };

        // decFactory.pullStorage = function() {
        //     console.log("sample-app: Showing storage");
        //     var obj = {};
        //     var e = "",
        //         o = 0;
        //     for (o = 0; o <= localStorage.length - 1; o++) {
        //         e = localStorage.key(o);
        //         console.log("key", e);
        //         var n = /\d/g;
        //         if (!n.test(e)) {
        //             decFactory.stringToObj(e, localStorage.getItem(e), obj);
        //         }
        //     }
        //     var jsonString = JSON.stringify(obj);
        //     var jsonObject = JSON.parse(jsonString);

        //     // //Merge JSON objects to keep existing information
        //     // if (jsonObject.vehicleinfo != null)
        //     //     decFactory.vehicleInfo = $.extend( decFactory.vehicleInfo, jsonObject.vehicleinfo);
        //     // else
        //     //     console.log("sample-app: No vehicle info in local storage");
        //     // if (jsonObject.navigation != null)
        //     //     decFactory.position = $.extend( decFactory.position, jsonObject.navigation.position);
        //     // else
        //     //     console.log("sample-app: No navigation info in local storage");
        //     // if (jsonObject.notification != null)
        //     //     decFactory.notification = $.extend( decFactory.notification, jsonObject.notification.message);
        //     // else
        //     //     console.log("sample-app: No notifications in local storage");
        //     $scope.postData = jsonObject;
        // };

        // $interval(function() {
        //     decFactory.pullStorage();
        // }, 1000);

        // decFactory.clearStorage = function(content){
        //     console.log("sample-app: Clearing storage");
        //     localStorage.clear();
        // };
    }]);