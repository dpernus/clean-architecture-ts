import { UserRepository } from '../interfaces'
import { User, Skills } from '../entities/user'
import { makeError } from '../../utils/errors'

export type SkillAdder = (userId: number, skills: Skills) => Promise<User>

export function makeSkillAdder(userRepository: UserRepository): SkillAdder {
  return async (userId, skills) => {
    const user = await userRepository.getUser(userId)

    if (user === null) {
      throw makeError('USER_NOT_FOUND', `User with id ${userId} not found`)
    }

    Object.keys(skills).forEach((skillName) => {
      user.skills[skillName] =
        user.skills[skillName] != null
          ? [...new Set([...user.skills[skillName], ...skills[skillName]])]
          : skills[skillName]
    })

    await userRepository.updateUser(user)
    return user
  }
}
