<template>
  <v-app>
    <v-app-bar app>
      <v-app-bar-nav-icon @click.stop="mini = !mini">
        <v-icon v-if="mini">
          mdi-format-indent-increase
        </v-icon>
        <v-icon v-else>
          mdi-format-indent-decrease
        </v-icon>
      </v-app-bar-nav-icon>

      <v-divider class="mx-3" inset vertical />

      <v-toolbar-title>
        Dashboard
      </v-toolbar-title>

      <v-spacer />

      <v-divider class="mx-3" inset vertical />

      <v-badge
        class="mr-5"
        :color="stock > 0 ? 'error' : ''"
        :content="stock > 0 ? stock : ''"
        overlap
      >
        <v-icon>
          mdi-bell
        </v-icon>
      </v-badge>

      <v-divider class="mx-3" inset vertical />

      <v-btn icon @click="setting_Drawer = true">
        <v-icon>
          mdi-cog-outline
        </v-icon>
      </v-btn>

      <v-divider class="mx-3" inset vertical />

      <v-menu
        v-model="menu_bar"
        offset-y
        origin="top right"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>
              mdi-account-settings-outline
            </v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-key-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Change Password</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item to="Profile">
              <v-list-item-icon>
                <v-icon>mdi-account-cog-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Profile</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item @click="dialog_logout = true">
              <v-list-item-icon>
                <v-icon>mdi-power</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>LOGOUT</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="setting_Drawer" right temporary fixed>
      <v-row class="px-5 py-2">
        <v-spacer />
        <v-btn icon @click="setting_Drawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-row>

      <v-divider />

      <v-list nav>
        <v-list-item class="my-n5">
          <v-list-item-content>
            <v-list-item-title>Dark Mode</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-switch v-model="Dark" inset :label="Dark ? 'ON' : 'OFF'" />
          </v-list-item-icon>
        </v-list-item>

        <v-divider />

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Language</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon class="my-0">
            <language width="80px" elevation="1" />
          </v-list-item-icon>
        </v-list-item>

        <v-divider />
      </v-list>
    </v-navigation-drawer>

    <v-navigation-drawer
      v-model="sidebar_Drawer"
      app
      permanent
      :mini-variant="mini"
      mini-variant-width="80"
      :class="$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-4'"
    >
      <v-list-item :class="mini ? 'px-2' : ''">
        <v-list-item-avatar>
          <v-img :src="LOGO" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">
            {{ user.username }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ user.email }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mt-2" />

      <v-list :dense="mini" nav>
        <menu-drawer
          v-for="rout in routlist"
          :key="rout.route"
          :route="localePath(rout.route)"
          :mini="mini ? '' : 'pl-2'"
          :icon="rout.icon"
          :title="rout.text"
          :divider="mini ? 'mb-1' : 'mb-2'"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main :class="$vuetify.theme.dark ? '' : 'grey lighten-2'">
      <v-container>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-main>

    <v-dialog v-model="dialog_logout" max-width="320">
      <v-card class="pa-3">
        <v-card-title class="headline">
          LOGOUT
        </v-card-title>
        <v-card-text>
          You want to LOGOUT NOW!
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn dark color="green darken-1" @click="LOGOUT">
            Yes
          </v-btn>
          <v-btn dark color="error" @click="dialog_logout = false">
            NO
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import store from 'store'
export default {
  name: 'Dashbaord',
  data: () => ({
    mini: true,
    setting_Drawer: false,
    menu_bar: false,
    sidebar_Drawer: true,
    dialog_logout: false,
    Dark: store.get('Dark'),
    stock: '',
    user: {},
    LOGO: require('~/assets/images/LOGO.png'),
    routlist: [
      {
        text: 'Dashboard',
        route: '/Home',
        icon: 'view-dashboard'
      },
      {
        text: 'Users',
        route: '/users',
        icon: 'account-tie'
      },
      {
        text: 'Stores',
        route: '/stores',
        icon: 'store'
      },
      {
        text: 'Customers',
        route: '/customers',
        icon: 'account-group'
      },
      {
        text: 'Listsale',
        route: '/listsale',
        icon: 'clipboard-text-outline'
      },
      {
        text: 'Sales',
        route: '/sales',
        icon: 'cash-register'
      }
    ]
  }),
  watch: {
    Dark (val) {
      store.set('Dark', val)
      // const setdark = store.get('Dark') === 'true' ? 1 : 0
      this.$vuetify.theme.dark = store.get('Dark')
    }
  },
  mounted () {
    if (store.get('Dark')) {
      this.$vuetify.theme.dark = true
    } else {
      this.$vuetify.theme.dark = false
    }
    this.Notifications()
    this.user = this.$store.state.auth.user
  },
  methods: {
    LOGOUT () {
      store.remove('Auth')
      store.remove('token')
      this.$auth.logout()
      this.$router.go('/Login')
    },
    async Notifications () {
      await this.$axios.$post('/home/notifications')
        .then((res) => {
          if (res.success) {
            const data = res.stock
            data.forEach((el) => {
              this.stock += el.stock
            })
          }
        })
    }
  },
  head () {
    return {
      title: 'Dashboard'
    }
  }
}
</script>
