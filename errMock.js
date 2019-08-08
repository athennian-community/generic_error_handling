
const toastr = {
        warn(err){
            console.log('warning Toastr', err)
        },
        error(err){
            console.error('error toastr', err)
        },
}

function failCallback() {
    console.error('killing merge process')
}

const errors = [{
    err: 'TYPE ERROR',
    type: 'warn',
    errNo: 1,
    user: 'please contact your system admin',
    msg: 'Certificate param and output missmatch',
},
{
    err: 'EXCEPTION',
    type: 'error',
    errNo: 1,
    user: 'Everything went wrong',
    msg: 'problem with types in parameters',
    callback: failCallback
},
{
    err: 'lksdfjlasfdj',
    msg: 'Bork Bork Bork'
}]

module.exports = {
    toastr,
    errors,
    failCallback
}
