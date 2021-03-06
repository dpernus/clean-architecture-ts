import { UserRepository } from './../interfaces'
import { User, Institution, Job, createInstitution } from '../entities/user'
import { makeError } from '../../utils/errors'

export type JobAdder = (
  userId: number,
  date: string,
  institutionName: string,
  institutionDescription: string,
  institutionWeb: string | undefined,
  charge: string,
  achivements: string[],
) => Promise<User>

function createJob(date: string, institution: Institution, charge: string, achivements: string[]): Job {
  const isValidDate = date.length > 4
  const isValidCharge = charge.length > 10
  const isValidAchivements = achivements.length !== 0

  const isValidJob = isValidDate && isValidCharge && isValidAchivements
  if (!isValidJob) {
    throw makeError('INVALID_DATA', 'Invalid data for create Job')
  }

  return { date, institution, charge, achivements }
}

export function makeJobAdder(userRepository: UserRepository): JobAdder {
  return async (userId, date, institutionName, institutionDescription, institutionWeb, charge, achivements) => {
    const user = await userRepository.getUser(userId)

    if (user === null) {
      throw makeError('USER_NOT_FOUND', `User with id ${userId} not found`)
    }

    const institution = createInstitution(institutionName, institutionDescription, institutionWeb)
    const job = createJob(date, institution, charge, achivements)

    user.workExperience.push(job)
    await userRepository.updateUser(user)
    return user
  }
}
