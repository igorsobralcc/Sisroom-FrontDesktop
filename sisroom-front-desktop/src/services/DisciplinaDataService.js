import http from '../http-common'

class DisciplinaDataService {
  getAll () {
    return http.get('/disciplina')
  }

  getAllActive () {
    return http.get('/disciplina/ativo')
  }

  get (id) {
    return http.get(`/disciplina/${id}`)
  }

  create (data) {
    console.log('data da rota: ', data)
    return http.post('/disciplina', data)
  }

  update (id, data) {
    return http.put(`/disciplina/${id}`, data)
  }

  delete (id) {
    return http.delete(`/disciplina/${id}`)
  }

  deleteAll () {
    return http.delete('/disciplina')
  }

  findByTitle (title) {
    return http.get(`/disciplina?title=${title}`)
  }
}

export default new DisciplinaDataService()
