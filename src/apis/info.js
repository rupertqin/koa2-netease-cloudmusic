import Router from 'koa-router'
import mongoose from 'mongoose'
import util from 'util'
import path from 'path'
import fs from 'fs'
import asyncBusboy from 'async-busboy'
import config from '../config'
import Info from '../models/info'

const router = Router()

router.get('/info/navigator', async (ctx, next)=> {
    const navigator = await Info.findOne({key: 'navigator'})
    Util.resJson(ctx.response, navigator.data)
})

router.post('/info/navigator', async (ctx, next)=> {
    let navigator = await Info.find({key: 'navigator'})
    const sentData = ctx.request.body
    if (!Array.isArray(sentData)) {
        Util.resJson(ctx.response, 'error')
    } else {
        const savedData = await Info.update({key: 'navigator'}, {$set: {data: sentData}})
        Util.resJson(ctx.response, savedData)
    }
})

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

export default router

