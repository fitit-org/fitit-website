import { Class, ClassDTO } from './Class'
import { ActivityLog, ActivityLogDTO } from './ActivityLog'
import { ObjectId } from 'bson'

export interface User {
  _id: ObjectId
  class_ids: Array<ObjectId> | Array<Class>
  isActive: boolean
  isTeacher: boolean
  name: string
  surname: string
  activityLog_ids?: Array<ObjectId> | Array<ActivityLog>
  birthDate?: Date
  dateCreated?: Date
  weight?: number
  height?: number
  email?: string
}

export interface UserDTO {
  _id: string
  class_ids: Array<string> | Array<ClassDTO>
  isActive: boolean
  isTeacher: boolean
  email?: string
  name: string
  surname: string
  activityLog_ids?: Array<string> | Array<ActivityLogDTO>
  birthDate?: string
  dateCreated?: string
  weight?: number
  height?: number
}
