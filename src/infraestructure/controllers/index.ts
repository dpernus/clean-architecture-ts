//import { makeInMemoryUserRepository } from './../repositories/inMemoryUser'
import makeMongoUserRepository from '../repositories/mongo'

import { makeUserCreator } from '../../domain/application/createUser'
import { makeGetUserById } from './../../domain/application/getUserById'
import { makeGetUsers } from '../../domain/application/getUsers'
import { makeJobAdder } from '../../domain/application/addJob'
import { makeJobRemover } from '../../domain/application/removeJob'

import { makeCreateUserController, makeGetUserByIdController, makeGetUsersController } from './user.controller'
import { makeAddJobController, makeRemoveJobController } from './job.controller'
import { makeEducationAdder } from '../../domain/application/addEducationEvent'
import { makeAddEducationController, makeRemoveEducationController } from './education.controller'
import { makeEducationRemover } from '../../domain/application/removeEducationEvent'
import { makeSkillAdder } from '../../domain/application/addSkill'
import { makeAddSkillController, makeRemoveSkillController } from './skill.controller'
import { makeSkillsRemover } from '../../domain/application/removeSkills'

//const inMemoryUserRepository = makeInMemoryUserRepository()
const mongoDBUserRepository = makeMongoUserRepository()

const userCreator = makeUserCreator(mongoDBUserRepository)
export const createUserController = makeCreateUserController(userCreator)

const getUserById = makeGetUserById(mongoDBUserRepository)
export const getUserByIdController = makeGetUserByIdController(getUserById)

const getUsers = makeGetUsers(mongoDBUserRepository)
export const getUsersController = makeGetUsersController(getUsers)

const addJob = makeJobAdder(mongoDBUserRepository)
export const addJobController = makeAddJobController(addJob)

const removeJob = makeJobRemover(mongoDBUserRepository)
export const removeJobController = makeRemoveJobController(removeJob)

const addEducation = makeEducationAdder(mongoDBUserRepository)
export const addEducationController = makeAddEducationController(addEducation)

const removeEducation = makeEducationRemover(mongoDBUserRepository)
export const removeEducationController = makeRemoveEducationController(removeEducation)

const addSkill = makeSkillAdder(mongoDBUserRepository)
export const addSkillController = makeAddSkillController(addSkill)

const removeSkill = makeSkillsRemover(mongoDBUserRepository)
export const removeSkillController = makeRemoveSkillController(removeSkill)
