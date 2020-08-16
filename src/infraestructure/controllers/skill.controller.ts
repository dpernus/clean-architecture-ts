import { SkillAdder } from "../../domain/application/addSkill";
import { Skills, User } from '../../domain/entities/user';
import { Controller } from "./commons";

export function makeAddSkillController (addSkill : SkillAdder) : Controller <{userId: number, skills: Skills}, User> {
  return ({userId, skills}) => {
    try{
      const userWithSkills = addSkill(userId, skills)
      return { response: userWithSkills, status: 200}
    } catch ({code, message}) {
      return { response: {code, message}, status: code === ('USER_NOT_FOUND') ? 404 : 500}
    }
  }
}