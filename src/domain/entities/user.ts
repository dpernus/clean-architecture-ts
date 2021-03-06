import { makeError } from '../../utils/errors'

export interface Institution {
  name: string
  description: string
  web?: string
}

export interface Job {
  date: string
  institution: Institution
  charge: string
  achivements: string[]
}

export interface Course {
  date: string
  title: string
  institution: Institution
  description?: string[]
}

export type Skills = Record<string, string[]>

export interface User {
  id: number
  personalData: {
    name: string
    age: number
    email: string
    address?: string
    phone?: number
    social?: string
    git?: string
    picture?: string
  }
  summary: string
  keyTerms: string[]
  workExperience: Job[]
  education: Course[]
  skills: Skills
}

export function createInstitution(name: string, description: string, web: string | undefined): Institution {
  const isValidName = name !== ''
  const isValidDescription = description.length > 10

  const isValidInstitution = isValidName && isValidDescription
  if (!isValidInstitution) {
    throw makeError('INVALID_DATA', 'Invalid data for create Institution')
  }

  return { name, description, web }
}

export function createUser(
  age: number,
  name: string,
  email: string,
  address: string,
  social: string,
  git: string,
  picture: string = '',
  summary: string,
  keyTerms: string[],
  workExperience: Job[] = [],
  education: Course[] = [],
  skills: Skills = {},
  id: number | undefined = undefined,
): User {
  const isValidUser = (age: number, name: string, email: string, summary: string, keyTerms: string[]) =>
    isValidAge(age) && isValidName(name) && isValidEmail(email) && isValidSummary(summary) && isValidKeyTerms(keyTerms)

  const isValidAge = (age: number): boolean => age > 0
  const isValidName = (name: string): boolean => name !== ''
  const isValidEmail = (email: string): boolean =>
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    ) !== null

  const isValidSummary = (summary: string): boolean => summary.split(' ').length > 50
  const isValidKeyTerms = (keyTerms: string[]): boolean => keyTerms.length > 0

  const generateId = (): number => Math.floor(Math.random() * 100)

  if (!isValidUser(age, name, email, summary, keyTerms)) {
    throw makeError('INVALID_DATA', 'Invalid data for create user')
  }
  const personalData = { age, name, email, address, social, git, picture }
  return { id: id || generateId(), personalData, summary, keyTerms, workExperience, education, skills }
}

// DOMAIN WITH CLASS
// class User {
//   private age: number;
//   private name: string;

//   public constructor(newAge: number, newName: string) {
//     if (!this.isValidUser(newAge, newName)) {
//       throw new Error("Invalid User values");
//     }
//     this.age = newAge;
//     this.name = newName;
//   }

//   private isValidAge = (age: number): boolean => age > 0;
//   private isValidName = (name: string): boolean => name !== "";

//   private isValidUser = (age: number, name: string) =>
//     this.isValidAge(age) && this.isValidName(name);

//   public getAge = (): number => this.age;
//   public getName = (): string => this.name;
// }
