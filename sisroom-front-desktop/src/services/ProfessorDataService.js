import http from '../http-common'

class ProfessorDataService {
  getAll () {
    return http.get('/professor')
  }

  getAllActive () {
    return http.get('/professor/ativo')
  }

  get (id) {
    return http.get(`/professor/${id}`)
  }

  create (data) {
    return http.post('/professor', data)
  }

  update (id, data) {
    return http.put(`/professor/${id}`, data)
  }

  delete (id) {
    return http.delete(`/professor/${id}`)
  }

  deleteAll () {
    return http.delete('/professor')
  }

  findByTitle (title) {
    return http.get(`/professor?title=${title}`)
  }
}

export default new ProfessorDataService()
