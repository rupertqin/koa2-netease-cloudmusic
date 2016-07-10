import mongoose from 'mongoose'
import util from 'util'
import qs from 'querystring'
import superagentDefaults from 'superagent-defaults'
import superagent from 'superagent'
import config from '../config'

// default Heade
var neteaseRequest = superagentDefaults()
neteaseRequest.set('Referer', 'http://music.163.com/')


const neteaseMusic = {
    getSong: async (id)=> {
        let j = await neteaseRequest.get(`http://music.163.com/api/song/detail/?id=${id}&ids=[${id}]&csrf_token=`)
        j = JSON.parse(j.res.text)
        return getSongInfo(j['songs'][0])
    },

    getAlbum: async (id)=> {
        let ret = {}
        let j = await neteaseRequest.get(`http://music.163.com/api/album/${id}?id=${id}&csrf_token=`)
        j = JSON.parse(j.res.text)
        ret.artist = j.album.artists[0].name
        ret.albumName = j.album.name
        ret.picUrl = j.album.picUrl
        ret.songs = j.album.songs.map(song => getSongInfo(song))
        return ret
    },

    getPlaylist: async (id)=> {
        let ret = {}
        let j = await neteaseRequest.get(`http://music.163.com/api/playlist/detail${id}?id=${id}&csrf_token=`)
        j = JSON.parse(j.res.text)
        ret.playlist = j.result.name
        ret.picUrl = j.result.coverImgUrl
        ret.songs = j.result.tracks.map(song => getSongInfo(song))
        return ret
    },

    search: async (key)=> {
        const songParams = { type: 1, offset: 0, limit: 50, sub: false, s: key }
        const albumParams = { type: 10, offset: 0, limit: 50, sub: false, s: key }
        const playlistParams = { type: 1000, offset: 0, limit: 50, sub: false, s: key }
        const mvParams = { type: 1004, offset: 0, limit: 50, sub: false, s: key }
        const radioParams = { type: 1009, offset: 0, limit: 50, sub: false, s: key }

        const arr = await Promise.all([
            neteaseRequest.post(`http://music.163.com/api/search/get/?${qs.stringify(songParams)}`),
            neteaseRequest.post(`http://music.163.com/api/search/get/?${qs.stringify(albumParams)}`),
            neteaseRequest.post(`http://music.163.com/api/search/get/?${qs.stringify(playlistParams)}`),
            neteaseRequest.post(`http://music.163.com/api/search/get/?${qs.stringify(mvParams)}`),
            neteaseRequest.post(`http://music.163.com/api/search/get/?${qs.stringify(radioParams)}`)
        ])

        return {
            songs: JSON.parse(arr[0].res.text).result.songs,
            albums: JSON.parse(arr[1].res.text).result.albums,
            playlists: JSON.parse(arr[2].res.text).result.playlists,
            mvs: JSON.parse(arr[3].res.text).result.mvs,
            radios: JSON.parse(arr[4].res.text).result.djprograms,
        }
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
