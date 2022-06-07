import http from '../http-common'

class TurmaDataService {
  getAll () {
    return http.get('/turma')
  }

  getAllActive () {
    return http.get('/turma/ativo')
  }

  get (id) {
    return http.get(`/turma/${id}`)
  }

  create (data) {
    console.log('data da rota: ', data)
    return http.post('/turma', data)
  }

  update (id, data) {
    return http.put(`/turma/${id}`, data)
  }

  delete (id) {
    return http.delete(`/turma/${id}`)
  }

  deleteAll () {
    return http.delete('/turma')
  }

  findByTitle (title) {
    return http.get(`/turma?title=${title}`)
  }
}

export default new TurmaDataService()
