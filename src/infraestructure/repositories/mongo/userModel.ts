import { Document, Schema, model } from 'mongoose'
import { Job, Course, Skills } from '../../../domain/entities/user'

const personalDataSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: String,
    phone: Number,
    social: String,
  },
  { _id: false },
)

const InstitutionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: String,
    web: String,
  },
  { _id: false },
)

const JobSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    institution: InstitutionSchema,
    achivements: [String],
  },
  { _id: false },
)

const CourseSchema = new Schema(
  {
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    institution: InstitutionSchema,
    description: [String],
  },
  { _id: false },
)

const UserSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  personalData: personalDataSchema,
  summary: {
    type: String,
    required: true,
  },
  keyTerms: [String],
  workExperience: [JobSchema],
  education: [CourseSchema],
  skills: Object,
  createdAt: {
    type: Date,
    required: false,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    required: false,
    default: Date.now(),
  },
})

//TODO: Create interfaces for schema, is better don't use domain interfaces here
interface UserModel extends Document {
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
  workExperience: Job[]
  education: Course[]
  skills: Skills
}

export default model<UserModel>('user', UserSchema)
