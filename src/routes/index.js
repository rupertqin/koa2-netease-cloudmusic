import Router from 'koa-router'
import top from './top'

const router = Router()


router.use('', top.routes(), top.allowedMethods())
export default router
