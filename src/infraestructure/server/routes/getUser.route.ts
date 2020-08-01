import Router from "koa-router";
import { getUserByIdController } from "../../controllers";

export default function getUserRoute (router: Router) {
  router.get('/user/:id', ctx => {
    const { id }= ctx.params;
    const user = getUserByIdController(id);
    console.log("User", user);
  
    ctx.response.status = 200;
    ctx.response.body = user;
  })
}