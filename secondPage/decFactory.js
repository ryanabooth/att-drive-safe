'use strict';

angular.module('app')
.factory('decFactory', function ($rootScope,$interval,$timeout) {

    var vehicleInfoInit = {
        "identification": {
            "vin": "112233",
            "vehicleType": "Car",
            "model": "S60",
            "brand": "Volvo",
            "wmi": "3 doors",
            "year": 2000
        },
        "fuel": {
            "level": 5
        },
        "ignition": {
            "vehiclePowerMode": false
        },
        "parkingBreak": {
            "status":"inactive"
        },
        "diagnostics":{
            "engine": "ok",
            "antilockBrakingSystem": "ok",
            "airBags":"ok",
            "troubleCodes": ""
        },
        "climateControl": {
            "airConditioning": false,
            "airflowDirection": "frontpanel",
            "fanSpeedLevel":5,
            "targetTemperature":23,
            "heater": false,
            "seatHeater":0,
            "seatCooler":0,
            "steeringWheelHeater":0,
            "temperature":{
                "interiorTemperature":23,
                "exteriorTemprerature":24
            }
        },
        "sideWindow": {
            lock: false,
            openess: 0
        },
        "door": {
            lock: true,
            status: "close"
        }
    }
    var navInfoInit = {
        position: {
            "latitude": 1.1,
            "longitude": 2.2,
            "altitude": "3",
            "heading": "4.4",
            "precision": "",
            "velocity": "5"
        }
    };
    var notificationInit = {
        message: {
            "text": ""
        }
    };



    var decFactory = {};


    //TODO: This very hacky code of polling every second can be removed as soon as Dec callbacks can be fixed/figured out

    // $interval(function(){
    //    console.log("sample-app: Pulling storage. This should happen evey second and is a non-ideal work-around for DecSDK.");
    //    decFactory.pullStorage();
    // },1000);

    // Thao  - if this can be flipped to true Dec-callbacks works. I tried using $rootScope but I don't know what kind of reference DEC has


    decFactory.init = function () {

        $rootScope.decUpdated = false;
        $rootScope.updcount = 0;
        $rootScope.year =10;

        var handle = $rootScope.$watch('decUpdated', decFactory.update, true);
        console.log("sample-app: Here is the Dec Factory reference " + handle);

        decFactory.welcomepage = true;

        // Initializing data
        console.log("sample-app: Initializing DecFactory...");

        decFactory.vehicleInfo = vehicleInfoInit;
        decFactory.position = navInfoInit.position;
        decFactory.notification = notificationInit.message;

        // Clearing browser storage on init
        // TODO readd clear localStorage.clear();

        // Running init with dummy function. Constructor?
        init(new function() {console.log("sample-app: In Init");$rootScope.decUpdated = false;   $rootScope.updcount++},["vehicleinfo","navigation","notification"],"myApp");

        drive.vehicleinfo.subscribe(new function() {
            alert("VI");
        }, logError);

        drive.navigation.subscribe(new function() {console.log("sample-app: In Navigation "); $rootScope.decUpdated = true;   $rootScope.updcount++; alert("Nav");});
        drive.notification.subscribe(new function() {console.log("sample-app: In Notification "); $rootScope.decUpdated = true;  alert("Not");});

        // Initialising handles - set to null to set switches to off
        decFactory.handleVI = null;
        decFactory.handleNotif = null;
        decFactory.handleNav = null;

        console.log("sample-app: Must be true " + $rootScope.decUpdated);
    }

    decFactory.init();

    decFactory.update = function(){
        console.log("sample-app: Dec uopdate is happening with value " + $rootScope.decUpdated);
        $rootScope.decUpdated = false;
    }



    decFactory.toggleWelcome = function(){
        decFactory.welcomepage = !decFactory.welcomepage;
    }

    decFactory.getNotification = function(){
        return decFactory.notification;
    }

    decFactory.clearNotification = function(){
        console.log("sample-app: Clearing notification");
        decFactory.notification.text = "";
    }

    decFactory.getVehicleInfo = function () {
        return decFactory.vehicleInfo;
    };

    decFactory.getPosition = function () {
        return decFactory.position;
    };

    function logResult(value){
        console.log("sample-app: Values updated. Get function retrieved: " + value);
    };

    function logError(value){
        console.log("sample-app: Failure setter: " + value);
    };


    decFactory.subscribeVI = function () {
        console.log("sample-app: Subscribing to Vehicle Information...");
        decFactory.handleVI = drive.vehicleinfo.subscribe(new function() {console.log("sample-app: In Subscribe "); $rootScope.decUpdated = "true"; alert("VI");},logError);
    }

    decFactory.unsubscribeVI = function () {
        console.log("sample-app: Unsubscribing to Vehicle Information... ");
        drive.vehicleinfo.unsubscribe(decFactory.handleVI);
        decFactory.handleVI = null;
    }


    decFactory.subscribeNav = function () {
        console.log("sample-app: Subscribing to Navigation...");
        decFactory.handleNav = drive.navigation.position.subscribe(new function() {console.log("sample-app: In Subscribe "); $rootScope.decUpdated = "true"; },logError);
    }

    decFactory.unsubscribeNav = function () {
        console.log("sample-app: Unsubscribing to Navigation...");
        drive.navigation.position.unsubscribe(decFactory.handleNav);
        decFactory.handleNav = null;
    }


    decFactory.subscribeNotif = function () {
        console.log("sample-app: Subscribing to Notifications...");
        decFactory.handleNotif = drive.notification.subscribe(new function() {console.log("sample-app: In Subscribe "); $rootScope.decUpdated = "true"; },logError);

    }

    decFactory.unsubscribeNotif = function () {
        console.log("sample-app: Unsubscribing to Notifications...");
        drive.notification.unsubscribe(decFactory.handleNotif);
        decFactory.handleNotif = null;
    }

    decFactory.debug = function (value) {
        console.log("sample-app: DEBUG Calling function with " , value);
        //alert("DEBUG" + value);
    };


    decFactory.error = function (value) {
        //console.log("sample-app: ERROR " , value);
        //alert("ERROR" + value);
    };

    decFactory.setInfo = function () {
        console.log("sample-app: DEBUG Running set info");
        var idSettings = {"vin":"B5244S6 S60","wmi":"K&N drop-in filter","vehicleType":"Car","brand":"Arab","model":"S60","year":2014};
        drive.vehicleinfo.identification.set(vehicleInfoInit.navigation).then(this.debug, this.error);

        //  decFactory.notification.text = "I am an incoming notification";
    };

    //TODO: A lot of this work-around code can be removed as soon as Dec callbacks is fixed/figured out

    decFactory.showStorageData = function(content){
        console.log("sample-app: Showing storage");
        var datastruct = "";
        var e = "",
            o = 0;
        for (console.log("Local Storage length is" + localStorage.length), o = 0; o <= localStorage.length - 1; o++){
            e = localStorage.key(o);
            var n = /\d/g;
            n.test(e)||(datastruct += e + " : " + localStorage.getItem(e) + "\n");
        }
        alert(datastruct);
    }

    decFactory.stringToObj = function(path,value,obj) {
        var parts = path.split("."), part;
        var l = parts.length;
        var key = parts[l-1];
        var restparts = parts.slice(0,l-1);

        //alert("Parts " + parts + " Key " + key + "  Rest " + restparts);
        while(part = restparts.shift()) {
            if( typeof obj[part] != "object") obj[part] = {};
            obj = obj[part]; // update "pointer"
        }
        obj[key] = value;
    }

    decFactory.showStorageSubscriptions = function(content){
        showLocalStorageForSubscriptions();
        //console.log("sample-app: Showing storage subscriptions");
        //var datastruct = "";
        //var e = "",
        //    o = 0;
        //for (console.log("Local Storage length is" + localStorage.length), o = 0; o <= localStorage.length - 1; o++){
        //    e = localStorage.key(o);
        //    var n = /\d/g;
        //    n.test(e)&&(datastruct += e + " : " + localStorage.getItem(e) + "\n");
        //}
        //alert(datastruct);
    }

    decFactory.pullStorage = function() {
        console.log("sample-app: Showing storage");
        var obj = {};
        var e = "",
            o = 0;
        for (o = 0; o <= localStorage.length - 1; o++) {
            e = localStorage.key(o);
            console.log("key", e);
            var n = /\d/g;
            if (!n.test(e)) {
                decFactory.stringToObj(e, localStorage.getItem(e), obj);
            }
        }
        var jsonString = JSON.stringify(obj);
        var jsonObject = JSON.parse(jsonString);

        //Merge JSON objects to keep existing information
        if (jsonObject.vehicleinfo != null)
            decFactory.vehicleInfo = $.extend( decFactory.vehicleInfo, jsonObject.vehicleinfo);
        else
            console.log("sample-app: No vehicle info in local storage");
        if (jsonObject.navigation != null)
            decFactory.position = $.extend( decFactory.position, jsonObject.navigation.position);
        else
            console.log("sample-app: No navigation info in local storage");
        if (jsonObject.notification != null)
            decFactory.notification = $.extend( decFactory.notification, jsonObject.notification.message);
        else
            console.log("sample-app: No notifications in local storage");

    }

    decFactory.clearStorage = function(content){
        console.log("sample-app: Clearing storage");
        localStorage.clear();
    }

    decFactory.simulate = function() {
        console.log("sample-app: Simulating updates");

        decFactory.position.latitude += 0.02;
        decFactory.position.longitude += 0.02;
        decFactory.vehicleInfo.climateControl.airConditioning = !decFactory.vehicleInfo.climateControl.airConditioning
        decFactory.vehicleInfo.climateControl.fanSpeedLevel++;
        decFactory.vehicleInfo.fuel.level++;
        decFactory.vehicleInfo.door.lock = !decFactory.vehicleInfo.door.lock;
        decFactory.vehicleInfo.door.status = "ajar";
        decFactory.vehicleInfo.sideWindow.openess++;

        // Thao: Setting navigation info. Should clearly trigger our function - which can be seen in console
        var idSettings = {"vin":"B5244S6 S60","wmi":"K&N drop-in filter","vehicleType":"Car","brand":"Arab","model":"S60","year":2014};
        drive.vehicleinfo.identification.year.set($rootScope.year++).then(this.debug, this.error);

        // Thao: But as it seems to me - I don't see any way of injecting anything into Dec - so no way of getting any information from Dec.
        // That's why I think I need to pull every second.
        console.log("sample-app: DEBUG I am a flag that must be true: " + $rootScope.year + "  " + $rootScope.decUpdated + "   " +  $rootScope.updcount);
      //  decFactory.notification.text = "I am an incoming notification";
    }

    return decFactory;

})