import http from '../http-common'

class PorteiroDataService {
  getAll () {
    return http.get('/porteiro')
  }

  getAllActive () {
    return http.get('/porteiro/ativo')
  }

  get (id) {
    return http.get(`/porteiro/${id}`)
  }

  create (data) {
    return http.post('/porteiro', data)
  }

  update (id, data) {
    return http.put(`/porteiro/${id}`, data)
  }

  delete (id) {
    return http.delete(`/porteiro/${id}`)
  }

  deleteAll () {
    return http.delete('/porteiro')
  }

  findByTitle (title) {
    return http.get(`/porteiro?title=${title}`)
  }
}

export default new PorteiroDataService()
