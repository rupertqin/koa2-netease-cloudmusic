import Router from 'koa-router'
import topCtrl from '../controllers/topCtrl'

const router = Router()

router.get('/', topCtrl.index)


export default router


