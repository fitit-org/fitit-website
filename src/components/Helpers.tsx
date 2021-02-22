// eslint-disable-next-line no-control-regex
const mailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{10,32}$/;


export function nameSurnameValidation(fieldName: string, fieldValue: string) : string {
  if(fieldValue.trim() === '') {
    return `${fieldName} jest wymagane`;
  }
  if(/[^a-zA-Z -]/.test(fieldValue)) {
    return 'Wprowadzono nieprawidłowe znaki';
  }
  if (fieldValue.trim().length < 3) {
    return `${fieldName} musi mieć co najmniej 3 znaki`;
  }
  else {
    return '';
  }
}

export function mailValidation(fieldValue: string) : string {
  if(!mailRegex.test(fieldValue)) {
    return 'Proszę podać prawidłowy adres';
  }
  else {
    return '';
  }
}

export function registerPasswordValidation(fieldValue: string) : string {
  if(!passwordRegex.test(fieldValue)) {
    return 'Hasło musi zawierać minimum 8 znaków,<br />jedną dużą i małą literę, znak specjalny i cyfrę';
  }
  else {
    return '';
  }
}

export function codeValidation(fieldValue: string) : string {
  if(fieldValue.trim() === '') {
    return 'Kod jest wymagany';
  }
  if(/[^a-zA-Z0-9 -]/.test(fieldValue)) {
    return 'Wprowadzono nieprawidłowe znaki';
  }
  if (fieldValue.trim().length < 3) {
    return 'Kod musi mieć co najmniej 3 znaki';
  }
  else {
    return '';
  }
}

export function handleErrors(response: any) {
  if(!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}