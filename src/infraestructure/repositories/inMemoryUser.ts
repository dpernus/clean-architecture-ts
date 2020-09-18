import { UserRepository } from '../../domain/interfaces'
import { User, createUser } from '../../domain/entities/user'

export function makeInMemoryUserRepository(): UserRepository {
  const persistedUsers = new Map<string, string>()

  const addUser = (user: User): Promise<number> => {
    persistedUsers.set(user.id.toString(), JSON.stringify(user))
    console.log(persistedUsers.size)
    return Promise.resolve(user.id)
  }

  const getUser = (userId: number): Promise<User | null> => {
    const dbUser = persistedUsers.get(userId.toString())

    if (dbUser !== undefined) {
      const {
        personalData: { age, name, email },
        summary,
        keyTerms,
        workExperience,
        education,
        skills,
        id,
      } = JSON.parse(dbUser)
      return Promise.resolve(createUser(age, name, email, summary, keyTerms, workExperience, education, skills, id))
    }

    return Promise.resolve(null)
  }

  const updateUser = (user: User): Promise<void> => {
    const userId = user.id.toString()
    persistedUsers.set(userId, JSON.stringify(user))
    return Promise.resolve()
  }

  return { addUser, getUser, updateUser }
}
