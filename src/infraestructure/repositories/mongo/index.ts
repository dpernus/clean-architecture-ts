import mongoose from 'mongoose'
import { makeError } from '../../../utils/errors'
import { UserRepository } from '../../../domain/interfaces'
import { User, createUser } from '../../../domain/entities/user'
import UserModel from './userModel'

const options = {
  useNewUrlParser: true,
}

export async function connect(uri: string): Promise<typeof mongoose> {
  try {
    const dbConexion = await mongoose.connect(uri, options)
    console.log(`Mongo Client connected to ${uri}`)
    return dbConexion
  } catch (error) {
    throw makeError('DB_CONNECT', error)
  }
}

export async function disconnect(): Promise<void> {
  try {
    await mongoose.disconnect()
    console.log(`MongoClient disconnected`)
  } catch (error) {
    throw makeError('DB_DISCONNECT', error)
  }
}

export default function makeMongoUserRepository(): UserRepository {
  const addUser = async (user: User) => {
    try {
      const dbUser = new UserModel({
        id: user.id,
        personalData: user.personalData,
        summary: user.summary,
        keyTerms: [...user.keyTerms],
        workExperience: [...user.workExperience],
        education: [...user.education],
        skills: { ...user.skills },
      })
      await dbUser.save()
      return user.id
    } catch (error) {
      throw makeError('DB_ADD_USER', `${error.message}`)
    }
  }

  const getUser = async (userId: number): Promise<User | null> => {
    try {
      const dbUser = await UserModel.findOne({ id: userId })

      if (dbUser !== null) {
        const {
          personalData: { age, name, email },
          summary,
          keyTerms,
          workExperience,
          education,
          skills,
          id,
        } = dbUser.toJSON()
        return createUser(age, name, email, summary, keyTerms, workExperience, education, skills, id)
      }

      return null
    } catch (error) {
      throw makeError('DB_GET_USER', `${error.message}`)
    }
  }

  const getUsers = async (): Promise<User[] | []> => {
    try {
      const dbUsers = await UserModel.find({})

      if (dbUsers.length > 0) {
        const users = dbUsers.map((user) => {
          const {
            personalData: { age, name, email },
            summary,
            keyTerms,
            workExperience,
            education,
            skills,
            id,
          } = user.toJSON()
          return createUser(age, name, email, summary, keyTerms, workExperience, education, skills, id)
        })
        return users
      }

      return []
    } catch (error) {
      throw makeError('DB_GET_USER', `${error.message}`)
    }
  }

  //TODO: Fix date in string to date for job and course
  const updateUser = async (user: User) => {
    try {
      const userUpdated = {
        id: user.id,
        personalData: user.personalData,
        summary: user.summary,
        keyTerms: [...user.keyTerms],
        workExperience: [...user.workExperience],
        education: [...user.education],
        skills: { ...user.skills },
      }
      await UserModel.updateOne({ id: user.id }, userUpdated)
    } catch (error) {
      throw makeError('DB_UPDATE_USER', `${error.message}`)
    }
  }
  return { addUser, getUser, getUsers, updateUser }
}
