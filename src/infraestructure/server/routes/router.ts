import Router from 'koa-router';
import createUserRoute from './createUser.route'
import addJobRoute from './addJob.route';
import getUserRoute from './getUser.route';
import deleteJobRoute from './deleteJob.route';

const router = new Router();

router.get('/health', ctx => {
  ctx.body = 'OK'
  ctx.status = 200
})

createUserRoute(router)
getUserRoute(router)
addJobRoute(router)
deleteJobRoute(router)

export default router;