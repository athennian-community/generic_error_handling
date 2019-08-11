(function() {
    angular.module('app')
    .factory('ErrorHandler', ErrorHandler)
    ErrorHandler.$inject = ['toastr', '$http', 'HeyListen', 'USERMSG', 'ERRCODE']
    function ErrorHandler(toastr, $http, HeyListen, USERMSG, ERRCODE) {
        const errLog = HeyListen('ErrHandler').log
        const log= HeyListen().log
        return ErrorHandler

        function sendErrorLog(err) {
            errLog('Logging error to server!')
        //    return $http.post(`${yourRoute}/log`, err)
        //    .then(res => {
        //        return res
        //    })

        }

        function ErrorHandler(NAMESPACE="unknown") {
            const nameSpace = NAMESPACE 

            
            return {
                warning: logError('warning'),
                error: logError('error'),
                log: sendErrorLog,
                accumalator
            }

            function logError(type) {
                return function(config, nameSpace=NAMESPACE) {
                    const newError = (handleError(type, nameSpace))(config)            
                    logger([newError], true, nameSpace)
                }
            }
                
            function accumalator (config={}) {
                const errors = []
                const opName = config.opName || 'accumalation'

                return (function closure(){
                    return {
                        complete: function() {
                            if(errors.length === 0) {
                                console.log('No errors in ' + nameSpace + ' during ' + opName)
                            }
                            else {
                                console.log('Error Handling Started in: ' + nameSpace) 
                                logger(errors, true, nameSpace)
                            }
                        },
                        warning: add('warning'),
                        error: add('error')
                    }
                })()

                function add(type) {
                    return function(error, NAMESPACE){
                        const tempErr = handleError(type, NAMESPACE)(error)

                        errors.push(tempErr)
                        logger([tempErr], false, NAMESPACE)
                    }
                }
            }
        }

        function handleError(type, nameSpace){
            return function(msgOrConfig) {
                const newError = {}
                if(typeof msgOrConfig === 'string') {
                    newError.msg = msgOrConfig
                }
                else if(typeof msgOrConfig === 'number') {
                    newError.errNo = msgOrConfig
                } else {
                    Object.assign(newError, msgOrConfig)
                }

                if(!newError.errNo) {
                    newError.errNo = 1
                }

                if(!newError.callback) {
                    newError.callback = function(){}
                }
            
                if(!newError.type) {
                    newError.type = type
                }
                if(!newError.nameSpace) {
                    newError.nameSpace = nameSpace
                }
                if(newError.errNo) {
                    let errNo = msgOrConfig.errNo || newError.errNo
                    Object.assign(newError, getError(errNo))
                }
                return newError
            }
        }

        function logger(errors, showToast=true, nameSpace = "ERROR") {
            if(!Array.isArray(errors)) {
                errors = [errors]
            }
            let allWarn = true
            const tableErrors = {}
            let count = 0
            for (let err of errors) {
                let tempErrBody = {
                    nameSpace: err.nameSpace,
                    errNo: err.errNo,
                    msg: err.msg,
                    err:err.err
                }
                count++
                if(showToast) toastr[err.type](err.user)
                if(err.type !== 'warning') allWarn = false
                tableErrors[String(count) + '-' + err.type] = tempErrBody 
            }
            if(errors.length === 1) log(errors[0], allWarn ? 'warning' : 'error', nameSpace)
            else                    log(errors, 'error', nameSpace)

            console.table(tableErrors)
            errors[0].callback()
            if(!allWarn) {
                sendErrorLog(errors)
            }
        }

        function getError(number) {
            const tempErr = angular.copy(ERRCODE[number])
            if(!tempErr) return {msg: null, user: null, errNo: 'INVALID_ERR_NUM'}
            const userErr = USERMSG[ERRCODE[number].user]
            tempErr.user = userErr
            tempErr.errNo = number
            return JSON.parse(JSON.stringify(tempErr))
        }
        
    }
})()
