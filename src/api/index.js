import Router from 'koa-router'
import info from './info'
import article from './article'

const router = Router({
    prefix: '/api'
})

router.use('', info.routes(), info.allowedMethods())
router.use('', article.routes(), article.allowedMethods())

export default router
