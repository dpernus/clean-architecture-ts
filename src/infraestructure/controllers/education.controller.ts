import { EducationAdder } from '../../domain/application/addEducationEvent'
import { User } from '../../domain/entities/user'
import { Controller } from './commons'
import { EducationRemover } from '../../domain/application/removeEducationEvent'

export interface EducationInfo {
  date: string
  title: string
  institutionName: string
  institutionDescription: string
  institutionWeb?: string
  description?: string[]
}

export function makeAddEducationController(
  addEducationEvent: EducationAdder,
): Controller<{ userId: number; educationInfo: EducationInfo }, User> {
  return async ({ userId, educationInfo }) => {
    const { date, title, institutionName, institutionDescription, institutionWeb, description } = educationInfo

    try {
      const userWithEducation = await addEducationEvent(
        userId,
        date,
        title,
        institutionName,
        institutionDescription,
        institutionWeb,
        description,
      )
      return { response: userWithEducation, status: 200 }
    } catch ({ message, code }) {
      return { response: { code, message }, status: code === 'USER_NOT_FOUND' ? 404 : 500 }
    }
  }
}

export function makeRemoveEducationController(
  removeEducacionEvent: EducationRemover,
): Controller<{ userId: number; courseDate: string }, User> {
  return async ({ userId, courseDate }) => {
    try {
      const userWithoutCourse = await removeEducacionEvent(userId, courseDate)
      return { response: userWithoutCourse, status: 200 }
    } catch ({ message, code }) {
      return { response: { code, message }, status: code.indexOf('_NOT_FOUND') !== -1 ? 404 : 500 }
    }
  }
}
