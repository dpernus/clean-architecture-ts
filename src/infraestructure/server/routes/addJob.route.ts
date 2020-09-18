import Router from 'koa-router'
import Joi from '@hapi/joi'
import { addJobController } from '../../controllers'
import { JobInfo } from '../../controllers/job.controller'

const jobSchema = Joi.object<{ userId: number; jobInfo: JobInfo }>({
  userId: Joi.number().integer().required(),
  jobInfo: Joi.object({
    date: Joi.string().required(),
    institutionName: Joi.string().required(),
    institutionDescription: Joi.string(),
    institutionWeb: Joi.string(),
    charge: Joi.string().required(),
    achivements: Joi.array().items(Joi.string()),
  }),
})

export default function addJobRoute(router: Router): void {
  router.post('/user/job', async (ctx) => {
    const validation = jobSchema.validate(ctx.request.body)

    if (validation.error !== undefined) {
      const message = `Request for add job fail. ${validation.error.message}`
      console.log(message)
      ctx.status = 400
      ctx.body = { errorCode: 'INPUT_VALIDATION', message: validation.error.message }
      return
    }

    const { response, status } = await addJobController(validation.value)

    ctx.body = response
    ctx.status = status
  })
}
