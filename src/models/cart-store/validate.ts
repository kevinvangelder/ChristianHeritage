export const cardRules = {
  ACCOUNT_HOLDER_NAME: {
    presence: { message: "Please enter a valid name" },
  },
  CARD_NO: {
    presence: { message: "Please enter a valid credit card number" },
    length: {
      is: 16,
    },
  },
  EXPIRATION_MONTH: {
    presence: { message: "Please enter a valid month" },
  },
  EXPIRATION_YEAR: {
    presence: { message: "Please enter a valid year" },
  },
  CVV_NO: {
    presence: { message: "Please enter a valid CVV" },
    length: {
      is: 3,
    },
  },
  ZIP_CODE: {
    presence: { message: "Please enter a valid zip code" },
    length: {
      is: 5,
    },
  },
}
