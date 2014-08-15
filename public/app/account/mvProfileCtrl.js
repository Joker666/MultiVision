angular.module('app').controller('mvProfileCtrl', function($scope, myAuth, mvIdentity, mvNotifier){
    $scope.email = mvIdentity.currentUser.username;
    $scope.fname = mvIdentity.currentUser.firstname;
    $scope.lname = mvIdentity.currentUser.lastname;

    $scope.update = function(){
        var newUserData = {
            username: $scope.email,
            firstname: $scope.fname,
            lastname: $scope.lname
        };
        if($scope.password && $scope.password.length > 0){
            newUserData.password = $scope.password;
        }

        myAuth.updateCurrentUser(newUserData).then(function(){
            mvNotifier.notify('Your user account has been updated');
        }, function(reason){
            mvNotifier.error(reason);
        });
    }
});