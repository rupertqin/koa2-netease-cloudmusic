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
        let title
        let sharePic
        if (query.type === 'song') {
            const song = await neteaseMusic.getSong(query.id)
            title = `${song.title} - ${song.artist}`
            sharePic = song.pic_url
            musicInfo = {
                songs: [song]
            }
        } else if (query.type === 'album') {
            musicInfo = await neteaseMusic.getAlbum(query.id)
            title = `${musicInfo.albumName} - ${musicInfo.artist}`
            sharePic = musicInfo.pic_url
        } else if (query.type === 'playlist') {
            musicInfo = await neteaseMusic.getPlaylist(query.id)
            title = `${musicInfo.name}`
            sharePic = musicInfo.pic_url
        } else if (query.type === 'radio') {
            musicInfo = await neteaseMusic.getRadio(query.id)
            title = `${musicInfo.songs[0].artist}`
            sharePic = musicInfo.songs[0].pic_url
        } else if (query.type === 'mv') {
            musicInfo = await neteaseMusic.getMV(query.id)
            title = musicInfo.title
            sharePic = musicInfo.pic_url
        }
        
        await ctx.render('play', {
            title,
            flag: 'play',
            type: query.type,
            musicInfo: musicInfo,
            sharePic,
            navs: [],
            feData: musicInfo
        })
    }
}
