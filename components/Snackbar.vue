<template>
  <v-snackbar
    v-model="Alert.show"
    top
    :color="Alert.type"
  >
    {{ Alert.msg }}
    <template v-slot:action="{ attrs }">
      <v-icon v-bind="attrs" @click="Alert.show = false">
        mdi-close
      </v-icon>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data: () => ({
    Alert: {
      show: false,
      type: null,
      msg: ''
    }
  }),
  methods: {
    SHOW (type, msg) {
      this.Alert = { show: true, type, msg }
    }
  }
}
</script>
