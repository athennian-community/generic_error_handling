# Hey Listen! Error Handling and Logging tool

## Purpose

Simple functional error handler that has some tools to help ng devs debug and build faster

## Usage

#### Log and report Error
Quickly throw warnings or errors, or configure.
```
    const shouldHaveListened = ErrorHandler('yourService')

    function doThisOnFailure() {
        // do something
    }

    // configure
    shouldHaveListened.error({
        err: stackTrace,
        msg: 'Yo developer! yourService Failed',
        errNo: 1,
        callback: doThisOnFailure
    })

    // string to log message
    shouldHaveListened.warn('You\'ve been warned')

    // number to retrieve err from error number constant library
    shouldHaveListened.error(1)

    // accumalate errors
    const myAppIssues = shouldHaveListened.accumalate({opName: 'myAppDoesTenThings'})

    myAppIssues.warning('Everythings broken')
    myAppIssues.error(1)
    myAppIssues.warning({user: "GENERIC", msg: "My app has Issues"})
    
    // complete acc
    myAppIssues.complete()

```

#### Log to console

```
    const heyListen = HeyListen('yourController')
    heyListen('This is logged to the console')

    // Log success message
    heyListen({msg: 'Hey!', response_body}, true)_

```

#### See it do things

![Alt Text](https://github.com/athennian-community/ngHeyListen/blob/master/assets/errors.gif)
