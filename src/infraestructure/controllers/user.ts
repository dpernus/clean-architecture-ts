import { makeInMemoryUserRepository } from "./../repositories/inMemoryUser";
import { makeUserCreator } from "../../domain/application/createUser";
import { makeGetUserById } from "./../../domain/application/getUserById";
import { User } from "../../domain/entities/user";
import { makeJobAdder } from "../../domain/application/addJob";
interface UserInput {
  age: number;
  name: string;
  email: string;
  summary: string;
  keyTerms: string[];
}

interface JobInfo {
  date: string
  institutionName: string
  institutionDescription: string 
  institutionWeb: string
  charge: string
  achivements: string[]
}

const inMemoryUserRepository = makeInMemoryUserRepository();

export function createUserController (userInfo: UserInput) : number {
  const { age, name, email, summary, keyTerms } = userInfo
  const userCreator = makeUserCreator(inMemoryUserRepository);
  return userCreator(age, name, email, summary, keyTerms);
}

export function getUserByIdController (id: string) : User {
  const getUserById = makeGetUserById(inMemoryUserRepository);
  return getUserById(parseInt(id, 10));
}

export function addJobController (userId: number, jobInfo: JobInfo) {
  const addJob = makeJobAdder(inMemoryUserRepository);
  const { date, institutionName, institutionDescription, institutionWeb, charge, achivements } = jobInfo
  return addJob(userId, date, institutionName, institutionDescription, institutionWeb, charge, achivements)
}