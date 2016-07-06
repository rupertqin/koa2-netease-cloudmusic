import neteaseMusic from '../services/netease_music'

export default {
    index: async function(ctx, next) {
        await ctx.render('index', {
            title: 'index page', flag: 'index',
            navs: []
        })
    },

    search: async function(ctx, next) {
        await ctx.render('search', {
            title: 'Search Songs', flag: 'search',
            navs: []
        })
    },
    
    play: async function(ctx, next) {
        const query = ctx.request.query
        let musicInfo
        if (query.type === 'song') {
            musicInfo = await neteaseMusic.getSong(query.id)
        }
        await ctx.render('play', {
            title: `${musicInfo.title} - ${musicInfo.artist}`,
            flag: 'play',
            type: query.type,
            musicInfo: musicInfo,
            navs: [],
            sharePic: musicInfo.pic_url,
            feData: musicInfo
        })
    }
}
