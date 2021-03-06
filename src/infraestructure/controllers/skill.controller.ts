import { SkillAdder } from '../../domain/application/addSkill'
import { Skills, User } from '../../domain/entities/user'
import { Controller } from './commons'
import { SkillsRemover } from '../../domain/application/removeSkills'

export function makeAddSkillController(addSkill: SkillAdder): Controller<{ userId: number; skills: Skills }, User> {
  return async ({ userId, skills }) => {
    try {
      const userWithSkills = await addSkill(userId, skills)
      return { response: userWithSkills, status: 200 }
    } catch ({ code, message }) {
      return { response: { code, message }, status: code === 'USER_NOT_FOUND' ? 404 : 500 }
    }
  }
}

export function makeRemoveSkillController(
  removeSkill: SkillsRemover,
): Controller<{ userId: number; skillsToDelete: Skills }, User> {
  return async ({ userId, skillsToDelete }) => {
    try {
      const userWithoutSkill = await removeSkill(userId, skillsToDelete)
      return { response: userWithoutSkill, status: 200 }
    } catch ({ code, message }) {
      return { response: { code, message }, status: code.indexOf('_NOT_FOUND') !== -1 ? 404 : 500 }
    }
  }
}
