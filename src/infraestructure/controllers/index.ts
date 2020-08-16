import { makeInMemoryUserRepository } from "./../repositories/inMemoryUser";

import { makeUserCreator } from "../../domain/application/createUser";
import { makeGetUserById } from "./../../domain/application/getUserById";
import { makeJobAdder } from "../../domain/application/addJob";
import { makeJobRemover } from "../../domain/application/removeJob";

import { makeCreateUserController, makeGetUserByIdController } from './user.controller'
import { makeAddJobController, makeRemoveJobController } from './job.controller'
import { makeEducationAdder } from "../../domain/application/addEducationEvent";
import { makeAddEducationController, makeRemoveEducationController } from "./education.controller";
import { makeEducationRemover } from "../../domain/application/removeEducationEvent";
import { makeSkillAdder } from "../../domain/application/addSkill";
import { makeAddSkillController } from "./skill.controller";
 
const inMemoryUserRepository = makeInMemoryUserRepository();

const userCreator = makeUserCreator(inMemoryUserRepository);
export const createUserController = makeCreateUserController(userCreator)

const getUserById = makeGetUserById(inMemoryUserRepository)
export const getUserByIdController = makeGetUserByIdController(getUserById)

const addJob = makeJobAdder(inMemoryUserRepository);
export const addJobController = makeAddJobController(addJob)

const removeJob = makeJobRemover(inMemoryUserRepository)
export const removeJobController = makeRemoveJobController(removeJob)

const addEducation = makeEducationAdder(inMemoryUserRepository)
export const addEducationController = makeAddEducationController(addEducation)

const removeEducation = makeEducationRemover(inMemoryUserRepository)
export const removeEducationController = makeRemoveEducationController(removeEducation)

const addSkill = makeSkillAdder(inMemoryUserRepository)
export const addSkillController = makeAddSkillController(addSkill)