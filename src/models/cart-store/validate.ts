export const cardRules = {
  ACCOUNT_HOLDER_NAME: {
    presence: { message: "Please enter a valid name" },
  },
  CARD_NO: {
    presence: { message: "Please enter a valid credit card number" },
    length: {
      minimum: 13,
      maximum: 16,
    },
  },
  EXPIRATION_MONTH: {
    presence: { message: "Please enter a valid month" },
    format: {
      pattern: /^(?:[0][\d])|(?:[1][012])$/g,
      message: "Please enter a valid month",
    },
  },
  EXPIRATION_YEAR: {
    presence: { message: "Please enter a valid year" },
    format: {
      pattern: /^(?:[2-9][\d])|(?:[1][9])$/g,
      message: "Please enter a valid year",
    },
  },
  CVV_NO: {
    presence: { message: "Please enter a valid CVV" },
    length: {
      minimum: 3,
      maximum: 4,
    },
  },
  ZIP_CODE: {
    presence: { message: "Please enter a valid zip code" },
    length: {
      minimum: 5,
      maximum: 20,
    },
  },
}
