import Router from 'koa-router'
import createUserRoute from './createUser.route'
import addJobRoute from './addJob.route'
import getUserRoute from './getUser.route'
import getUsersRoute from './getUsers.route'
import deleteJobRoute from './deleteJob.route'
import addEducationRoute from './addEducation.route'
import deleteEducationEventRoute from './deleteEducationEvent.route'
import addSkillRoute from './addSkill.route'
import deleteSkillsRoute from './deleteSkills.route'

const router = new Router()

router.get('/health', (ctx) => {
  ctx.body = 'OK'
  ctx.status = 200
})

createUserRoute(router)
getUserRoute(router)
getUsersRoute(router)

addJobRoute(router)
deleteJobRoute(router)

addEducationRoute(router)
deleteEducationEventRoute(router)

addSkillRoute(router)
deleteSkillsRoute(router)

export default router
