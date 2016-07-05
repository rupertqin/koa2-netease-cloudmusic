export default {
    index: async function(ctx, next) {
        const title = 'Search page'
        await ctx.render('index', {
            title, flag: 'search',
            navs: []
        })
    }
}
