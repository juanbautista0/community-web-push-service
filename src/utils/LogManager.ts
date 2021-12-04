import Log from "../interfaces/Log"

const logger = require('pino')()

const LogManager = {
    set: (info?: Log, message?: string) => {
        logger.info(typeof message !== 'undefined' ? message : 'new log')
        if (typeof info !== 'undefined')
            logger.child(info)
    }
}
export default LogManager