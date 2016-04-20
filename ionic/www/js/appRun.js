angular.module('starter.run')
    .run(['PermissionStore', 'OAuth', 'UserData', 'RoleStore', '$rootScope', 'authService', '$state', 'httpBuffer',
        function (PermissionStore, OAuth, UserData, RoleStore, $rootScope, authService, $state, httpBuffer) {

            RoleStore.defineRole('client-role', ['user-permission', 'client-permission']);
            RoleStore.defineRole('deliveryman-role', ['user-permission', 'deliveryman-permission']);

            PermissionStore.definePermission('user-permission',
                function () {
                    return OAuth.isAuthenticated();
                });

            PermissionStore.definePermission('client-permission',
                function () {
                    var user = UserData.get();
                    if (user == null || !user.hasOwnProperty('role')) {
                        return false;
                    }

                    return user.role == 'client';
                });

            PermissionStore.definePermission('deliveryman-permission',
                function () {
                    var user = UserData.get();
                    if (user == null || !user.hasOwnProperty('role')) {
                        return false;
                    }

                    return user.role == 'delivery';
                });

            $rootScope.$on('event:auth-loginRequired', function (event, data) {
                switch (data.data.error) {
                    case 'access_denied':
                        tryLoginAgain();
                        break;
                    case 'invalid_credentials':
                        httpBuffer.rejectAll(data);
                        break;
                    default :
                        $state.go('logout');
                }
            });

            function tryLoginAgain() {
                if (!$rootScope.refreshingToken)
                    $rootScope.refreshingToken = OAuth.getRefreshToken();

                $rootScope.refreshingToken.then(function (data) {
                    authService.loginConfirmed();
                    $rootScope.refreshingToken = null;
                }, function (responseError) {
                    $state.go('logout');
                });
            };
        }]);