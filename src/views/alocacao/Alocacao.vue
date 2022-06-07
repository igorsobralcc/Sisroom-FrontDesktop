<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-app-bar
      color="deep-purple"
      dark
    >
      <v-toolbar-title>
        <v-breadcrumbs :items="turma">
          <template v-slot:divider>
            <v-icon>mdi-forward</v-icon>
          </template>
        </v-breadcrumbs>
      </v-toolbar-title>
    </v-app-bar>
    <v-data-table
      :headers="headers"
      :items="alocacoes"
      sort-by="nome"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <v-card>
              <v-app-bar
                color="deep-purple"
                dark
              >
                <v-icon
                  small
                  class="mr-2"
                >
                  mdi-pencil
                </v-icon>
                <v-toolbar-title>{{ formTitle }}</v-toolbar-title>
              </v-app-bar>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-card>
                        <v-container fluid>
                          <v-row align="center">
                            <v-col cols="12" />
                            <v-col cols="12" />
                            <v-col cols="12">
                              <v-autocomplete
                                v-model="editedItem.idDisciplina"
                                :items="itemsDisciplina"
                                dense
                                filled
                                label="Disciplina"
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-card>
                        <v-container fluid>
                          <v-row align="center">
                            <v-col cols="12" />
                            <v-col cols="12" />
                            <v-col cols="12">
                              <v-autocomplete
                                v-model="editedItem.idProfessor"
                                :items="itemsProfessor"
                                dense
                                filled
                                label="Professor"
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-card>
                        <v-container fluid>
                          <v-row align="center">
                            <v-col cols="12" />
                            <v-col cols="12" />
                            <v-col cols="12">
                              <v-autocomplete
                                v-model="editedItem.idSala"
                                :items="itemsSala"
                                dense
                                filled
                                label="Sala"
                              />
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card>
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.nomeTurma"
                        label="Turma"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="6"
                    >
                      <v-container
                        class="px-0"
                        fluid
                      >
                        <v-switch
                          v-model="editedItem.status"
                          :label="'Status: ' + (editedItem.status ? 'Ativado' : 'Desativado')"
                        />
                      </v-container>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="red"
                  dark
                  class="mb-2"
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="green"
                  dark
                  class="mb-2"
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogDelete"
            max-width="600px"
          >
            <v-card>
              <v-app-bar
                color="deep-purple"
                dark
              >
                <v-icon
                  small
                  class="mr-2"
                >
                  mdi-delete
                </v-icon>
                <v-toolbar-title>Deletar Disciplina</v-toolbar-title>
              </v-app-bar>
              <v-card-title class="headline">
                <strong>Tem certeza de que deseja excluir</strong> <br><br> {{ alocacao }}?
              </v-card-title>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="red"
                  dark
                  class="mb-2"
                  @click="closeDelete"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="green"
                  dark
                  class="mb-2"
                  @click="deleteRow(delItem)"
                >
                  OK
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="dialogSearch"
            max-width="500px"
          >
            <v-card>
              <v-app-bar
                color="deep-purple"
                dark
              >
                <v-icon
                  small
                  class="mr-2"
                >
                  mdi-magnify
                </v-icon>
                <v-toolbar-title>Pesquisar Disciplina</v-toolbar-title>
              </v-app-bar>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="12"
                      md="12"
                    >
                      <v-text-field
                        label="Digite sua pesquisa"
                        @click="searchItem"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="red"
                  dark
                  class="mb-2"
                  @click="closeSearch"
                >
                  Cancelar
                </v-btn>
                <v-btn
                  color="green"
                  dark
                  class="mb-2"
                  @click="searchItem"
                >
                  OK
                </v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
    <v-speed-dial
      v-model="fab"
      bottom
      :direction="direction"
      :open-on-hover="hover"
      :transition="transition"
      right
      fixed
      absolute
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          color="blue darken-2"
          dark
          fab
        >
          <v-icon v-if="fab">
            mdi-close
          </v-icon>
          <v-icon v-else>
            mdi-menu
          </v-icon>
        </v-btn>
      </template>
      <v-btn
        fab
        dark
        small
        color="green"
        @click="cadastraAloc"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        fab
        dark
        small
        color="indigo"
        @click="searchDialog"
      >
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-speed-dial>
  </v-container>
