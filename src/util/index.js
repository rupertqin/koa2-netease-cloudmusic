import config from '../config'
import filters from './filters'
import moment from 'moment'
import crypto from 'crypto'


const Util = {
    filters,
    resJson: (response, data, statusCode)=> {
        if (data === 'error') statusCode = 400
        if (data === 'ok') statusCode = 200
        response.status = statusCode || 200
        response.body = data
    },
    getUploadedFileUrl: (path) => path.replace(config.rootPath + '/public', ''),
    moment: moment,

    hash: (method, s, format, urlsafe) => {
        const sum = crypto.createHash(method)
        const isBuffer = Buffer.isBuffer(s)
        if (!isBuffer && typeof s === 'object') {
            s = JSON.stringify(sortObject(s))
        }
        sum.update(s, isBuffer ? 'binary' : 'utf8')
        let ret = sum.digest(format)
        if (urlsafe) {
            ret = ret.replace(/\+/g, '-').replace(/\//g, '_')
        }
        return ret
    },

    md5: (s, format='hex', urlsafe=true) => Util.hash('md5', s, format, urlsafe),

    base64encode: (s, urlsafe) => {
        if (!Buffer.isBuffer(s)) {
            s = new Buffer(s)
        }
        let encode = s.toString('base64')
        if (urlsafe) {
            encode = encode.replace(/\+/g, '-').replace(/\//g, '_')
        }
        return encode
    }
}

function sortObject(o) {
    if(!o && Array.isArray(o) || typeof o !== 'object') {
        return o
    }
    const keys = Object.keys(o)
    keys.sort()
    let values = []
    for (var i = 0; i< keys.length; i++) {
        let k = keys[i]
        values.push([k, sortObject(o[k])])
    }
    return values
}


export default Util