import { ActivityType, ActivityTypeDTO } from './ActivityType'
import { ObjectId } from 'bson'

export interface ActivityLog {
  _id: ObjectId
  activityType_id: ObjectId | ActivityType
  startDate: Date
  endDate?: Date
}

export interface ActivityLogDTO {
  _id: string
  activityType_id: string | ActivityTypeDTO
  startDate: string
  endDate?: string
}
