
// let navs = []
// let data = Info.findOne({key: 'navigator'}, function(err, info) {
//     navs = info.data
// 
// })

export default {
    index: async function(ctx, next) {
        const title = '首页'
        await ctx.render('index', {
            title, flag: 'index',
            navs: []
        })
    }
}
