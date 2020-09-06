import { JobAdder } from '../../domain/application/addJob'
import { User } from '../../domain/entities/user'
import { Controller } from './commons'
import { JobRemover } from '../../domain/application/removeJob'

export interface JobInfo {
  date: string
  institutionName: string
  institutionDescription: string
  institutionWeb?: string
  charge: string
  achivements: string[]
}

export function makeAddJobController(addJob: JobAdder): Controller<{ userId: number; jobInfo: JobInfo }, User> {
  return ({ userId, jobInfo }) => {
    const { date, institutionName, institutionDescription, institutionWeb, charge, achivements } = jobInfo

    try {
      const userWithJob = addJob(
        userId,
        date,
        institutionName,
        institutionDescription,
        institutionWeb,
        charge,
        achivements,
      )
      return { response: userWithJob, status: 200 }
    } catch ({ message, code }) {
      return { response: { code, message }, status: code === 'USER_NOT_FOUND' ? 404 : 500 }
    }
  }
}

export function makeRemoveJobController(removeJob: JobRemover): Controller<{ userId: number; date: string }, User> {
  return ({ userId, date }) => {
    try {
      const userWithoutJob = removeJob(userId, date)
      return { response: userWithoutJob, status: 200 }
    } catch ({ message, code }) {
      return { response: { code, message }, status: code === 'JOB_NOT_FOUND' ? 404 : 500 }
    }
  }
}
