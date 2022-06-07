import http from '../http-common'

class CursoDataService {
  getAll () {
    return http.get('/curso')
  }

  getAllActive () {
    return http.get('/curso/ativo')
  }

  get (id) {
    return http.get(`/curso/${id}`)
  }

  create (data) {
    return http.post('/curso', data)
  }

  update (id, data) {
    return http.put(`/curso/${id}`, data)
  }

  delete (id) {
    return http.delete(`/curso/${id}`)
  }

  deleteAll () {
    return http.delete('/curso')
  }

  findByTitle (title) {
    return http.get(`/curso?title=${title}`)
  }
}

export default new CursoDataService()
