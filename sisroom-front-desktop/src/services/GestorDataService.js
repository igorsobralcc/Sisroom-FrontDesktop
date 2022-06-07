import http from '../http-common'

class GestorDataService {
  getAll () {
    return http.get('/gestor')
  }

  getAllActive () {
    return http.get('/gestor/ativo')
  }

  get (id) {
    return http.get(`/gestor/${id}`)
  }

  create (data) {
    console.log('data da rota: ', data)
    return http.post('/gestor', data)
  }

  update (id, data) {
    return http.put(`/gestor/${id}`, data)
  }

  delete (id) {
    return http.delete(`/gestor/${id}`)
  }

  deleteAll () {
    return http.delete('/gestor')
  }

  // findByTitle (title) {
  //   return http.get(`/gestor?title=${title}`)
  // }
}

export default new GestorDataService()
