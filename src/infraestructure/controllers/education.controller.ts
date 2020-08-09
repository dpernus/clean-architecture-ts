import { EducationAdder } from '../../domain/application/addEducation'
import { User } from '../../domain/entities/user'
import { Controller } from './commons'

export interface EducationInfo {
  date: string
  title: string
  institutionName: string
  institutionDescription: string 
  institutionWeb?: string
  description?: string[]
}

export function makeAddEducationController (addEducation: EducationAdder) : Controller <{userId: number, educationInfo: EducationInfo}, User> {
  return ({userId, educationInfo}) => {
    const { date, title, institutionName, institutionDescription, institutionWeb, description } = educationInfo

    try{
      const userWithEducation = addEducation(userId, date, title, institutionName, institutionDescription, institutionWeb, description)
      return { response: userWithEducation, status: 200 }
    }catch({ message, code}) {
      return { response: { code, message }, status: code === 'USER_NOT_FOUND' ? 404 : 500} 
    }
  }
}