const winston = require('winston');
require('dotenv').config();
// date + logLevel + message


const dateFormat = ()=>{
    return new Date(Date.now()).toLocaleString();

}


class LoggerServices {
    constructor(route){
        this.route=route;
        const logger = winston.createLogger({
        level: 'info',
        format: winston.format.printf(info=>{
        //     // just shape
            let message=`${new Date().toLocaleString("en-US")},${info.level.toUpperCase()} ,${info.message}`
        // but i send obj not string sol =>
            message=info.obj? message +`data ${JSON.stringify(info.obj)}`:message;
            return message;
        }),
        // format: winston.format.json(),
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({ filename: `${process.env.LOG_FILE_PATH} /${route}.log `})  
        ]
    });
    this.logger=logger;
}
// levels func (info , debug,error,...)
async info(message){
    this.logger.log('info',message)
}
async info(message,obj){
    this.logger.log('info',message,{obj})
}
async error(message){
    this.logger.log('error',message)
}
async error(message,obj){
    this.logger.log('error',message,{obj})
}
async debug(message){
    this.logger.log('debug',message)
}
async debug(message,obj){
    this.logger.log('debug',message,{obj})
}

    }

    module.exports=LoggerServices;