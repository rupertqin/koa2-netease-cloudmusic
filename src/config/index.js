/**
 * Created at 16/4/11.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import path from 'path'
import loc from './loc'

let config = {
    port: 3400,
    db: {
        host: 'localhost',
        database: 'music',
        username: 'root',
        password: ''
    },
    hostname: 'http://192.168.0.101:3000',
    urlPre: '',
    rootPath: path.resolve(__dirname, '../../'),
    uploadPath: path.resolve(__dirname, '../../public/upload')
}

Object.assign(config, loc)

export default config
