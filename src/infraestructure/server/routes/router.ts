import Router from 'koa-router';
import createUserRoute from './createUser.route'
import addJobRoute from './addJob.route';
import getUserRoute from './getUser.route';
import deleteJobRoute from './deleteJob.route';
import addEducationRoute from './addEducation.route';
import deleteEducationEventRoute from './deleteEducationEvent.route';
import addSkillRoute from './addSkill.route'

const router = new Router();

router.get('/health', ctx => {
  ctx.body = 'OK'
  ctx.status = 200
})

createUserRoute(router)
getUserRoute(router)

addJobRoute(router)
deleteJobRoute(router)

addEducationRoute(router)
deleteEducationEventRoute(router)

addSkillRoute(router)

export default router;