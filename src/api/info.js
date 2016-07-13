import Router from 'koa-router'
import mongoose from 'mongoose'
import util from 'util'
import path from 'path'
import fs from 'fs'
import superagent from 'superagent'
import asyncBusboy from 'async-busboy'
import config from '../config'
import neteaseMusic from '../services/netease_music'

const router = Router()

router.post('/upload', async (ctx, next)=> {
    const formData = await asyncBusboy(ctx.req)
    const file = formData.files[0]
    const filename = +new Date() + file.filename
    fs.rename(file.path, config.uploadPath + '/img/' + filename)
    Util.resJson(ctx.response, {
        link: '/upload/img/' + filename, 
        // form: retForm
    })
})

router.get('/song/:id', async (ctx, next)=> {
    Util.resJson(ctx.response, await neteaseMusic.getSong(ctx.params.id))
})

router.post('/search', async (ctx, next)=> {
    Util.resJson(ctx.response, await neteaseMusic.search(ctx.request.body.key))
})

export default router

