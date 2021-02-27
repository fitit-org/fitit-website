import { ObjectId } from 'bson'
import { ActivityLog, ActivityLogDTO } from '../types/ActivityLog'
import { ActivityType, ActivityTypeDTO } from '../types/ActivityType'
import { Class, ClassDTO } from '../types/Class'
import { UserDTO, User } from '../types/User'

export function deserializeActivityType(act: ActivityTypeDTO): ActivityType {
  const deserialized: ActivityType = {
    _id: new ObjectId(act._id),
    name: act.name,
    kcalPerHour: act.kcalPerHour,
  }
  return deserialized
}

export function deserializeActivityLog(act: ActivityLogDTO): ActivityLog {
  const deserialized: ActivityLog = {
    _id: new ObjectId(act._id),
    activityType_id:
      typeof act.activityType_id === 'string'
        ? new ObjectId(act.activityType_id)
        : deserializeActivityType(act.activityType_id),
    startDate: new Date(act.startDate),
    endDate: act.endDate !== undefined ? new Date(act.endDate) : undefined,
  }
  return deserialized
}

export function deserializeClass(classObj: ClassDTO): Class {
  const deserialized: Class = {
    _id: new ObjectId(classObj._id),
    name: classObj.name,
    isActive: classObj.isActive,
  }
  return deserialized
}

export function deserializeUser(user: UserDTO): User {
  const deserialized: User = {
    _id: new ObjectId(user._id),
    class_ids:
      user.class_ids.length > 0
        ? typeof user.class_ids[0] === 'string'
          ? ([] as Array<ObjectId>)
          : ([] as Array<Class>)
        : ([] as Array<ObjectId>),
    isActive: user.isActive,
    isTeacher: user.isTeacher,
    name: user.name,
    surname: user.surname,
    activityLog_ids:
      user.activityLog_ids !== undefined
        ? typeof user.activityLog_ids === 'string'
          ? ([] as Array<ObjectId>)
          : ([] as Array<ActivityLog>)
        : undefined,
    birthDate:
      user.birthDate !== undefined ? new Date(user.birthDate) : undefined,
    dateCreated:
      user.dateCreated !== undefined ? new Date(user.dateCreated) : undefined,
    email: user.email,
    weight: user.weight,
    height: user.height,
  }
  if (typeof user.class_ids[0] === 'object') {
    ;(user.class_ids as Array<ClassDTO>).forEach((classObj) => {
      ;(deserialized.class_ids as Array<Class>).push(deserializeClass(classObj))
    })
  } else {
    ;(user.class_ids as Array<string>).forEach((id) => {
      ;(deserialized.class_ids as Array<ObjectId>).push(new ObjectId(id))
    })
  }
  if (
    deserialized.activityLog_ids !== undefined &&
    user.activityLog_ids !== undefined
  ) {
    if (typeof user.activityLog_ids[0] === 'object') {
      ;(user.activityLog_ids as Array<ActivityLogDTO>).forEach((act) => {
        ;(deserialized.activityLog_ids as Array<ActivityLog>).push(
          deserializeActivityLog(act)
        )
      })
    } else {
      ;(user.activityLog_ids as Array<string>).forEach((id) => {
        ;(deserialized.activityLog_ids as Array<ObjectId>).push(
          new ObjectId(id)
        )
      })
    }
  }
  return deserialized
}
