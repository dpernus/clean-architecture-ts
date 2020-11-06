import Router from 'koa-router'
import { getUserByIdController } from '../../controllers'

export default function getUserRoute(router: Router): void {
  router.get('/user/:id', async (ctx) => {
    const { id } = ctx.params
    const { response, status } = await getUserByIdController(id)

    ctx.response.status = status
    ctx.response.body = response
  })
}
