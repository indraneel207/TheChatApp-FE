import _ from 'lodash'

export const validate = (type, value) => {
  switch (type) {
    case 'phone_input':
      return !isNaN(+value) && value.length <= 10
    case 'phone':
      return !isNaN(+value) && value.length === 10
    case 'reply':
      return !_.isNull(value)
    default:
      return true
  }
}
