import Router from "koa-router"
import { removeSkillController } from "../../controllers"

export default function deleteSkillRoute (router: Router) {
  router.delete('/user/:userId/skill', ctx => {
    const { userId } = ctx.params
    const skillsToDelete = ctx.request.body
    const { response, status } = removeSkillController({userId, skillsToDelete})
    ctx.body = response
    ctx.status = status
  })
}