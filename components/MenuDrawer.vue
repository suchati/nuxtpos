<template>
  <div>
    <v-list-item :to="route" link>
      <v-list-item-icon :class="mini">
        <v-icon>mdi-{{ icon }}</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title>{{ title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider :class="divider" />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: null
    },
    mini: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    route: {
      type: String,
      default: null
    },
    divider: {
      type: String,
      default: null
    }
  }
}
</script>
