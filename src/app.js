import http from 'http'
import Koa from 'koa'
import path from 'path'
import views from 'koa-views'
import convert from 'koa-convert'
import json from 'koa-json'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import koaStatic from 'koa-static-plus'
import koaOnError from 'koa-onerror'
import config from './config'
import router from './routes'
import Util from './util'
import './models'
import Session from './libs/session'

Util.F = Util.filters
global.U = global.Util = Util
global.Session = Session


const app = new Koa()


// overrite app use
const _use = app.use
app.use = x => _use.call(app, convert(x))


// middlewares
app.use(bodyparser())
app.use(json())
app.use(logger())

// static
app.use(koaStatic(path.join(__dirname, '../public'), {
  pathPrefix: ''
}))

// views
app.use(views(path.join(__dirname, '../views'), {
  extension: 'ejs'
}))

// 500 error
koaOnError(app, {
  template: 'views/500.ejs'
})

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



function modernMiddleware(ctx, next) {
  console.log('====== modernMiddleware ctx: ', ctx.cookies.get('SID'),  Object.keys(ctx.req.headers))
  return Sess(ctx, next)
  
  
}

app.use(Session.session)

// response
app.use(router.routes(), router.allowedMethods())


// 404
app.use(async (ctx) => {
  ctx.status = 404
  await ctx.render('404')
})

// error logger
app.on('error', async (err, ctx) => {
  console.log('error occured:', err)
})

const port = parseInt(config.port || '3000')
const server = http.createServer(app.callback())

server.listen(port)
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(port + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(port + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
})
server.on('listening', () => {
  console.log('Listening on port: %d', port)
})

export default app
