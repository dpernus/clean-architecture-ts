import { UserRepository } from '../interfaces'
import { User } from '../entities/user'
import { makeError } from '../../utils/errors'

export type EducationRemover = (userId: number, date: string) => User

export function makeEducationRemover(userRepository: UserRepository): EducationRemover {
  return (userId, date) => {
    const user = userRepository.getUser(userId)

    if (user === null) {
      throw makeError('USER_NOT_FOUND', `User with id ${userId} not found`)
    }

    const courseIndex = user.education.findIndex((course) => course.date.split(' ')[1] === date)

    if (courseIndex === -1) {
      throw makeError('COURSE_NOT_FOUND', `There is no course for date ${date}`)
    }

    user.education.splice(courseIndex, 1)
    userRepository.updateUser(user)
    return user
  }
}
