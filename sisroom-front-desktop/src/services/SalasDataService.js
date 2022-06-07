import http from '../http-common'

class SalasDataService {
  getAll () {
    return http.get('/sala')
  }

  getAllActive () {
    return http.get('/sala/ativo')
  }

  get (id) {
    return http.get(`/sala/${id}`)
  }

  create (data) {
    return http.post('/sala', data)
  }

  update (id, data) {
    return http.put(`/sala/${id}`, data)
  }

  delete (id) {
    return http.delete(`/sala/${id}`)
  }

  deleteAll () {
    return http.delete('/sala')
  }

  findByTitle (title) {
    return http.get(`/sala?title=${title}`)
  }
}

export default new SalasDataService()
