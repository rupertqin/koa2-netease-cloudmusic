import mongoose from 'mongoose'
import util from 'util'
import querystring from 'querystring'
import superagent from 'superagent'
import config from '../config'



const neteaseMusic = {
    getSong: async (id)=> {
        let j = await superagent.get(`http://music.163.com/api/song/detail/?id=${id}
            &ids=[${id}]&csrf_token=`)
            .set('Referer', 'http://music.163.com/')
        j = JSON.parse(j.res.text)
        return getSongInfo(j['songs'][0])
    },

    search: async (ctx)=> {
        const params = {
            type: 1,
            offset: 0,
            limit: 20,
            sub: false,
            s: ctx.request.body.key
        }
        const sd = await superagent.post(`http://music.163.com/api/search/get/?${querystring.stringify(params)}`)
            .set('Referer', 'http://music.163.com/')
        Util.resJson(ctx.response, JSON.parse(sd.res.text))
    }
}

function encryptedId(dfsId) {
    const byte1 = '3go8&$8*3*3h0k(2)2'
    const byte2 = dfsId.toString()
    const byte1_len = byte1.length
    const arr = byte2.split('').map((c,i) => {
        return byte2.charCodeAt(i) ^ byte1[i%byte1_len].charCodeAt(0)
    })
    const newByte2 = String.fromCharCode.apply({}, arr)
    return Util.md5(newByte2, 'base64')
}

function makeUrl(songNet, dfsId) {
    const encId = encryptedId(dfsId)
    return `http://${songNet}/${encId}/${dfsId}.mp3`
}

function getSongInfo(song) {
    let songNet = song.mp3Url.split('/')[2]
    return {
        url_best: makeUrl(songNet, song.hMusic.dfsId) || song.mp3Url || makeUrl(songNet, song.bMusic.dfsId),
        title: song['name'],
        album: song['album']['name'],
        pic_url: song['album']['picUrl'],
        artist: song['artists'][0]['name']
    }
}

export default neteaseMusic 
