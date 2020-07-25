import { makeInMemoryUserRepository } from "./../repositories/inMemoryUser";

import { makeUserCreator } from "../../domain/application/createUser";
import { makeGetUserById } from "./../../domain/application/getUserById";
import { makeJobAdder } from "../../domain/application/addJob";

import { makeCreateUserController, makeGetUserByIdController } from './user.controller'
import { makeAddJobController } from './job'
 
const inMemoryUserRepository = makeInMemoryUserRepository();

const userCreator = makeUserCreator(inMemoryUserRepository);
export const createUserController = makeCreateUserController(userCreator)

const getUserById = makeGetUserById(inMemoryUserRepository)
export const getUserByIdController = makeGetUserByIdController(getUserById)

const addJob = makeJobAdder(inMemoryUserRepository);
export const addJobController = makeAddJobController(addJob)