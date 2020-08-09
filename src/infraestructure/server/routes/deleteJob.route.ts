import Router from "koa-router";
import { deleteJobController } from "../../controllers";

export default function deleteJobRoute (router : Router) {
  router.delete('/user/:id/job/:jobId', ctx => {
    const { id: userId, jobId } = ctx.params
    const { response, status } = deleteJobController({userId, date: jobId})
    ctx.body = response
    ctx.status = status
  })
}