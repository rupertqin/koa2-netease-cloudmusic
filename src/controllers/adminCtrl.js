import url from 'url'
import User from '../models/user'
import Article from '../models/article'
import MediaArticle from '../models/media_article'

export default {
    login: async (ctx, next)=> {
        const title = 'koa2 title'
        var users = await User.find({})
        console.log('====== ctx: ', ctx.req.session)
        await ctx.render('admin/login', {
            title, users, isLogin: ctx.req.session.isAdmin
        })
    },

    logout: async function login(ctx, next) {
        const title = 'koa2 title'
        const body = ctx.request.body
        const sid = ctx.req.session.id
        var session = Session.get(sid)
        session.isAdmin = false
        ctx.redirect('/admin/login')
    },
    
    dashboard: async (ctx, next)=> {
        const title = 'koa2 title'

        var users = await User.find({})
        await ctx.render('admin/dashboard', {
            title, users, isLogin: ctx.req.session.isAdmin
        })
    },
    
    addArticle: async function(ctx, next) {
        const title = 'koa2 title'

        var users = await User.find({})
        await ctx.render('admin/add_article', {
            title, users, 
            flag: 'add-article',
            isLogin: ctx.req.session.isAdmin
        })
    },

    editArticle: async function(ctx, next) {
        const title = 'koa2 title'

        var users = await User.find({})
        await ctx.render('admin/add_article', {
            title, users, 
            flag: 'add-article',
            isLogin: ctx.req.session.isAdmin,
            fe: {
                id: ctx.params.id
            }
        })
    },

    delArticle: async function(ctx, next) {
        const data = await Article.findOne({_id: ctx.params.id}).remove()
        ctx.response.redirect(ctx.request.body.callback || '/admin/articles')
    },

    articles: async function(ctx, next) {
        const category = ctx.request.query.category
        const articles = await Article.find({category: new RegExp(category)})
        await ctx.render('admin/articles', {
            title: 'articles', 
            articles, 
            flag: 'articles',
            isLogin: ctx.req.session.isAdmin,
            fe: {
                category: category
            }
        })
    },

    addMediaArticle: async function(ctx, next) {
        await ctx.render('admin/add_media_article', {
            title: 'add media article',
            flag: 'add-media-article',
            isLogin: ctx.req.session.isAdmin
        })
    },

    editMediaArticle: async function(ctx, next) {
        await ctx.render('admin/add_media_article', {
            title: 'edit media article', 
            flag: 'edit-media-article',
            isLogin: ctx.req.session.isAdmin,
            fe: {
                id: ctx.params.id
            }
        })
    },

    delMediaArticle: async function(ctx, next) {
        const data = await Article.findOne({_id: ctx.params.id}).remove()
        ctx.response.redirect(ctx.request.body.callback || '/admin/media-articles')
    },

    mediaArticles: async function(ctx, next) {
        const category = ctx.request.query.category
        const articles = await MediaArticle.find({category: new RegExp(category)})
        await ctx.render('admin/media_articles', {
            title: 'articles', 
            articles, 
            flag: 'articles',
            isLogin: ctx.req.session.isAdmin,
            fe: {
                category: category
            }
        })
    },

    navigator: async function(ctx, next) {
        const title = 'navigator'
        const users = await User.find({})
        await ctx.render('admin/navigator', {
            title, 
            users,
            flag: 'navigator', 
            isLogin: ctx.req.session.isAdmin
        })
    }
    
}
