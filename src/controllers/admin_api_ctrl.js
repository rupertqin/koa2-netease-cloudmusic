import mongoose from 'mongoose'
const User = mongoose.model('User');


export default {
    login: async function login(ctx, next) {
        console.log('======== ctx: ', ctx.request.body, Object.keys(ctx) )
        const title = 'koa2 title'
        const body = ctx.request.body
        var user = await User.find({name: body.name})
        if (body.password == user.password) {
            Util.resJson(ctx.response, 'error', 400)
            
        } else {
            // const sid = ctx.cookies.get('SID')
            const sid = ctx.req.session.id
            var session = Session.get(sid)
            session.isAdmin = true
            ctx.redirect('/admin/dashboard')
        }
        // ctx.req.session.user = user
        
        // ctx.sent(ctx.params)
    },
    
    about: async function about(ctx, next) {
        const title = 'koa2 title'

        await ctx.render('about', {
            title
        })
    }
}
