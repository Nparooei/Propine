import moment from 'moment'

function errorLogger(err:unknown,module:string):void{
    let errorObj={
        timestamp:moment.now(),
        description:`An Error happend in ${module} module` ,
        err
    }
    console.log(errorObj);
}


export {errorLogger}