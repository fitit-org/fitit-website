import { ActivityType } from './ActivityType'

export default interface ActivityLog {
  _id: string
  activityType_id: string | ActivityType
  startDate: string
  endDate?: string
}
