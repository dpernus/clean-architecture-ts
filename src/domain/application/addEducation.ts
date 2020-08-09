import { UserRepository } from "../interfaces";
import { User, Course, createInstitution, Institution } from "../entities/user";
import { makeError } from "../../utils/errors";

export type EducationAdder = (userId: number, date: string, title: string, institutionName: string, institutionDescription: string, institutionWeb: string | undefined, description: string[] | undefined) => User

function createCourse (date: string, title: string, institution: Institution, description: string[] | undefined) : Course {
  const isValidDate = date.length > 4
  const isValidTitle = title.length > 10

  const isValidCourse = isValidDate && isValidTitle
  if(!isValidCourse) {
    throw makeError('INVALID_DATA', 'Invalid data for add education to user')
  }

  return { date, title, institution, description }
}

export function makeEducationAdder (userRepository: UserRepository) : EducationAdder {
  return (userId, date, title, institutionName, institutionDescription, institutionWeb, description) => {
    const user = userRepository.getUser(userId)

    if(user === null) {
      throw makeError('USER_NOT_FOUND', `User with id ${userId} not found`);
    }

    const institution = createInstitution(institutionName, institutionDescription, institutionWeb)
    const course = createCourse(date, title, institution, description)

    user.education?.push(course)
    userRepository.updateUser(user)
    return user
  }
}