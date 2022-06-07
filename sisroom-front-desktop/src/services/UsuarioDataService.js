import http from '../http-common'

class UsuarioDataService {
  getAll () {
    return http.get('/usuario')
  }

  getAllActive () {
    return http.get('/usuario/ativo')
  }

  get (id) {
    return http.get(`/usuario/${id}`)
  }

  create (data) {
    console.log('data da rota: ', data)
    return http.post('/usuario/autenticar', data)
  }

  recuperarSenha (data) {
    console.log('data da rota: ', data)
    return http.post('/usuario/recuperar_senha', data)
  }

  novaSenha (data) {
    console.log('data da rota: ', data)
    return http.put('/usuario/recuperar_senha', data)
  }

  update (id, data) {
    return http.put(`/usuario/${id}`, data)
  }

  delete (id) {
    return http.delete(`/usuario/${id}`)
  }

  deleteAll () {
    return http.delete('/usuario')
  }

  // findByTitle (title) {
  //   return http.get(`/usuario?title=${title}`)
  // }
}

export default new UsuarioDataService()
