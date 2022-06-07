import http from '../http-common'

class CoordenadorDataService {
  getAll () {
    return http.get('/coordenador')
  }

  getAllActive () {
    return http.get('/coordenador/ativo')
  }

  get (id) {
    return http.get(`/coordenador/${id}`)
  }

  create (data) {
    return http.post('/coordenador', data)
  }

  update (id, data) {
    return http.put(`/coordenador/${id}`, data)
  }

  delete (id) {
    return http.delete(`/coordenador/${id}`)
  }

  deleteAll () {
    return http.delete('/coordenador')
  }

  findByTitle (title) {
    return http.get(`/coordenador?title=${title}`)
  }
}

export default new CoordenadorDataService()
