var app = angular.module('AppmaxxLightmanager2', []);

app.controller("TestCtrl", function($scope, $http, $log, $interval) {

    $scope.title = 'Licht';

    $scope.loading = true;
    $interval(function() {
        $scope.loading = false;
        $('.card-content').matchHeight();
    }, 1000);


    $scope.toggleLight = function(room, light) {
        if (light.checked) {
            Materialize.toast(room.name + ' ' + light.name + ' wurde eingeschaltet', 4000);
        } else {
            Materialize.toast(room.name + ' ' + light.name + ' wurde ausgeschaltet', 4000);
        }
    }

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
        'name': 'Badezimmer',
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

$(document).ready(function() {
    $(".button-collapse").sideNav({
        draggable: true
    });

    $('.card-content').matchHeight();
})
