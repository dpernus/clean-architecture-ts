interface Institution {
  name: string
  description: string
  web: string
}

interface Job {
  date: string
  institution: Institution
  charge: string
  achivements: string[]
}

interface Course {
  date: string
  title: string
  institution: Institution
  description: string[]
}

type Skills = Record<string, string[]>

export interface User {
  id: number
  personalData: {
    name: string
    age: number
    email: string
    address?: string
    phone?: number
    social?: string
  }
  summary: string
  keyTerms: string[]
  workExperience?: Job[]
  education?: Course[]
  skills?: Skills
}

//TODO: add optional user fields and validation for those case
export function createUser(
  age: number,
  name: string,
  email: string,
  summary: string,
  keyTerms: string[],
  id: number | undefined = undefined
): User {
  const isValidUser = (age: number, name: string, email: string, summary: string, keyTerms: string[]) =>
    isValidAge(age) && isValidName(name) && isValidEmail(email) && isValidSummary(summary) && isValidKeyTerms(keyTerms);

  const isValidAge = (age: number): boolean => age > 0;
  const isValidName = (name: string): boolean => name !== "";
  const isValidEmail = (email: string): boolean => email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) !== null

  const isValidSummary = (summary: string): boolean => summary.split(' ').length > 50;
  const isValidKeyTerms = (keyTerms: string[]): boolean => keyTerms.length > 0

  const generateId = (): number => Math.floor(Math.random() * 100);

  if (!isValidUser(age, name, email, summary, keyTerms)) {
    throw new Error("Invalid User values");
  }
  const personalData = {age, name, email}
  return { id: id || generateId(), personalData, summary, keyTerms };
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
