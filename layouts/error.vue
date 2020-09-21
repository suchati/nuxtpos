<template>
  <v-app dark>
    <v-main :class="$vuetify.theme.dark ? '' : 'grey lighten-2'">
      <v-container fill-height style="height: calc(100vh - 58px);">
        <v-layout align-center>
          <v-flex text-center>
            <h1 v-if="error.statusCode === 404" class="display-2 primary--text">
              {{ pageNotFound }}
            </h1>
            <h1 v-else class="text-h1">
              {{ otherError }}
            </h1>
            <p>Sorry! Cannot seem to find the page you were looking for</p>
            <v-btn outlined color="primary" to="/">
              Back to Dashboard
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
