angular.module('app').controller('myMainCtrl', function($scope, mvCachedCourses) {
    $scope.courses = mvCachedCourses.query();
});