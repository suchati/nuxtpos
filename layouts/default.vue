<template>
  <v-app>
    <v-main :class="$vuetify.theme.dark ? '' : 'grey lighten-2'">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Default'
}
</script>
