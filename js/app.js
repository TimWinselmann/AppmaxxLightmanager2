var app = angular.module('AppmaxxLightmanager2', []);

app.controller("TestCtrl", function($scope, $http, $log, $interval) {

    $scope.title = 'Lichter';

    $scope.loading = true;
    $interval(function() {
        $scope.loading = false;
    }, 5000);


    $scope.toggleLight = function(light) {
        if (light.checked) {
            Materialize.toast(light.name + ' wurde eingeschaltet', 4000);
        } else {
            Materialize.toast(light.name + ' wurde ausgeschaltet', 4000);
        }
    }

    $scope.rooms = [{
        'id': 1,
        'name': 'Wohnzimmer',
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
    }];

});

$(document).ready(function() {
    $(".button-collapse").sideNav({
        draggable: true
    });
})
