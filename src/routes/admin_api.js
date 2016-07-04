import Router from 'koa-router'
import adminAPI from '../controllers/admin_api_ctrl'

const router = Router()

router.post('/login', adminAPI.login)

export default router
