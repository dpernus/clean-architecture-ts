import { JobAdder } from './../../domain/application/addJob'

export interface JobInfo {
  date: string
  institutionName: string
  institutionDescription: string 
  institutionWeb?: string
  charge: string
  achivements: string[]
}

export function makeAddJobController (addJob: JobAdder) {
  return (userId: number, jobInfo: JobInfo) => {
    const { date, institutionName, institutionDescription, institutionWeb, charge, achivements } = jobInfo
    return addJob(userId, date, institutionName, institutionDescription, institutionWeb, charge, achivements)
  }
}