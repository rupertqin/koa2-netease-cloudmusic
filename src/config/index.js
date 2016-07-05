/**
 * Created at 16/4/11.
 * @Author Ling.
 * @Email i@zeroling.com
 */
import path from 'path'
export default {
  port: 3400,
  db: {
    host: 'localhost',
    database: 'music',
    username: 'root',
    password: ''
  },
  hostname: 'http://192.168.0.101:3000',
  rootPath: path.resolve(__dirname, '../../'),
  uploadPath: path.resolve(__dirname, '../../public/upload')
}
