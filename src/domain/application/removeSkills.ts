import { UserRepository } from '../interfaces'
import { User, Skills } from '../entities/user'
import { makeError } from '../../utils/errors'

export type SkillsRemover = (userId: number, skills: Skills) => Promise<User>

export function makeSkillsRemover(userRepository: UserRepository): SkillsRemover {
  return async (userId, skillsToDelete) => {
    const user = await userRepository.getUser(userId)

    if (user === null) {
      throw makeError('USER_NOT_FOUND', `User with id ${userId} not found`)
    }

    Object.keys(skillsToDelete).forEach((skillName) => {
      if (user.skills[skillName] === undefined) {
        throw makeError('SKILL_NOT_FOUND', `Skill ${skillName} not found in user ${userId}`)
      }

      user.skills[skillName] = user.skills[skillName].filter((skill) => skillsToDelete[skillName].indexOf(skill) === -1)
    })

    await userRepository.updateUser(user)
    return user
  }
}
