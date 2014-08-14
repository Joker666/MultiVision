angular.module('app').factory('myAuth', function($http, mvIdentity, $q){
    return {
        authenticateUser: function(username, password){
            var defer = $q.defer();
            $http.post('/login', {
                username: username, password: password
            }).then(function(response){
                if(response.data.success){
                    //console.log(response);
                    mvIdentity.currentUser = response.data.user;
                    defer.resolve(true);
                } else {
                    defer.resolve(false);
                }
            });
            return defer.promise;
        },
        logoutUser: function(){
            var defer = $q.defer();
            $http.post('/logout', { logout: true }).then(function(){
                mvIdentity.currentUser = undefined;
                defer.resolve();
            });
            return defer.promise;
        }
    }
});
