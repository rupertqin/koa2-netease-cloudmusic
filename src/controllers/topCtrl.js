export default {
    index: async function(ctx, next) {
        const title = '首页'
        await ctx.render('index', {
            title, flag: 'index',
            navs: []
        })
    }
}
