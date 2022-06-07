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
      <v-icon
        small
        class="mr-2"
      >
        mdi-account-key
      </v-icon>
      <v-toolbar-title>Tabela Porteiro</v-toolbar-title>
    </v-app-bar>
    <v-data-table
      :headers="headers"
      :items="porteiros"
      sort-by="matricula"
      class="elevation-1"
      :search="search"
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
                      sm="8"
                      md="8"
                    >
                      <v-text-field
                        v-model="editedItem.nome"
                        label="Nome"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.matricula"
                        label="Matrícula"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="8"
                    >
                      <v-text-field
                        v-model="editedItem.email"
                        label="E-mail"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="8"
                    >
                      <v-text-field
                        v-model="editedItem.senha"
                        label="Senha"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.contato"
                        label="Contato"
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
                <v-toolbar-title>Deletar Porteiro</v-toolbar-title>
              </v-app-bar>
              <v-card-title class="headline">
                <strong>Tem certeza de que deseja excluir</strong> <br><br>
                {{ porteiro }}?
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
                <v-toolbar-title>Pesquisar Porteiro</v-toolbar-title>
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
  import PorteiroDataService from '@/services/PorteiroDataService.js'
  export default {
    data: () => ({
      status: false,
      direction: 'top',
      transition: 'slide-y-reverse-transition',
      fab: false,
      hover: false,
      delItem: '',
      porteiro: '',
      dialog: false,
      dialogDelete: false,
      dialogSearch: false,
      items: [],
      search: '',
      headers: [
        { text: 'Matrícula', value: 'matricula' },
        { text: 'Id', value: 'id' },
        {
          text: 'Nome',
          align: 'start',
          sortable: true,
          value: 'nome',
          filterable: true,
        },
        { text: 'E-mail', value: 'email' },
        { text: 'Contato', value: 'contato' },
        { text: 'Status', value: 'status' },
        { text: 'Ações', value: 'actions', sortable: false },
      ],
      porteiros: [],
      editedIndex: -1,
      editedItem: {
        id: '',
        nome: '',
        matricula: '',
        email: '',
        contato: '',
        status: '',
      },
      defaultItem: {
        nome: '',
        matricula: '',
        email: '',
        contato: '',
        status: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Cadastrar Porteiro' : 'Editar Porteiro'
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
    },

    methods: {
      searchDialog () {
        this.dialogSearch = true
      },
      initialize () {
        this.porteiros = []
      },

      searchItem (item) {
        this.editedIndex = this.porteiros.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogSearch = true
      },

      editItem (item) {
        this.editedIndex = this.porteiros.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.porteiro.indexOf(item.id)
        this.editedItem = Object.assign({}, item.id)
        this.deleteRow(item.id)
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
        // this.alert = false
        const porteiroId = this.editedItem.id
        const data = {
          nome: this.editedItem.nome,
          matricula: this.editedItem.matricula,
          contato: this.editedItem.contato,
          email: this.editedItem.email,
          senha: this.editedItem.senha,
        }
        const val = this.formTitle.indexOf('Edit') === 0 ? 'edit' : 'save'
        if (val === 'edit') {
          await PorteiroDataService.update(porteiroId, data)
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
          // salvar
          await PorteiroDataService.create(data)
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
        // this.alert = false
        }
      },

      async getDataFromApi () {
        this.tableLoading = true
        const data = await PorteiroDataService.getAllActive()
        console.log('listando: ', data)
        // this.pathAPP = data.config.url
        // this.pathAPP1 = this.pathAPP.replace('/motor/', '')
        this.porteiros = data.data
      // this.breadcrumbs = this.pathAPP.replace('/motor/', '').toUpperCase()
      // console.log('bread: ', this.breadcrumbs)
      // this.itemsLength = data.lenght
      // this.tableLoading = false
      // console.log('getapi: ', data)
      },

      async deleteRow (porteiro) {
        await PorteiroDataService.delete(porteiro.id)
          .then(() => {
            this.alertSave = porteiro.name + ' deleted success'
            console.log('delete: ', porteiro.id)
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
