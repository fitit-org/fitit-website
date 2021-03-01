import Class from './Class'
import ActivityLog from './ActivityLog'

export default interface User {
  _id: string
  class_ids: Array<string> | Array<Class>
  isActive: boolean
  isTeacher: boolean
  name: string
  surname: string
  activityLog_ids?: Array<string> | Array<ActivityLog>
  birthDate?: Date
  dateCreated?: Date
  weight?: number
  height?: number
  email?: string
}
