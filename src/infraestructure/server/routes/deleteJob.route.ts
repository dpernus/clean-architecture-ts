import Router from 'koa-router'
import { removeJobController } from '../../controllers'

export default function deleteJobRoute(router: Router): void {
  router.delete('/user/:id/job/:jobId', async (ctx) => {
    const { id: userId, jobId } = ctx.params
    const { response, status } = await removeJobController({ userId, date: jobId })
    ctx.body = response
    ctx.status = status
  })
}
