import Router from 'koa-router'
import mongoose from 'mongoose'
import util from 'util'
import path from 'path'
import fs from 'fs'
import asyncBusboy from 'async-busboy'
import config from '../config'
import Article from '../models/article'

const router = Router()

router
    .get('/article', async (ctx, next)=> {
        const list = await Article.find({})
        Util.resJson(ctx.response, list)
    })
    .get('/article/:id', async (ctx, next)=> {
        const article = await Article.findOne({_id: ctx.params.id})
        Util.resJson(ctx.response, article)
    })
    .del('/article/:id', async (ctx, next)=> {
        const data = await Article.findOne({_id: ctx.params.id}).remove()
        Util.resJson(ctx.response, data)
    })
    .put('/article/:id', async (ctx, next)=> {
        const sentData = ctx.request.body
        sentData.update_at = Date.now()
        const savedData = await Article.update({_id: ctx.params.id}, sentData)
        Util.resJson(ctx.response, savedData)
    })
    .post('/article', async (ctx, next)=> {
        const sentData = ctx.request.body
        let article = new Article(sentData)
        const savedData = await article.save()
        Util.resJson(ctx.response, savedData)
    })

export default router

