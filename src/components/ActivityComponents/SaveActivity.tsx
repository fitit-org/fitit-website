import React, { MouseEventHandler, useState } from 'react'
import { render } from 'react-dom'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { addActivity, getActivityTypes } from '../../services/APIService'
import { ActivityType } from '../../types/ActivityType'
import { hmsToMs } from '../../utils/helpers'
import ActivitySaved from './ActivitySaved'

type SaveActivityProps = {
  activity: string
  token: string
  goBack: MouseEventHandler
}

type ActivityData = {
  startDate: string
  endDate: string
  activityType_id: string
}

type FormData = {
  km?: number
  time: string
}

const SaveActivity = (props: SaveActivityProps): JSX.Element => {
  const { register, errors, handleSubmit, getValues } = useForm<FormData>({
    mode: 'onBlur',
  })

  const [info, setInfo] = useState(false)

  const onSubmit: SubmitHandler<FormData> = async ({ time }, e) => {
    e?.preventDefault()

    const startDate = new Date()
    const endDate = new Date(startDate.getTime() + hmsToMs(time))
    let activityType_id = ''
    await getActivityTypes().then((data) => {
      data.forEach((a: ActivityType) => {
        if (a.name === props.activity) {
          activityType_id = (a as ActivityType)._id
        }
      })
    })

    const activityData: ActivityData = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      activityType_id: activityType_id,
    }

    addActivity(activityData, props.token)
    setInfo(true)
  }

  const onError: SubmitErrorHandler<FormData> = (errors) => {
    if (errors.time !== undefined) {
      alert(errors.time.message)
    }
    if (errors.km !== undefined) {
      alert(errors.km.message)
    }
  }

  return (
    <>
      <div className={'student-panel__save-activity'}>
        <div className={'student-panel__save-activity-km'}>
          <span className={'student-panel__save-activity--header'}>
            Kilometry
          </span>
          <input
            type="text"
            placeholder={'(Opcjonalne)'}
            name="km"
            ref={register({
              minLength: {
                value: 1,
                message: 'Minimalna liczba kilometrów to 1',
              },
              pattern: {
                value: /[0-9]/,
                message: 'Podaj liczbę kilometrów',
              },
            })}
          />
        </div>
        <div
          className={'student-panel__activity-bubble'}
          onClick={handleSubmit(onSubmit, onError)}
        >
          <span className={'student-panel__activity-stop--header'}>
            {'ZAPISZ'}
          </span>
        </div>
        <div className={'student-panel__save-activity-time'}>
          <span className={'student-panel__save-activity--header'}>Czas</span>
          <input
            type="text"
            placeholder={'hh:mm:ss'}
            name="time"
            ref={register({
              required: 'Proszę podać czas treningu',
              minLength: {
                value: 8,
                message: 'Czas powinien być podany w formacie hh:mm:ss',
              },
              maxLength: {
                value: 8,
                message: 'Czas powinien być podany w formacie hh:mm:ss',
              },
              pattern: {
                value: /[0-2][0-9]:[0-5][0-9]:[0-5][0-9]/,
                message: 'Czas powinien być podany w formacie hh:mm:ss',
              },
            })}
            required
          />
        </div>
      </div>
      {info === true && <ActivitySaved goBack={props.goBack} />}
    </>
  )
}

export default SaveActivity
