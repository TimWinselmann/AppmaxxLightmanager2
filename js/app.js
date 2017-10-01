var app = angular.module('AppmaxxLightmanager2', []);

$(document).ready(function() {
    $(".button-collapse").sideNav({
        draggable: true
    });

    $('.grid').masonry({
        // options
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        //transitionDuration: 0,
    });

})
