import React from 'react'
import ActivityBubble from '../components/ActivityBubble'
import ActivityLog from '../types/ActivityLog'
import { ActivityType } from '../types/ActivityType'
import User from '../types/User'

// eslint-disable-next-line no-control-regex
const mailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
export { mailRegex }

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{10,32}$/
export { passwordRegex }

export function nameSurnameValidation(
  fieldName: string,
  fieldValue: string
): string {
  if (fieldValue.trim() === '') {
    return `${fieldName} jest wymagane`
  }
  if (/[^a-zA-Z -,-,ę,ß,ó,ą,ś,ł,ż,ź,ć,ń]/.test(fieldValue)) {
    return 'Wprowadzono nieprawidłowe znaki'
  }
  if (fieldValue.trim().length < 3) {
    return `${fieldName} musi mieć co najmniej 3 znaki`
  } else {
    return ''
  }
}

export function mailValidation(fieldValue: string): string {
  if (!mailRegex.test(fieldValue)) {
    return 'Proszę podać prawidłowy adres'
  } else {
    return ''
  }
}

export function registerPasswordValidation(fieldValue: string): string {
  if (!passwordRegex.test(fieldValue)) {
    return 'Hasło musi zawierać minimum 10 znaków,<br />jedną dużą i małą literę, znak specjalny i cyfrę'
  } else {
    return ''
  }
}

export function codeValidation(fieldValue: string): string {
  if (fieldValue.trim() === '') {
    return 'Kod jest wymagany'
  }
  if (/[^a-zA-Z0-9 -,-,ę,ß,ó,ą,ś,ł,ż,ź,ć,ń]/.test(fieldValue)) {
    return 'Wprowadzono nieprawidłowe znaki'
  }
  if (fieldValue.trim().length < 3) {
    return 'Kod musi mieć co najmniej 3 znaki'
  } else {
    return ''
  }
}

export function handleErrors(response: Response): Response {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}

export const msToTime = (duration: number): string => {
  let seconds: string | number = Math.floor((duration / 1000) % 60),
    minutes: string | number = Math.floor((duration / (1000 * 60)) % 60),
    hours: string | number = Math.floor((duration / (1000 * 60 * 60)) % 24)

  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  seconds = seconds < 10 ? '0' + seconds : seconds

  return hours + 'h ' + minutes + 'm ' + seconds + 's'
}

export const msToKcal = (duration: number, multiplier: number): string => {
  return `${Math.floor((duration / 3600000) * multiplier)} kcal`
}

export const getDate = (days: number): Date => {
  const lastWeek: Date = new Date()
  lastWeek.setDate(lastWeek.getDate() - days)
  return lastWeek
}

export const activityTime = (
  activities: Array<ActivityLog> | undefined,
  period: number
): number => {
  const lastDate = getDate(period)
  let activityTime = 0
  if (activities !== undefined) {
    activities.forEach((activity: ActivityLog) => {
      if (Date.parse(activity.startDate) >= lastDate.getTime()) {
        if (activity.endDate !== undefined) {
          activityTime +=
            Date.parse(activity.endDate) - Date.parse(activity.startDate)
        }
      } else {
        return 0
      }
    })
    return activityTime
  } else {
    return activityTime
  }
}

export const activityKcal = (
  activities: Array<ActivityLog> | undefined,
  period: number
): number => {
  const lastDate = getDate(period)
  let activityKcal = 0
  if (activities !== undefined) {
    activities.forEach((activity: ActivityLog) => {
      if (Date.parse(activity.startDate) >= lastDate.getTime()) {
        if (activity.endDate !== undefined) {
          activityKcal += Math.floor(
            ((Date.parse(activity.endDate) - Date.parse(activity.startDate)) /
              3600000) *
              (activity.activityType_id as ActivityType).kcalPerHour
          )
        }
      } else {
        return 0
      }
    })
    return activityKcal
  } else {
    return activityKcal
  }
}

interface UserWithLastActivityAndDuration {
  name: string
  surname: string
  activityTypeName: string
  parsedDurationInMinutes: string
  _id: string
}

export const getLastActivitiesFromUsers = (
  users: Array<User>,
  last: number
): Array<UserWithLastActivityAndDuration> => {
  const activitiesWithDuration = [] as Array<{
    user: User
    activity: ActivityLog
  }>
  users.forEach((user) => {
    if (
      user.isActive &&
      !user.isTeacher &&
      user.activityLog_ids !== undefined
    ) {
      ;(user.activityLog_ids as Array<ActivityLog>).forEach((activity) => {
        if (activity.startDate && activity.endDate) {
          activitiesWithDuration.push({ user: user, activity: activity })
        }
      })
    }
  })
  activitiesWithDuration.sort((a, b) => {
    return (
      new Date(b.activity.endDate as string).getTime() -
      new Date(a.activity.endDate as string).getTime()
    )
  })
  const newArr: Array<UserWithLastActivityAndDuration> = []
  activitiesWithDuration.splice(0, last).forEach((obj) => {
    const diff: number = Math.abs(
      new Date(obj.activity.endDate as string).getTime() -
        new Date(obj.activity.startDate as string).getTime()
    )
    const diffInMins = diff / 60000
    const diffInHours = diffInMins / 60
    const restInMins = diffInMins % 60
    let durString = ''
    if (diffInHours > 0) {
      durString = `${Math.floor(diffInHours)}h`
      if (restInMins > 0) {
        durString = `${durString} ${Math.round(restInMins)} min`
      }
    } else {
      durString = `${Math.round(diffInMins)} min`
    }
    newArr.push({
      name: obj.user.name,
      surname: obj.user.surname,
      activityTypeName: (obj.activity.activityType_id as ActivityType).name,
      parsedDurationInMinutes: durString,
      _id: obj.activity._id,
    })
  })
  console.log('Done!', newArr)
  return newArr
}

export const renderLastActivities = (
  activities: Array<ActivityLog> | undefined,
  count: number
): Array<JSX.Element> | JSX.Element => {
  if (activities !== undefined) {
    const lastActivities: Array<JSX.Element> = []
    if (activities.length < count) {
      for (let i = activities.length - 1; i >= 0; i -= 1) {
        const activity: ActivityLog = activities[i]
        if (activity.endDate !== undefined) {
          const deltaTime: number =
            Date.parse(activity.endDate) - Date.parse(activity.startDate)
          lastActivities.push(
            <ActivityBubble
              key={i}
              activity={activity}
              kcal={msToKcal(
                deltaTime,
                (activity.activityType_id as ActivityType).kcalPerHour
              )}
              time={msToTime(deltaTime)}
            />
          )
        }
      }
    } else {
      for (
        let i = activities.length - 1;
        i > activities.length - count - 1;
        i -= 1
      ) {
        const activity: ActivityLog = activities[i]
        if (activity.endDate !== undefined) {
          const deltaTime: number =
            Date.parse(activity.endDate) - Date.parse(activity.startDate)
          lastActivities.push(
            <ActivityBubble
              key={i}
              activity={activity}
              kcal={msToKcal(
                deltaTime,
                (activity.activityType_id as ActivityType).kcalPerHour
              )}
              time={msToTime(deltaTime)}
            />
          )
        }
      }
    }
    return lastActivities
  } else {
    return <span className={'student-panel__header'}>{'Brak aktywności'}</span>
  }
}
