import Router from 'koa-router';

import { makeInMemoryUserRepository } from "./../../repositories/inMemoryUser";
import { makeUserSaver } from "./../../../domain/application/saveUser";
import { makeGetUserById } from "./../../../domain/application/getUserById";

import {
  getUserByIdController,
  saveUserController
} from "./../../controllers/user";

const router = new Router();
const inMemoryUserRepository = makeInMemoryUserRepository();

//TODO: add joi validation
router.post('/user', ctx => {
  const userInfo = ctx.request.body;
  const userSaver = makeUserSaver(inMemoryUserRepository);
  const userId = saveUserController(userInfo, userSaver);
  console.log("UserId:", userId);

  ctx.response.status = 200
  ctx.body = { userId }
})

router.get('/user/:id', ctx => {
  const { id }= ctx.params;
  const getUser = makeGetUserById(inMemoryUserRepository);
  const user = getUserByIdController(id, getUser);
  console.log("User", user);

  ctx.response.status = 200;
  ctx.response.body = user;
})

export default router;