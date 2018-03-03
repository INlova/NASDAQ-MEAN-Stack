/* global angular */ 
angular.module('nasdaqApp').controller('LoginController', LoginController);

function LoginController($http, $location, $window, AuthFactory, jwtHelper){
    var vm = this;
    
    vm.isLoggedIn = function(){
        if(AuthFactory.isLoggedIn){
            return true;
        } else {
            return false;
        }
    };
    
    vm.login = function(){
        if(vm.username && vm.password) {
            var user = {
                username: vm.username,
                password: vm.password
            };
            
            $http.post('user/login', user).then(function(response){
                console.log(response);
                if(response.data.success){
                    $window.sessionStorage.token = response.data.token;
                    AuthFactory.isLoggedIn = true;
                    //username appears next to welcome when logged in
                    var token = $window.sessionStorage.token;
                    var decodedToken = jwtHelper.decodedToken(token);
                    vm.loggedInUser = decodedToken.username;
                }
            }).catch(function(error){
                console.log(error);
            });
        }
    };
    
    vm.logout = function(){
        AuthFactory.isLoggedIn = false;
        delete $window.sessionStorage.token;
        $location.path('/');
    };
    
    //tad appears active without this function
    // vm.isActiveTab = function(url){
    //     var currentPath = $location.path().split('/')[1];
    //     return (url === currentPath ? 'active' : '');
    // };
    
}