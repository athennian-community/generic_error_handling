(function(){
    angular.module('app')
        .factory('HeyListen', HeyListen)

        HeyListen.$inject = ['toastr']

        function HeyListen(toastr) {

            return init

            function tell(userMsg, success, toastConfig) {
                success ? toastr.success(userMsg, toastConfig) : toastr.info(userMsg, toastConfig)
            }

            function getClass(type) {
                switch(type) {
                    case 'info':
                        return 'color: white; background-color: #2274A5'
                    case 'success':
                        return 'color: white; background-color: #95B46A'
                    case 'warning':
                        return 'color: white; background-color: #F7C225'
                    case 'error':
                        return 'color: white; background-color: #D33F49'
                }
            }

            function init(nameSpace) {
                return {

                    tell,

                    log(msg, type="info", subNameSpace) {
                        if(!nameSpace) nameSpace = angular.copy(subNameSpace)
                        console.log('%c' + ' ' + nameSpace + ': ',
                                    getClass(type),
                                    msg)

                    }
                }
            }
        }
})()
