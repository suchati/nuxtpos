<template>
  <v-select
    v-model="language"
    :items="lang"
    class="px-3 py-2 rounded-lg"
    :class="[`elevation-${elevation}`]"
    style="height: 3.1rem;"
    :style="{'max-width': width}"
  >
    <template v-slot:item="{ item }">
      <v-list-item :to="switchLocalePath(item.src)">
        <v-list-item-content>
          {{ item.text }}
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: null
    },
    elevation: {
      type: String,
      default: '2'
    }
  },
  data: () => ({
    language: { text: 'EN', src: 'en' },
    lang: [
      { text: 'EN', src: 'en' },
      { text: 'TH', src: 'th' }
    ]
  }),
  mounted () {
    this.language = {
      text: this.$i18n.locale === 'th' ? 'TH' : 'EN',
      src: this.$i18n.locale.code
    }
  }
}
</script>
