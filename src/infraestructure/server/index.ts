import Koa from 'koa'
import cors from '@koa/cors'
import koaLogger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import router from './routes/router'

export function runServer(port: number): void {
  const app = new Koa()
  app.use(bodyParser())
  app.use(cors())
  app.use(koaLogger())

  app.use(router.routes())
  app.listen(port)
}
