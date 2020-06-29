import { makeInMemoryUserRepository } from "./infraestructure/repositories/inMemoryUser";
import { makeUserSaver } from "./domain/application/saveUser";
import { makeGetUserById } from "./domain/application/getUserById";

import {
  getUserByIdController,
  saveUserController
} from "./infraestructure/controllers/user";

const inMemoryUserRepository = makeInMemoryUserRepository();
const userSaver = makeUserSaver(inMemoryUserRepository);
const getUser = makeGetUserById(inMemoryUserRepository);

const userId = saveUserController({ age: 31, name: "Diana" }, userSaver);
const userId2 = saveUserController({ age: 32, name: "Nene" }, userSaver);

console.log("UserId:", userId, userId2);

const user = getUserByIdController(userId2.toString(), getUser);
console.log("User", user);

// @ts-ignore
document.getElementById("app").innerHTML = `
<h1>Hello Parcel!</h1>
<div>
  Look
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>
  for more info about Parcel.
</div>
`;
