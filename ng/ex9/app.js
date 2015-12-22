angular.module('SPAApp', ['ngRoute'])

.config(function($routeProvider) {

    $routeProvider.
    when('/home', {
        templateUrl: 'partials/home.html'
    }).
    when('/about', {
        templateUrl: 'partials/about.html'
    }).
    when('/contact', {
        templateUrl: 'partials/contact.html'
    }).otherwise({
        redirectTo: '/home'
    });

})

.run(function($rootScope) {
    $rootScope.headerTemplateUrl = 'partials/header.html';
})
