import Router from 'koa-router'
import mongoose from 'mongoose'
import util from 'util'
import path from 'path'
import fs from 'fs'
import querystring from 'querystring'
import superagent from 'superagent'
import asyncBusboy from 'async-busboy'
import config from '../config'
import Util from '../util'

const router = Router()

const neteaseHymn = `
    player's Game Over,
    u can abandon.
    u get pissed,
    get pissed,
    Hallelujah my King!
    errr oh! fuck ohhh!!!!
    `

router.post('/upload', async (ctx, next)=> {
    const formData = await asyncBusboy(ctx.req)
    console.log('======= formData: ', formData)
    const file = formData.files[0]
    const filename = +new Date() + file.filename
    fs.rename(file.path, config.uploadPath + '/img/' + filename)
    Util.resJson(ctx.response, {
        link: '/upload/img/' + filename, 
        // form: retForm
    })
})

router.get('/song/:id', async (ctx, next)=> {
    let j = await superagent.get(`http://music.163.com/api/song/detail/?id=${ctx.params.id}
        &ids=[${ctx.params.id}]&csrf_token=`)
        .set('Referer', 'http://music.163.com/')
    j = JSON.parse(j.res.text)
    const songInfo = getSongInfo(j['songs'][0])
    console.log(songInfo)
    Util.resJson(ctx.response, songInfo)
})

router.post('/search', async (ctx, next)=> {
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
})

function encryptedId(dfsId) {
    //const x = neteaseHymn.split(/\s+/).map(str => str.charCodeAt(0))
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

export default router

