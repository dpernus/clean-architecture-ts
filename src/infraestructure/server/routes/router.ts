import Router from 'koa-router';
import createUserRoute from './createUser.route'

import {
  getUserByIdController,
  addJobController
} from "./../../controllers";

const router = new Router();

createUserRoute(router)

router.get('/user/:id', ctx => {
  const { id }= ctx.params;
  const user = getUserByIdController(id);
  console.log("User", user);

  ctx.response.status = 200;
  ctx.response.body = user;
})

router.post('/user/job', ctx => {
  const { userId, jobInfo } = ctx.request.body
  const userWithJob = addJobController(userId, jobInfo)
  
  ctx.response.status = 200
  ctx.response.body = userWithJob
})

export default router;