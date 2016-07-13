import Router from 'koa-router'
import topCtrl from '../controllers/topCtrl'

const router = Router()

router.get('search', '/', topCtrl.search)
router.get('search', '/search', topCtrl.search)
router.get('play', '/play', topCtrl.play)


export default router


