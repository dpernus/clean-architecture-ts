import { makeInMemoryUserRepository } from "./../repositories/inMemoryUser";

import { makeUserCreator } from "../../domain/application/createUser";
import { makeGetUserById } from "./../../domain/application/getUserById";
import { makeJobAdder } from "../../domain/application/addJob";
import { makeJobEliminator } from "../../domain/application/deleteJob";

import { makeCreateUserController, makeGetUserByIdController } from './user.controller'
import { makeAddJobController, makeDeleteJobController } from './job.controller'
import { makeEducationAdder } from "../../domain/application/addEducation";
import { makeAddEducationController } from "./education.controller";
 
const inMemoryUserRepository = makeInMemoryUserRepository();

const userCreator = makeUserCreator(inMemoryUserRepository);
export const createUserController = makeCreateUserController(userCreator)

const getUserById = makeGetUserById(inMemoryUserRepository)
export const getUserByIdController = makeGetUserByIdController(getUserById)

const addJob = makeJobAdder(inMemoryUserRepository);
export const addJobController = makeAddJobController(addJob)

const deleteJob = makeJobEliminator(inMemoryUserRepository)
export const deleteJobController = makeDeleteJobController(deleteJob)

const addEducation = makeEducationAdder(inMemoryUserRepository)
export const addEducationController = makeAddEducationController(addEducation)