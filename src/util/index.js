import config from '../config'
import filters from './filters'
import moment from 'moment'

export default {
    filters,
    resJson: (response, data, statusCode)=> {
        if (data === 'error') statusCode = 400
        if (data === 'ok') statusCode = 200
        response.status = statusCode || 200
        response.body = data
    },
    getUploadedFileUrl: (path) => path.replace(config.rootPath + '/public', ''),
    moment: moment
}