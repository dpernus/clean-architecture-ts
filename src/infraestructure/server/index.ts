import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import router from './routes/router'

export function runServer(port: number): void {
  const app = new Koa()
  app.use(bodyParser())

  app.use(router.routes())
  app.listen(port)
}
