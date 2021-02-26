import { ObjectId } from 'bson'

export interface Class {
  _id: ObjectId
  name: string
  isActive: boolean
}

export interface ClassDTO {
  _id: string
  name: string
  isActive: boolean
}
