import Router from 'koa-router'
import { getUsersController } from '../../controllers'

export default function getUsersRoute(router: Router): void {
  router.get('/users', async (ctx) => {
    const { response, status } = await getUsersController()

    ctx.response.status = status
    ctx.response.body = response
  })
}
