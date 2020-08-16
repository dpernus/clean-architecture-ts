import { removeEducationController } from "../../controllers"
import Router from "koa-router"

export default function deleteEducationEventRoute (router: Router) {
  router.delete('/user/:id/education/:courseDate', ctx => {
    const { id: userId, courseDate } = ctx.params
    const { response, status } = removeEducationController({userId, courseDate})
    ctx.body = response
    ctx.status = status
  })
}