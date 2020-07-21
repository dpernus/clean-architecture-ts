import { UserRepository } from './../interfaces'
import { User, Institution, Job } from '../entities/user';

export type JobAdder = (userId: number, date: string, institutionName: string, institutionDescription: string, institutionWeb: string, charge: string, achivements: string[]) => User

function createInstitution (name: string, description: string, web: string) : Institution {
  const isValidName = name !== ''
  const isValidDescription =  description.length > 10

  const isValidInstitution = isValidName && isValidDescription
  if(!isValidInstitution) {
    throw new Error ('Invalid data for create Institution')
  }

  return {name, description, web}
}

function createJob (date: string, institution: Institution, charge: string, achivements: string[]) : Job {
  const isValidDate = date.length > 4
  const isValidCharge = charge.length > 10 
  const isValidAchivements = achivements.length !== 0

  const isValidJob = isValidDate  && isValidCharge && isValidAchivements
  if(!isValidJob) {
    throw new Error ('Invalid data for create Job')
  }

  return {date, institution, charge, achivements}
}

export function makeJobAdder (userRepository: UserRepository) : JobAdder {
  return (userId, date, institutionName, institutionDescription, institutionWeb, charge, achivements) => {
    const user = userRepository.getUser(userId)
    const institution = createInstitution(institutionName, institutionDescription, institutionWeb)
    const job = createJob(date, institution, charge, achivements)

    user.workExperience.push(job)
    userRepository.updateUser(user)
    return user
  }
}