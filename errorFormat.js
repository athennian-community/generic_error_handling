// MOCK
const toast = require('./errMock').toastr
const errors = require('./errMock').errors

const getError = require('./error_lib.js')

function ErrorHandler(NAMESPACE="unknown") {

    const nameSpace = NAMESPACE 
    
    return {
        warn: logError('warn'),
        error: logError('error'),
        log: sendErrorLog,
        accumalator
    }

    function sendErrorLog($http) {
        console.log(' beep boop sending logs to /paper/logs ')
    }

    function logError(type) {
        return function(config, nameSpace=NAMESPACE) {
            const newError = (handleError(type, nameSpace))(config)            
            logger([newError], nameSpace)
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
                        logger(errors)
                    }
                },
                warn: add('warn'),
                error: add('error')
            }
        })()

        function add(type) {
            return function(error, NAMESPACE){
                console.log('add error')
                console.log(NAMESPACE)
                const tempErr = handleError(type, NAMESPACE)(error)

                errors.push(tempErr)
                logger([tempErr], false)
            }
        }
    }
}

function handleError(type, nameSpace){
    return function(msgOrConfig) {
        const newError = {}
        if(typeof msgOrConfig === 'string') {
            Object.assign(newError, getError(1))
            newError.msg = msgOrConfig
        }
        else if(typeof msgOrConfig === 'number') {
            Object.assign(newError, getError(msgOrConfig))
        } else {
            Object.assign(newError, msgOrConfig)
        }

        if(!msgOrConfig.errNo) {
            Object.assign(newError, getError(1))
        }

        if(!msgOrConfig.callback && !newError.callback) {
            newError.callback = function(){}
        }
       
        if(!msgOrConfig.type && !newError.type) {
            newError.type = type
        }
        if(!msgOrConfig.nameSpace || !newError.nameSpace) {
            newError.nameSpace = nameSpace
        }
        if(msgOrConfig.errNo || newError.errNo) {
            let errNo = msgOrConfig.errNo || newError.errNo
            Object.assign(newError, getError(errNo))
        }
        return newError
    }
}

function logger(errors, showToast=true) {
    if(!Array.isArray(errors)) {
        errors = [errors]
    }
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
        if(showToast) toast[err.type](err.user)
        tableErrors[String(count) + '-' + err.type] = tempErrBody 
    }

    console.table(tableErrors)
    console.log(errors)
    errors[0].callback()
}

module.exports = ErrorHandler
