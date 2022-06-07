import axios from 'axios'

export default axios.create({
  baseURL: 'https://sisroom-back-api.herokuapp.com/api',
  headers: {
    'Content-type': 'application/json',
  },
})
