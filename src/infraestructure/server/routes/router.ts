import Router from 'koa-router';

import {
  getUserByIdController,
  createUserController,
  addJobController
} from "./../../controllers";

const router = new Router();

//TODO: add joi validation
router.post('/user', ctx => {
  const userInfo = ctx.request.body;
  const userId = createUserController(userInfo);
  console.log("UserId:", userId);

  ctx.response.status = 200
  ctx.body = { userId }
})

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