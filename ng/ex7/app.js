var app = angular.module('MyApp', []);

app.run(function($rootScope) {
    $rootScope.myName = 'Arvind';
})

app.controller('AppCtrl', function($rootScope, $scope) {
	$rootScope.myName = 'Arvind';

	$scope.toggleEditMode = function(){
		$scope.isEditMode = !$scope.isEditMode;
	}
})