import React from 'react'

import { mailRegex } from '../components/Helpers'
import { useForm } from 'react-hook-form'

import menu from '../img/contact/contactMenu.svg'

type ContactData = {
  name: string
  contactMail: string
}

const Contact = (): JSX.Element => {
  const { register, errors, handleSubmit } = useForm<ContactData>({
    mode: 'onBlur',
  })

  const onSubmit = handleSubmit(({ name, contactMail }) => {
    console.log(name, contactMail)
  })

  return (
    <div id={'contact'} className={'contact--background view--full-height'}>
      <div className={'contactBox'}>
        <form
          className={'contactBox__form'}
          id={'contactForm'}
          onSubmit={onSubmit}
        >
          <span className={'contactBox--header'}>Skontaktuj się z nami</span>
          <input
            id={'contactName'}
            className={'contactBox__form__input--text input--margin'}
            ref={register({
              required: 'Imię jest wymagane',
              minLength: {
                value: 3,
                message: 'Imię musi mieć co najmniej 3 znaki',
              },
              pattern: {
                value: /[^a-zA-Z -,-,ę,ß,ó,ą,ś,ł,ż,ź,ć,ń]/,
                message: 'Wprowadzono nieprawidłowe znaki',
              },
            })}
            type="text"
            placeholder="Imię"
            name="name"
          />
          <span
            id={'contactNameError'}
            className={'contactBox__form__input--error'}
          >
            {errors.name && errors.name.message}
          </span>
          <input
            id={'contactMail'}
            className={'contactBox__form__input--text input--margin'}
            ref={register({
              required: 'Adres email jest wymagany',
              pattern: {
                value: mailRegex,
                message: 'Należy wprowadzić prawidłowy adres email',
              },
            })}
            type="text"
            placeholder="Adres email"
            name="contactMail"
          />
          <span
            id={'contactMailError'}
            className={'contactBox__form__input--error'}
          >
            {errors.contactMail && errors.contactMail.message}
          </span>
          <br />
          <input
            className={'contactBox__form__button input--margin'}
            type="submit"
            value="Wyślij"
          />
        </form>
        <textarea
          id={'contactMsg'}
          form={'contactForm'}
          className={'contactBox--textarea input--margin'}
          placeholder="Wiadomość"
          required
        />
      </div>
      <img
        className={'menu-contact--bottom-right'}
        src={menu}
        useMap="#menu"
        alt=""
      />
      <map name="menu">
        <area alt="" href="#main-view" coords="12,12,11" shape="circle" />
        <area alt="" href="#info" coords="12,45,11" shape="circle" />
        <area alt="" href="#login-register" coords="12,77,10" shape="circle" />
        <area alt="" href="#contact" coords="12,110,10" shape="circle" />
      </map>
    </div>
  )
}

export default Contact
