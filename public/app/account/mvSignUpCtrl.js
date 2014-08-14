angular.module('app').controller('mvSignUpCtrl', function($scope, mvUser, mvNotifier, $location, myAuth){
    $scope.signup = function(){
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstname: $scope.fname,
            lastname: $scope.lname
        };

        myAuth.createUser(newUserData).then(function(){
            mvNotifier.notify('User Account Created');
            $location.path('/');
        }, function(reason){
            mvNotifier.error(reason);
        });
    }
});