export interface User {
  id: number;
  age: number;
  name: string;
}

export function createUser(
  age: number,
  name: string,
  id: number | undefined = undefined
): User {
  const isValidUser = (age: number, name: string) =>
    isValidAge(age) && isValidName(name);

  const isValidAge = (age: number): boolean => age > 0;
  const isValidName = (name: string): boolean => name !== "";

  const generateId = (): number => Math.floor(Math.random() * 100);

  if (!isValidUser(age, name)) {
    throw new Error("Invalid User values");
  }
  return { id: id || generateId(), age, name };
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
