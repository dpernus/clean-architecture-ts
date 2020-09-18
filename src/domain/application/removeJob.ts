import { UserRepository } from '../interfaces'
import { User } from '../entities/user'
import { makeError } from '../../utils/errors'

export type JobRemover = (userId: number, date: string) => Promise<User>

export function makeJobRemover(userRepository: UserRepository): JobRemover {
  return async (userId, date) => {
    const user = await userRepository.getUser(userId)

    if (user === null) {
      throw makeError('USER_NOT_FOUND', `User with id ${userId} not found`)
    }

    const jobIndex = user.workExperience.findIndex((job) => job.date.substr(0, 4) === date)

    if (jobIndex === -1) {
      throw makeError('JOB_NOT_FOUND', `There is no job for date ${date}`)
    }

    user.workExperience.splice(jobIndex, 1)
    await userRepository.updateUser(user)
    return user
  }
}
