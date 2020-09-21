<template>
  <v-dialog
    v-model="loading"
    hide-overlay
    persistent
    width="300"
  >
    <v-card
      color="primary"
      class="pa-1"
      dark
    >
      <v-card-text>
        {{ text }}
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Please wait......'
    }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    SET_Loading (data) {
      this.loading = data
    }
  }
}
</script>
