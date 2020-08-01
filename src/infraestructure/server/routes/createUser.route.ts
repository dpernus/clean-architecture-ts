import Router from "koa-router";
import Joi from '@hapi/joi'
import { createUserController } from "../../controllers";
import { UserInput } from "../../controllers/user.controller";

const userSchema = Joi.object <UserInput> ({
  age: Joi.number().integer().required(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  summary: Joi.string().required(),
  keyTerms: Joi.array().items(Joi.string()).required()
})

export default function createUserRoute (router: Router) {
  router.post('/user', ctx => {
    const userInfo = ctx.request.body;

    const validation = userSchema.validate(userInfo)
    if(validation.error !== undefined) {
      const message = `Request for create user fail. Field ${validation.error?.message}`
      console.log(message)
      ctx.status = 400
      ctx.body = { errorCode: 'INPUT_VALIDATION', message: validation.error.message }
      return
    }

    const userId = createUserController(userInfo);
    console.log("UserId:", userId);
    ctx.status = 200
    ctx.body = { userId }
  })
}
