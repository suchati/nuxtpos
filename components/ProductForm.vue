<template>
  <v-dialog v-model="Product_dialog" max-width="400">
    <v-card class="px-5">
      <v-form ref="form_add_edit" @submit.prevent="save">
        <v-card-title>
          <span class="headline">{{ FormTitle }}</span>
          <v-spacer />
          <v-icon @click="Product_dialog=false">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="product.p_code"
                v-mask="mask_barcode"
                label="Barcode"
                :rules="[
                  v => !!v || 'enter Barcode',
                  v => (v && v.length >= 13) || 'Min 13 characters'
                ]"
                :disabled="mode=='edit'"
                validate-on-blur
              />
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex>
              <v-text-field
                v-model="product.p_name"
                label="ProductName"
                :rules="[v => !!v || 'enter_name']"
                validate-on-blur
              />
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs6 class="pr-3">
              <v-text-field
                v-model="product.cost_price"
                label="Price"
                :rules="[v => !!v || 'p_cost']"
                suffix="฿"
                type="number"
                validate-on-blur
              />
            </v-flex>
            <v-flex xs6 class="pl-3">
              <v-text-field
                v-model="product.sale_price"
                validate-on-blur
                label="Sale"
                suffix="฿"
                type="number"
                :rules="[v => !!v || 'sale_price', check_price || 'check_price']"
              />
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs6 class="pr-1">
              <v-text-field
                v-model="product.stock"
                validate-on-blur
                label="Stock"
                type="number"
                :rules="[ v => !!v || 'p_stock']"
              />
            </v-flex>
            <v-flex xs6 class="pl-1">
              <v-select
                v-model="product.category"
                :items="category"
                item-text="c_name"
                item-value="c_id"
                label="Category"
              />
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="product.p_details"
                label="Details"
              />
            </v-flex>
          </v-layout>
          <v-layout wrap>
            <v-flex xs12>
              <v-file-input
                v-if="mode==='add'"
                v-model="product.p_img"
                label="Img"
                validate-on-blur
                :rules="imgRules"
                accept="image/*"
                class="py-0"
              />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider />
        <v-card-actions class="pa-5">
          <v-spacer />
          <v-btn color="error" @click="close">
            CLOSE
          </v-btn>
          <v-btn color="success" type="submit">
            {{ mode=='add'?'SAVE':'UPDATE' }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      Product_dialog: false,
      mode: '',
      product: {
        p_id: '',
        p_code: '',
        p_name: '',
        cost_price: '',
        sale_price: '',
        stock: '',
        p_details: '',
        p_img: [],
        category: '',
        supplier: ''
      },
      mask_barcode: '#############',
      imgRules: [v => !v || v.size < 2000000 || 'Img size should be less than 2 MB!'],
      category: [],
      img: undefined
    }
  },
  computed: {
    FormTitle () {
      return this.mode === 'add' ? 'New Product' : 'Edit Product'
    },
    check_price () {
      return Number(this.product.sale_price) >= Number(this.product.cost_price)
    }
  },
  watch: {
    mode (val) {
      if (val === 'add') {
        this.reset_form()
      }
    }
  },
  mounted () {
    this.fetchcategory()
  },
  methods: {
    async fetchcategory () {
      await this.$axios.$get('/stores/category').then((res) => {
        if (res.success) {
          this.category = res.category
        }
      })
    },
    open (mode, data) {
      this.Product_dialog = true
      this.mode = mode
      if (data) {
        this.product = { ...data }
      }
    },
    close () {
      this.Product_dialog = false
      this.reset_form()
    },
    reset_form () {
      this.product = {
        p_id: '',
        p_code: '',
        p_name: '',
        cost_price: '',
        sale_price: '',
        stock: '',
        p_details: '',
        p_img: [],
        category: '',
        supplier: ''
      }
    },
    save () {
      if (this.$refs.form_add_edit.validate()) {
        this.$emit(this.mode, this.product)
      }
    }
  }
}
</script>
