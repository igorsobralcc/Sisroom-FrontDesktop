<template>
  <v-container class="grey lighten-5">
    <hr>
    <v-col
      cols="12"
      sm="12"
    >
      <h1 class="text-center">
        Área de Pesquisa
      </h1>
    </v-col>
    <v-row>
      <v-col
        cols="12"
        md="5"
        style="margin-top: 45px;"
      >
        <v-btn
          rounded
          color="success"
        >
          <v-icon left>
            mdi-home-variant
          </v-icon>
          Livre
        </v-btn>
        <v-btn
          rounded
          color="blue"
        >
          <v-icon left>
            mdi-home-variant
          </v-icon>
          Ocupada
        </v-btn>
        <v-btn
          rounded
          color="error"
        >
          <v-icon left>
            mdi-home-variant
          </v-icon>
          Manutentação
        </v-btn>
        <v-btn
          rounded
          color="grey"
        >
          <v-icon left>
            mdi-home-variant
          </v-icon>
          Inativa
        </v-btn>
      </v-col>
      <v-col
        cols="12"
        md="7"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Busca"
            single-line
            hide-details
          />
        </v-card>
      </v-col>
    </v-row>
    <hr>
    <v-row>
      <v-col
        cols="12"
        sm="8"
      >
        <v-item-group multiple>
          <v-container>
            <h1 class="text-center">
              Mapa das Salas
            </h1>
            <v-row>
              <v-col
                v-for="(n, index) in salas"
                :key="index"
                cols="12"
                sm="3"
              >
                <v-item>
                  <v-card
                    :color="n.color"
                    class="d-flex align-center"
                    dark
                    height="100"
                    width="300"
                  >
                    <v-scroll-y-transition>
                      <div
                        class="display-1 flex-grow-1 text-center"
                      >
                        Sala: {{ n.sala }} <br>
                        Professor: {{ n.professor }} <br>
                        Turma: {{ n.turma }}
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </v-col>
    </v-row>
    <hr>
    <v-row>
      <v-item-group
        multiple
      >
        <v-container v-if="statusProfessor">
          <v-col
            cols="12"
            md="12"
          >
            <h1 class="text-center">
              Professor
            </h1>
          </v-col>
          <v-row>
            <v-col
              cols="12"
              lg="4"
            >
              <base-material-chart-card
                :data="dailySalesChart.data"
                :options="dailySalesChart.options"
                color="success"
                hover-reveal
                type="Line"
              >
                <template v-slot:reveal-actions>
                  <v-tooltip bottom>
                    <template v-slot:activator="{ attrs, on }">
                      <v-btn
                        v-bind="attrs"
                        color="info"
                        icon
                        v-on="on"
                      >
                        <v-icon
                          color="info"
                        >
                          mdi-refresh
                        </v-icon>
                      </v-btn>
                    </template>

                    <span>Refresh</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ attrs, on }">
                      <v-btn
                        v-bind="attrs"
                        light
                        icon
                        v-on="on"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </template>

                    <span>Change Date</span>
                  </v-tooltip>
                </template>

                <h4 class="card-title font-weight-light mt-2 ml-2">
                  Daily Sales
                </h4>

                <p class="d-inline-flex font-weight-light ml-2 mt-1">
                  <v-icon
                    color="green"
                    small
                  >
                    mdi-arrow-up
                  </v-icon>
                  <span class="green--text">55%</span>&nbsp;
                  increase in today's sales
                </p>

                <template v-slot:actions>
                  <v-icon
                    class="mr-1"
                    small
                  >
                    mdi-clock-outline
                  </v-icon>
                  <span class="caption grey--text font-weight-light">updated 4 minutes ago</span>
                </template>
              </base-material-chart-card>
            </v-col>
            <v-col
              v-for="(n, index) in professor"
              :key="index"
            >
              <v-item style="box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.2);">
                <v-card
                  class="mx-auto"
                  max-width="300"
                  outlined
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="overline mb-1">
                        Sala: {{ n.sala }}
                      </div>
                      <v-list-item-title class="headline mb-1">
                        {{ n.turma }}
                      </v-list-item-title>
                      <v-list-item-subtitle>{{ n.turno }}  -  {{ n.hora }}</v-list-item-subtitle>
                      <v-list-item-subtitle>{{ n.inicio }} a {{ n.fim }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-card-actions>
                    <v-btn
                      rounded
                      color="success"
                    >
                      <v-icon left>
                        mdi-send
                      </v-icon>
                      Pegar
                    </v-btn>
                    <v-btn
                      rounded
                      color="error"
                    >
                      <v-icon left>
                        mdi-send
                      </v-icon>
                      Devolver
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'DashboardDashboard',
    data: () => ({
      salas: '',
      historico: '',
      professor: '',
      search: '',
      statusProfessor: true,
      statusPorteiro: true,
      dailySalesChart: {
        data: {
          labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
          series: [
            [12, 17, 7, 17, 23, 18, 38],
          ],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
    }),
    computed: {
      items () {
        return (this.historico)
      },
    },
    created () {
      this.initialize()
    },

    methods: {
      searchDialog () {
        this.dialogSearch = true
      },
      initialize () {
        this.historico = [
          {
            sala: '1405',
            professor: 'Henning 01',
            turma: 'PW',
          },
          {
            sala: '1403',
            professor: 'Henning 02',
            turma: 'PW',
          },
          {
            sala: '1406',
            professor: 'Henning 03',
            turma: 'PW',
          },
          {
            sala: '1406',
            professor: 'Henning 04',
            turma: 'PW',
          },
          {
            sala: '1406',
            professor: 'Henning 05',
            turma: 'PW',
          },
          {
            sala: '1406',
            professor: 'Henning 06',
            turma: 'PW',
          },
        ]
        this.salas = [
          {
            sala: '1405',
            professor: 'Henning 01',
            turma: 'PW',
            color: 'red',
          },
          {
            sala: '1404',
            professor: 'Henning 02',
            turma: 'Excel ++',
            color: 'green',
          },
          {
            sala: '1305',
            professor: 'Henning 04',
            turma: 'Banco de Dados',
            color: 'blue',
          },
          {
            sala: '1305',
            professor: 'Henning 05',
            turma: 'PW II',
            color: 'grey',
          },
          {
            sala: '1205',
            professor: 'Henning 06',
            turma: 'Excel Básico',
            color: 'green',
          },
          {
            sala: '1205',
            professor: 'Henning 06',
            turma: 'Excel Básico',
            color: 'red',
          },
          {
            sala: '1205',
            professor: 'Henning 06',
            turma: 'Excel Básico',
            color: 'grey',
          },
          {
            sala: '1205',
            professor: 'Henning 06',
            turma: 'Excel Básico',
            color: 'green',
          },
          {
            sala: '1205',
            professor: 'Henning 06',
            turma: 'Excel Básico',
            color: 'blue',
          },
        ]
        this.professor = [
          {
            sala: '1405',
            turma: 'PW',
            turno: 'tarde',
            hora: '08:20',
            inicio: '21/12/20',
            fim: '25/12/20',
          },
          {
            sala: '1406',
            turma: 'PW',
            turno: 'noite',
            hora: '08:20',
            inicio: '21/12/20',
            fim: '25/12/20',
          },
          {
            sala: '1401',
            turma: 'Excel',
            turno: 'manhã',
            hora: '08:20',
            inicio: '21/12/20',
            fim: '25/12/20',
          },
          {
            sala: '1402',
            turma: 'Lógica de Programação',
            turno: 'tarde',
            hora: '08:20',
            inicio: '21/12/20',
            fim: '25/12/20',
          },
          {
            sala: '1405',
            turma: 'Banco de Dados',
            turno: 'noite',
            hora: '08:20',
            inicio: '21/12/20',
            fim: '25/12/20',
          },
          {
            sala: '1404',
            turma: 'Programador Web II',
            turno: 'tarde',
            hora: '08:20',
            inicio: '21/12/20',
            fim: '25/12/20',
          },
        ]
      },
    },
  }
</script>

<style scoped>
/* .historico {
  margin-top: 10px;
} */
</style>
