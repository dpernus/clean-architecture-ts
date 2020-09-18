import { removeEducationController } from '../../controllers'
import Router from 'koa-router'

export default function deleteEducationEventRoute(router: Router): void {
  router.delete('/user/:id/education/:courseDate', async (ctx) => {
    const { id: userId, courseDate } = ctx.params
    const { response, status } = await removeEducationController({ userId, courseDate })
    ctx.body = response
    ctx.status = status
  })
}
