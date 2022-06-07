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
                Nova senha
              </h1>

              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :href="social.href"
                class="ma-1"
                icon
                rel="noopener"
                target="_blank"
              >
                <v-icon
                  v-text="social.icon"
                />
              </v-btn>
            </div>
          </template>

          <v-card-text class="text-center">
            <div class="text-center grey--text body-1 font-weight-light">
              Or Be Classical
            </div>

            <v-text-field
              v-model="usuario.senha"
              type="password"
              color="secondary"
              label="senha"
              prepend-icon="mdi-lock-outline"
            />

            <v-text-field
              v-model="usuario.confirmacao_senha"
              type="password"
              color="secondary"
              label="confirmação "
              prepend-icon="mdi-lock-outline"
            />

            <pages-btn
              large
              color=""
              depressed
              class="v-btn--text success--text"
              @click="nova_senha"
            >
              Recuperar Senha
            </pages-btn>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
  import UsuarioDataService from '@/services/UsuarioDataService.js'
  export default {
    name: 'PagesRecuperar',

    components: {
      PagesBtn: () => import('./pages/components/Btn'),
    },

    data: () => ({
      socials: [
        {
          href: '#',
          icon: 'mdi-facebook-box',
        },
        {
          href: '#',
          icon: 'mdi-twitter',
        },
        {
          href: '#',
          icon: 'mdi-github-box',
        },
      ],
      usuario: {
        senha: '',
      },
    }),
    methods: {
      nova_senha () {
        console.log('token ', this.$route.params.token)
        const formData = {
          senha: this.usuario.senha,
          token: this.$route.params.token,
        }
        UsuarioDataService.novaSenha(formData)
          .then((res) => {
            console.log('RecuSWenha: ', res)
          })
          .catch((error) => {
            console.log('RecuSenha: ', error)
          })
      },
    },
  }
</script>
