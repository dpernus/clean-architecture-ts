import Router from 'koa-router';
import createUserRoute from './createUser.route'
import addJobRoute from './addJob.route';
import getUserRoute from './getUser.route';

const router = new Router();

createUserRoute(router)
getUserRoute(router)
addJobRoute(router)

export default router;