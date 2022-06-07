<template>
  <v-app-bar
    absolute
    color="transparent"
    flat
    height="85"
  >
    <v-container class="px-0 text-right d-flex align-center">
      <v-spacer />
    </v-container>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'PagesCoreAppBar',

    data: () => ({
      items: [
        {
          icon: 'mdi-view-dashboard',
          text: 'Dashboard',
          to: '/',
        },
        {
          icon: 'mdi mdi-account-key',
          text: 'Porteiro',
          to: '/pages/porteiro',
        },
        {
          icon: 'mdi mdi-account-key',
          text: 'Salas',
          to: '/pages/salas',
        },
        {
          icon: 'mdi-currency-usd',
          text: 'Pricing',
          to: '/pages/pricing',
        },
        {
          icon: 'mdi-account-multiple-plus',
          text: 'Register',
          to: '/pages/register',
        },
        {
          icon: 'mdi-fingerprint',
          text: 'Login',
          to: '/pages/login',
        },
        {
          icon: 'mdi-lock-open-outline',
          text: 'Lock',
          to: '/pages/lock',
        },
      ],
      titles: {
        '/pages/lock': 'Lock Page',
        '/pages/login': 'Login Page',
        '/pages/pricing': 'Pricing Page',
        '/pages/register': 'Register Page',
      },
    }),

    computed: {
      title () {
        return this.titles[this.$route.path]
      },
    },
  }
</script>
