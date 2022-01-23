import { action, createStore, persist } from 'easy-peasy'
import moment from 'moment'

const userModel = {
  phone: {
    val: '',
    set: action((state, payload) => {
      state.val = payload
    }),
    reset: action((state, payload) => {
      state.val = ''
    })
  }
}

const chatsModel = {
  friends: {
    val: ['9441158880'],
    add: action((state, payload) => {
      state.val.push(payload)
    })
  },
  chats: {
    val: {
      '9441158880' : [
        {
          message: 'Hai',
          from: '9441158880',
          timeStamp: moment().format()
        }
      ]
    },
    add: action((state, payload) => {
      const { user, text, from } = payload
      state.val[user].push({
        message: text,
        from,
        timeStamp: moment().format()
      })
    })
  }
}

const store = createStore(
  {
    user: persist(userModel),
    chatStore: persist(chatsModel)
  },
  {
    name: 'MyAwesomeStore',
    version: 1
  }
)

export default store
