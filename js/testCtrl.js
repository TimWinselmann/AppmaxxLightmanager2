app.controller("TestCtrl", function($scope, $http, $log, $interval, MQTTService) {

    $scope.title = 'Home';

    $scope.loading = false;
    /*
    $interval(function() {
        $scope.loading = false;
        //$('.card-content').matchHeight();
    }, 1000);
    */

    $scope.publishMqttMessage = function() {
        MQTTService.send('Hello', 'World');
    }

    MQTTService.on('Hello', function(message) {
        Materialize.toast('Incoming MQTT Message: ' + message, 4000);
    });

    MQTTService.on('/home/light/*', function(message) {
        Materialize.toast('/home/light/: ' + message, 4000);
    });

    MQTTService.on('/home/presence', function(message) {
        var presenceUser = JSON.parse(message);

        angular.forEach($scope.users, function(user, i) {
            if (user.name === presenceUser.name) {
                user.home = presenceUser.home;
                Materialize.toast(presenceUser.name + ' ' + (presenceUser.home ? 'came' : 'left') + ' home', 4000);
            }
        });
    });

    $scope.toggleLight = function(room, light) {
        MQTTService.send('/home/light/' + light.name, light);
        if (light.checked) {
            Materialize.toast(room.name + ' ' + light.name + ' wurde eingeschaltet', 4000);
        } else {
            Materialize.toast(room.name + ' ' + light.name + ' wurde ausgeschaltet', 4000);
        }
    }

    $scope.users = [{
        'name': 'Tim',
        'home': true
    }, {
        'name': 'Josie',
        'home': false
    }, {
        'name': 'Ivy',
        'home': true
    }];

    $scope.rooms = [{
        'id': 1,
        'name': 'Wohnzimmer',
        'icon': 'weekend',
        'temperature': 21.6,
        'lights': [{
            'id': 1,
            'name': 'Esstisch',
            'checked': true
        }, {
            'id': 2,
            'name': 'Regal',
            'checked': false
        }, {
            'id': 7,
            'name': 'Ambilight',
            'checked': false
        }]
    }, {
        'id': 2,
        'name': 'Flur',
        'icon': 'map',
        'temperature': 22.4,
        'lights': [{
            'id': 3,
            'name': 'Eingang',
            'checked': true
        }, {
            'id': 4,
            'name': 'Kommode',
            'checked': true
        }]
    }, {
        'id': 3,
        'name': 'K\u00fcche',
        'icon': 'kitchen',
        'temperature': 26.35,
        'lights': [{
            'id': 5,
            'name': 'Sp\u00fcle',
            'checked': false
        }, {
            'id': 6,
            'name': 'Regal',
            'checked': false
        }]
    }, {
        'id': 4,
        'name': 'Bad',
        'icon': 'wc',
        'temperature': 22.35,
        'lights': [{
            'id': 15,
            'name': 'Spots',
            'checked': false
        }]
    }, {
        'id': 5,
        'name': 'Kino',
        'icon': 'videocam',
        'temperature': 21.0,
        'lights': [{
            'id': 16,
            'name': 'Spots',
            'checked': false
        }]
    }];

});
