import Router from 'koa-router'
import { removeSkillController } from '../../controllers'

export default function deleteSkillRoute(router: Router): void {
  router.delete('/user/:userId/skill', async (ctx) => {
    const { userId } = ctx.params
    const skillsToDelete = ctx.request.body
    const { response, status } = await removeSkillController({ userId, skillsToDelete })
    ctx.body = response
    ctx.status = status
  })
}