</template>
<script>
  import AlocacaoDataService from '@/services/AlocacaoDataService.js'
  import DisciplinaDataService from '@/services/DisciplinaDataService.js'
  import SalasDataService from '@/services/SalasDataService.js'
  import ProfessorDataService from '@/services/ProfessorDataService.js'
  export default {
    data: () => ({
      status: false,
      delItem: '',
      direction: 'top',
      transition: 'slide-y-reverse-transition',
      fab: false,
      hover: false,
      dialog: false,
      dialogDelete: false,
      dialogSearch: false,
      items: [],
      search: '',
      alocacao: '',
      turma: [],
      itemsDisciplina: [],
      disciplinas: [],
      itemsProfessor: [],
      professores: [],
      itemsSala: [],
      salas: [],
      headers: [
        {
          text: 'Disciplina',
          align: 'start',
          sortable: true,
          value: 'disciplina_id',
        },
        { text: 'Professor', value: 'professor' },
        { text: 'Sala', value: 'sala' },
        { text: 'Status', value: 'status' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      alocacoes: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        disciplina_id: '',
        professor_id: '',
        sala_id: '',
        nomeTurma: '',
        status: '',
        turma_id: '',
      },
      defaultItem: {
        idDisciplina: '',
        idProfessor: '',
        idSala: '',
        nomeTurma: '',
        status: '',
        turma_id: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Cadastrar Disciplina' : 'Editar Disciplina'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
    // this.initialize()
    },
    mounted () {
      this.getDataFromApi()
      this.buscarDados()
      const turmaNome = this.$route.params.turmaNome
      const idTurma = this.$route.params.turmaId
      const cursoNome = this.$route.params.cursoNome
      const cursoUrl = this.$route.params.url
      console.log('teste cursoid: ', cursoUrl)
      console.log('teste turmaid: ', idTurma)
      this.defaultItem.nomeTurma = turmaNome
      this.editedItem.nomeTurma = turmaNome
      this.defaultItem.turma_id = idTurma
      this.editedItem.turma_id = idTurma
      console.log('teste: ', this.defaultItem.nomeTurma)
      this.turma = this.turma = [
        {
          text: 'Curso',
          disable: false,
          href: '#/curso',
        },
        {
          text: cursoNome,
          disable: false,
          href: '#/turma/' + cursoUrl,
          params: { cursoNome },
        },
        {
          text: turmaNome,
          disable: true,
          href: '',
        },
      ]
    },

    methods: {
      searchDialog () {
        this.dialogSearch = true
      },
      async buscarDados () {
        const dataDisciplina = await DisciplinaDataService.getAllActive()
        console.log('discAquio: ', dataDisciplina)
        for (var i = 0; i < dataDisciplina.data.length; i++) {
          this.itemsDisciplina.push(dataDisciplina.data[i].nome)
          this.disciplinas.push(dataDisciplina.data[i].id)
        }
        const dataProfessor = await ProfessorDataService.getAllActive()
        console.log('profAquio: ', dataProfessor)
        for (var z = 0; z < dataProfessor.data.length; z++) {
          this.itemsProfessor.push(dataProfessor.data[z].nome)
          this.professores.push(dataProfessor.data[z].id)
        }
        const dataSala = await SalasDataService.getAll()
        console.log('salaAquio: ', dataSala)
        for (var j = 0; j < dataSala.data.length; j++) {
          this.itemsSala.push(dataSala.data[j].numero)
          this.salas.push(dataSala.data[j].id)
        }
      },

      cadastraAloc () {
        this.dialog = true
      },

      initialize () {
        this.alocacoes = []
      },

      searchItem (item) {
        this.editedIndex = this.alocacoes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogSearch = true
      },

      editItem (item) {
        this.editedIndex = this.alocacoes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.alocacoes.indexOf(item.id)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        this.delItem = Object.assign({}, item)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeSearch () {
        this.dialogSearch = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      async save () {
        const alocacaoId = this.editedItem.id
        const data = {
          disciplina_id: this.disciplinas[this.itemsDisciplina.indexOf(this.editedItem.idDisciplina)],
          turma_id: this.defaultItem.turma_id,
          sala_id: this.salas[this.itemsSala.indexOf(this.editedItem.idSala)],
          professor_id: this.professores[this.itemsProfessor.indexOf(this.editedItem.idProfessor)],
        }
        console.log('salvar: ', data)
        const val = this.formTitle.indexOf('Edit') === 0 ? 'edit' : 'save'
        if (val === 'edit') {
          await AlocacaoDataService.update(alocacaoId, data)
            .then((res) => {
              this.alert = true
              this.alertSave = res.data.name + ' edited success'
              this.getDataFromApi()
              this.close()
              console.log('Atualizei: ', res)
            })
            .catch((res) => {
              console.log('error: ', res)
            })
        } else {
          await AlocacaoDataService.create(data)
            .then((res) => {
              this.alert = true
              this.alertSave = res.data.name + ' saved success'
              this.getDataFromApi()
              this.close()
              console.log('salvei: ', res)
            })
            .catch((error) => {
              this.alert = true
              this.alertSave =
                error.response.data.errors.id[0] +
                ' ' +
                error.response.data.message
            })
        }
      },

      async getDataFromApi () {
        this.tableLoading = true
        const data = await AlocacaoDataService.getAllActive()
        console.log('listando: ', data)
        this.alocacoes = data.data
        this.nomeDisciplina()
        this.nomeProfessor()
        this.numeroSala()
      },

      async deleteRow (item) {
        await AlocacaoDataService.delete(item.id)
          .then(() => {
            this.alertSave = item.name + ' deleted success'
            console.log('delete: ', item.id)
            this.alert = true
            this.dialogDelete = false
            this.getDataFromApi()
          })
          .catch((error) => {
            console.log(error)
          })
      },
      limpaForm () {
        this.editedItem.id = ''
        this.editedItem.name = ''
      },

      async nomeDisciplina () {
        for (var i in this.alocacoes) {
          var idDisciplina = this.alocacoes[i].disciplina_id
          var dataDisciplina = await DisciplinaDataService.get(idDisciplina)
          var disciplina = dataDisciplina.data
          var nomeDisciplina = disciplina.nome
          this.alocacoes[i].disciplina_id = nomeDisciplina
        }
      },

      async nomeProfessor () {
        for (var i in this.alocacoes) {
          var idProfessor = this.alocacoes[i].professor_id
          var dataProfessor = await ProfessorDataService.get(idProfessor)
          var professor = dataProfessor.data
          var nomeProfessor = professor.nome
          this.alocacoes[i].professor_id = nomeProfessor
        }
      },

      async numeroSala () {
        for (var i in this.alocacoes) {
          var idSala = this.alocacoes[i].sala_id
          var dataSala = await SalasDataService.get(idSala)
          var sala = dataSala.data
          var numeroSala = sala.numero
          this.alocacoes[i].sala_id = numeroSala
        }
      },
    },
  }
</script>
<style>
.v-breadcrumbs a {
  color: white !important;
  font-size: 20px !important;
}
</style>
