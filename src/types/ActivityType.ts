import { ObjectId } from 'bson'

export interface ActivityType {
  _id: ObjectId
  name: string
  kcalPerHour: number
}

export interface ActivityTypeDTO {
  _id: string
  name: string
  kcalPerHour: number
}
