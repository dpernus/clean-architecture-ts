import { User } from './entities/user'

export interface UserRepository {
  addUser: (u: User) => number
  getUser: (userId: number) => User | null
  updateUser: (user: User) => void
}
