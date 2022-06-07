import http from '../http-common'

class AlocacaoDataService {
  getAll () {
    return http.get('/alocacao')
  }

  getAllActive () {
    return http.get('/alocacao/ativo')
  }

  get (id) {
    return http.get(`/alocacao/${id}`)
  }

  create (data) {
    console.log('data da rota: ', data)
    return http.post('/alocacao', data)
  }

  update (id, data) {
    return http.put(`/alocacao/${id}`, data)
  }

  delete (id) {
    return http.delete(`/alocacao/${id}`)
  }

  deleteAll () {
    return http.delete('/alocacao')
  }

  findByTitle (title) {
    return http.get(`/alocacao?title=${title}`)
  }
}

export default new AlocacaoDataService()
