const userErrorMessages = {
    0: 'Hmm. Something Went wrong',
    1: 'Try Refreshing your browser',
    9000: 'SHOW ME WHAT YOU GOT'
}
const errorMessages = {
    1: {
        msg: 'Field Merge Failure',
        user: 0,
    },
    2: {
        msg: 'Certificate Merge Failure',
        user: 1,
    },
    9000: {
        msg: 'SHOW ME WHAWT YOU GOT',
        user: 1
    }
}

function getErr(number) {
    const tempErr = errorMessages[number]
    if(!tempErr) return {msg: null, user: null, errNo: 'INVALID_ERR_NUM'}
    const userErr = userErrorMessages[errorMessages[number]]
    tempErr.user = userErr
    tempErr.errNo = number
    return JSON.parse(JSON.stringify(tempErr))
}
module.exports = getErr
