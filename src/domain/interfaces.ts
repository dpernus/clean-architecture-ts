import { User } from './entities/user'

export interface UserRepository {
  addUser: (u: User) => Promise<number>
  getUser: (userId: number) => Promise<User | null>
  updateUser: (user: User) => Promise<void>
  getUsers: () => Promise<User[] | []>
}
