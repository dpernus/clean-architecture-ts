import Router from 'koa-router'
import Joi from '@hapi/joi'
import { addSkillController } from '../../controllers'

const skillsSchema = Joi.object({
  userId: Joi.number().required(),
  skills: Joi.object().required(),
})

export default function addSkillRoute(router: Router): void {
  router.post('/user/skills', (ctx) => {
    const validation = skillsSchema.validate(ctx.request.body)

    if (validation.error !== undefined) {
      const message = `Request for add skills fail. ${validation.error.message}`
      console.log(message)
      ctx.status = 400
      ctx.body = { errorCode: 'INPUT_VALIDATION', message }
      return
    }

    const { response, status } = addSkillController(validation.value)
    ctx.body = response
    ctx.status = status
  })
}
