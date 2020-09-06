import Router from 'koa-router'
import Joi from '@hapi/joi'
import { EducationInfo } from '../../controllers/education.controller'
import { addEducationController } from '../../controllers'

const educationSchema = Joi.object<{ userId: number; educationInfo: EducationInfo }>({
  userId: Joi.number().integer().required(),
  educationInfo: Joi.object({
    date: Joi.string().required(),
    title: Joi.string().required(),
    institutionName: Joi.string().required(),
    institutionDescription: Joi.string(),
    institutionWeb: Joi.string(),
    description: Joi.array().items(Joi.string()),
  }),
})

export default function addEducationRoute(router: Router): void {
  router.post('/user/education', (ctx) => {
    const validation = educationSchema.validate(ctx.request.body)

    if (validation.error !== undefined) {
      const message = `Request for add education fail. ${validation.error.message}`
      console.log(message)
      ctx.status = 400
      ctx.body = { errorCode: 'INPUT_VALIDATION', message }
      return
    }

    const { response, status } = addEducationController(validation.value)
    ctx.body = response
    ctx.status = status
  })
}
