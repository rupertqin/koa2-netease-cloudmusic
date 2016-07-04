import Router from 'koa-router'
import adminCtrl from '../controllers/adminCtrl'

const router = Router()

// check login
router.use((ctx, next)=> {
    // if (ctx.request.url !== '/admin/login') {
    //     var sid = ctx.cookies.get('SID')
    //     var session = Session.get(sid)
    //     if ( !(session && session.isAdmin) ) {
    //         ctx.response.redirect('/admin/login')
    //     }
    // }
    return next().then(() => {
        // after 
    })
})


router.get('/login', adminCtrl.login)
router.get('/logout', adminCtrl.logout)
router.get('/dashboard', adminCtrl.dashboard)
router.get('/navigator', adminCtrl.navigator)

router.get('/article/add', adminCtrl.addArticle)
router.get('/article/:id', adminCtrl.editArticle)
router.get('/article/:id/del', adminCtrl.delArticle)
router.get('/articles', adminCtrl.articles)

router.get('/media-article/add', adminCtrl.addMediaArticle)
router.get('/media-article/:id', adminCtrl.editMediaArticle)
router.get('/media-article/:id/del', adminCtrl.delMediaArticle)
router.get('/media-articles', adminCtrl.mediaArticles)

export default router
