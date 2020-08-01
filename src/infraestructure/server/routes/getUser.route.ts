import Router from "koa-router";
import { getUserByIdController } from "../../controllers";

export default function getUserRoute (router: Router) {
  router.get('/user/:id', ctx => {
    const { id }= ctx.params;
    const {response, status} = getUserByIdController(id);
    console.log("User", response);
  
    ctx.response.status = status;
    ctx.response.body = response;
  })
}