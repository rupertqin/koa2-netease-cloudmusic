import Router from 'koa-router'
import mongoose from 'mongoose'
import util from 'util'
import path from 'path'
import fs from 'fs'
import querystring from 'querystring'
import superagent from 'superagent'
import asyncBusboy from 'async-busboy'
import config from '../config'

const router = Router()

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

export default router

