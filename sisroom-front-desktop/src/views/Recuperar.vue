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
                Recuperar senha
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
              v-model="usuario.email"
              color="secondary"
              label="Email..."
              prepend-icon="mdi-email"
            />

            <pages-btn
              large
              color=""
              depressed
              class="v-btn--text success--text"
              @click="recuperar"
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
        email: '',
      },
    }),
    methods: {
      recuperar () {
        const formData = {
          email: this.usuario.email,
        }
        UsuarioDataService.recuperarSenha(formData)
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
