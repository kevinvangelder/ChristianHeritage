export const validationRules = {
  password: {
    presence: {
      message: "Please enter a valid password",
      allowEmpty: false,
    },
    length: {
      minimum: 8,
      tooShort: "Password must be 8 or more characters",
    },
    format: {
      pattern: /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&\{\}\[\]\(\)\+\=\-\_\/\\])[a-z\d@$!%*#?&\{\}\[\]\(\)\+\=\-\_\=\/\\]{8,}$/gi,
      message: "Password must contain at least one letter, number, and symbol",
    },
  },
  firstName: {
    presence: {
      message: "Please enter a valid first name",
      allowEmpty: false,
    },
  },
  lastName: {
    presence: {
      message: "Please enter a valid last name",
      allowEmpty: false,
    },
  },
  phone: {
    length: {
      minimum: 10,
      maximum: 13,
      tooShort: "Please enter a US or international phone number",
      tooLong: "Please enter a US or international phone number",
    },
  },
  address1: {
    presence: {
      message: "Please enter a valid address",
      allowEmpty: false,
    },
  },
  city: {
    presence: {
      message: "Please enter a valid city",
      allowEmpty: false,
    },
  },
  state: {
    presence: {
      message: "Please enter a valid state",
      allowEmpty: false,
    },
  },
  zip: {
    presence: {
      message: "Please enter a valid zip",
      allowEmpty: false,
    },
  },
}

export const validatePhone = (phone: string | null) => {
  if (!phone || phone.length > 13 || phone.length < 10)
    return "Please enter a US or international phone number"
  return null
}
