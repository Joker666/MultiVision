angular.module('app').controller('myNavbarCtrl', function($scope, $http, mvNotifier, mvIdentity, myAuth) {
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password){
        myAuth.authenticateUser(username, password).then(function(success){
            if(success){
                mvNotifier.notify("You've succcesfully logged in");
            } else {
                mvNotifier.notify("Username/Password Incorrect");
            }
        });
    }
});