import http from '../http-common'

class HistoricoDataService {
  getAll () {
    return http.get('/historico')
  }

  getAllActive () {
    return http.get('/historico/ativo')
  }

  get (id) {
    return http.get(`/historico/${id}`)
  }

  create (data) {
    return http.post('/historico', data)
  }

  update (id, data) {
    return http.put(`/historico/${id}`, data)
  }

  delete (id) {
    return http.delete(`/historico/${id}`)
  }

  deleteAll () {
    return http.delete('/historico')
  }

  findByTitle (title) {
    return http.get(`/historico?title=${title}`)
  }
}

export default new HistoricoDataService()
