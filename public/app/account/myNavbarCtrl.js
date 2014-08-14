angular.module('app').controller('myNavbarCtrl', function($location, $scope, $http, mvNotifier, mvIdentity, myAuth) {
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password){
        myAuth.authenticateUser(username, password).then(function(success){
            if(success){
                mvNotifier.notify("You've successfully logged in");
            } else {
                mvNotifier.notify("Username/Password Incorrect");
            }
        });
    };

    $scope.signout = function(){
        myAuth.logoutUser().then(function(){
            $scope.username = "";
            $scope.password = "";
            mvNotifier.notify('You have successfully signed out');
            $location.path('/');
        });
    }
});