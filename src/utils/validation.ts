import {errorMessage} from './errormessage';

export const validateEmail = (value: string | null) => {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (value && reg.test(value)) {
    return null;
  } else {
    return value ? errorMessage.invalidEmail : errorMessage.requestEmail;
  }
};

export const isEmpty = (value: string | null, message: string) => {
  if (value) {
    return null;
  } else {
    return message;
  }
};

export const alphabate = (
  value: string | null,
  message: string,
  emptyMessage: string | null,
) => {
  const regex = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;
  if (value && regex.test(value)) {
    return null;
  }
  return value ? message : emptyMessage;
};

export const numeric = (
  value: string | null,
  message: string,
  emptyMessage: string | null,
) => {
  const regex = /^[0-9]+$/i;
  if (value && regex.test(value) && value.length === 10) {
    return null;
  }
  return value ? message : emptyMessage;
};

export const passwordValidation = (value: string | null) => {
  const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
  if (value && regex.test(value)) {
    return null;
  }

  return value ? errorMessage.validPassword : errorMessage.requestPassword;
};
