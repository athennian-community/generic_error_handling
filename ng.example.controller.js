(function(){
    
    angular.module('app')
    .controller('exampleCtrl', exampleCtrl)
    exampleCtrl.$inject = ['$scope', 'ErrorHandler', 'HeyListen']
    function exampleCtrl($scope, ErrorHandler, HeyListen){
        const heyError = ErrorHandler('exampleCtrl')
        const {log: heyListen, tell} = HeyListen('exampleCtrl')

        $scope.testError = testError
        $scope.testWarn = testWarn
        $scope.testNotify = testNotify
        $scope.testSuccess = testSuccess

        function testError() {
            heyError.error('Error Message!')
        }
        function testWarn() {
            heyError.warning('Warning Message!')
        }
        function testNotify() {
            heyListen('test')
            tell('Notified')
        }
        function testSuccess() {
            heyListen('success', 'success')
            tell('Success!', true)
        }
    }

})()