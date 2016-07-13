import router from 'koa-router'
import qs from 'querystring'
import locConf from '../config'

const Router = router()


export default {
    toFullUrl: (url)=> ~url.indexOf('http://') ? url : '/' + url
    routerUrl: () => {
        let params = arguments[1]
        let search = ''
        if (typeof params === 'object') {
            search = qs.stringify(params)
            search = search ? ('?'+search) : ''
        }
        return locConf.urlPre + router().url.apply(Router, arguments) + search

    }
}
