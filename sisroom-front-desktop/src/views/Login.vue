<template>
  <v-container
    id="login"
    class="fill-height justify-center"
    tag="section"
  >
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="success"
          light
          max-width="100%"
          width="400"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                Login
              </h1>
            </div>
          </template>

          <v-card-text class="text-center">
            <v-text-field
              v-model="usuario.email"
              color="secondary"
              label="Email..."
              prepend-icon="mdi-email"
            />

            <v-text-field
              v-model="usuario.senha"
              class="mb-8"
              color="secondary"
              label="Password..."
              prepend-icon="mdi-lock-outline"
              :append-icon="mostrarSenha ? 'mdi-eye' : 'mdi-eye-off'"
              :type="mostrarSenha ? 'text': 'Password'"
              @click:append="mostrarSenha = !mostrarSenha"
            />
            <v-row>
              <v-col align-self="center">
                <v-btn
                  color="green"
                  @click="logar"
                >
                  <v-icon
                    left
                  >
                    mdi-login
                  </v-icon>
                  Entrar
                </v-btn>
              </v-col>
              <br>
              <v-col align-self="center">
                <pages-btn
                  large
                  color=""
                  depressed
                  class="v-btn--text success--text"
                >
                  Recuperar Senha
                </pages-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
  // import UsuarioData from '@/services/UsuarioDataService.js'
  import { mapActions } from 'vuex'
  export default {
    name: 'PagesLogin',

    components: {
      PagesBtn: () => import('./pages/components/Btn'),
    },

    data: () => ({
      mostrarSenha: false,
      usuario: {
        email: '',
        senha: '',
      },
    }),
    methods: {
      ...mapActions({
        login: 'authentication/login',
      }),
      logar () {
        const formData = {
          email: this.usuario.email,
          senha: this.usuario.senha,
        }
        this.login(formData)
          .then((res) => {
            console.log('re: ', res)
          })
          .catch((error) => {
            console.log('er: ', error)
          })
      },

    },
  }
</script>
