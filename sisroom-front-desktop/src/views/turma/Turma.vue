<template>
  <v-container
    id="turma"
    fluid
    tag="section"
  >
    <v-app-bar
      color="deep-purple"
      dark
    >
      <v-toolbar-title>
        <v-breadcrumbs
          :items="curso"
        >
          <template v-slot:divider>
            <v-icon>mdi-forward</v-icon>
          </template>
        </v-breadcrumbs>
      </v-toolbar-title>
    </v-app-bar>
    <v-data-table
      :headers="headers"
      :items="turmas"
      sort-by="nome"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
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
                      md="8"
                    >
                      <v-text-field
                        v-model="editedItem.nome"
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
                  Cancelar
                </v-btn>
                <v-btn
                  color="green"
                  dark
                  class="mb-2"
                  @click="save"
                >
                  Salvar
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
                <v-toolbar-title>Excluir Turma</v-toolbar-title>
              </v-app-bar>
              <v-card-title class="headline">
                <strong>Tem certeza de que deseja excluir a turma</strong> <br><br> {{ turma }}?
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
                <v-toolbar-title>Pesquisar Turma</v-toolbar-title>
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
      <template v-slot:[`item.nome`]="{ item }">
        <router-link
          :to="{
            name: 'Alocação',
            params: { turmaNome: item.nome, turmaId: item.id, cursoNome: curso[1], url: cursoIdUrl },
          }"
        >
          {{ item.nome }}
        </router-link>
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
        @click="dialog=true"
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
  import TurmaDataService from '@/services/TurmaDataService.js'
  export default {
    data: () => ({
      status: false,
      delItem: '',
      direction: 'top',
      transition: 'slide-y-reverse-transition',
      fab: false,
      hover: false,
      dialog: false,
      cursoIdUrl: '',
      dialogDelete: false,
      dialogSearch: false,
      items: [],
      search: '',
      curso: [],
      headers: [
        {
          text: 'Turmas',
          align: 'start',
          sortable: true,
          value: 'nome',
        },
        { text: 'Status', value: 'status' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      turmas: [],
      editedIndex: -1,
      editedItem: {
        nomeCurso: '',
        nome: '',
      },
      defaultItem: {
        nomeCurso: '',
        nome: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Nova Turma' : 'Editar Turma'
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
      this.cursoIdUrl = this.$route.params.cursoId
      console.log('testeid: ', this.cursoIdUrl)
      const cursoNome = this.$route.params.cursoNome
      this.defaultItem.nomeCurso = cursoNome
      console.log('teste: ', this.$route.params)
      this.curso =
        this.curso = [
          {
            text: 'Curso',
            disable: false,
            href: '#/curso',
          },
          {
            text: cursoNome,
            disable: true,
            href: '#/turma/' + this.cursoIdUrl,
          },
        ]
    },

    methods: {
      searchDialog () {
        this.dialogSearch = true
      },
      initialize () {
        this.turmas = []
      },

      searchItem (item) {
        this.editedIndex = this.turmas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogSearch = true
      },

      editItem (item) {
        this.editedIndex = this.turmas.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.turmas.indexOf(item.id)
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
        const turmaId = this.editedItem.id
        const data = {
          nome: this.editedItem.nome,
          curso_id: this.cursoIdUrl,
        }
        const val = this.formTitle.indexOf('Edit') === 0 ? 'edit' : 'save'
        if (val === 'edit') {
          await TurmaDataService.update(turmaId, data)
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
          await TurmaDataService.create(data)
            .then((res) => {
              this.alert = true
              this.alertSave = res.data.name + ' saved success'
              this.getDataFromApi()
              this.close()
              console.log('salvei: ', res)
            })
            .catch((error) => {
              this.alert = true
              this.alertSave = error.response.data.errors.id[0] + ' ' + error.response.data.message
            })
        }
      },

      async getDataFromApi () {
        this.tableLoading = true
        const data = await TurmaDataService.getAllActive()
        console.log('listando: ', typeof (data.data))
        this.turmas = data.data
      },

      async deleteRow (item) {
        await TurmaDataService.delete(item.id)
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
    },
  }
</script>
<style>
  .v-breadcrumbs a {
    color: white !important;
    font-size: 20px;
  }
</style>
