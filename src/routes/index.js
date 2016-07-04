import Router from 'koa-router'
import top from './top'
import users from './users'
import admin from './admin'
import adminAPI from './admin_api'
import apis from '../apis'

const router = Router()


router.use('', top.routes(), top.allowedMethods())
router.use('/users', users.routes(), users.allowedMethods())
router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/admin', adminAPI.routes(), adminAPI.allowedMethods())
router.use('/api', apis.routes(), apis.allowedMethods())

export default router
