<template>
  <div>
    <v-card class="pa-5">
      <v-data-table
        :headers="headers"
        :items="products"
        :search="search"
      >
        <template v-slot:top>
          <v-card-title>
            <v-divider class="mx-4" vertical />
            <v-btn color="primary" dark @click="Add">
              <v-icon>mdi-plus-circle-outline</v-icon> NEW product
            </v-btn>
            <v-divider class="mx-4" vertical />
            <v-btn color="primary" dark @click="Add">
              <v-icon>mdi-plus-circle-outline</v-icon> add product
            </v-btn>
            <v-divider class="mx-4" vertical />

            <v-spacer />

            <v-flex xs3 class="mb-n6">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                placeholder="Search"
                filled
                dense
              />
            </v-flex>
            <v-divider class="mx-4" vertical />
            <!-- <v-btn icon @click="$fetch">
              <v-icon>mdi-autorenew</v-icon>
            </v-btn> -->
          </v-card-title>
          <div class="py-2">
            <v-divider />
          </div>
        </template>

        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ index+1 }}</td>
              <td>
                <div @click="SHOW_Barcode(item)">
                  <barcode
                    :value="item.p_code"
                    format="EAN13"
                    height="10"
                    width="1"
                  /><!-- :background="$vuetify.theme.dark?'#fff':'#eee'" -->
                </div>
              </td>
              <td>{{ item.p_name }}</td>
              <td>{{ item.cost_price | currency('', 2, { decimalSeparator: '.' }) }}</td>
              <td>{{ item.sale_price | currency('', 2, { decimalSeparator: '.' }) }}</td>
              <td>{{ item.stock }}</td>
              <td>{{ item.c_name }}</td>
              <td width="120" align="right">
                <v-icon
                  small
                  class="mr-2"
                  @click="Edit(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="Delete(item)"
                >
                  mdi-delete
                </v-icon>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog v-model="barcode_dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>
          <v-spacer />
          <v-btn icon @click="barcode_dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <barcode
                :value="barcode"
                format="EAN13"
                height="20"
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="confirm" max-width="350">
      <v-card>
        <v-card-title class="headline">
          ยืนยันการลบ?
        </v-card-title>
        <v-card-text>
          เมื่อยืนยันคุณจะไม่สามารถกู้คืนข้อมูลนี้ได้
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="confirm = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="submitDelete">
            Confirm
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <snackbar ref="Alert" />
    <loading ref="loading" text="Home.Please_wait" />
    <product-form ref="productform" @add="submitAdd" @edit="submitEdit" />

    <v-navigation-drawer
      v-model="add_drawer"
      right
      absolute
      temporary
      width="500"
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            Application
          </v-list-item-title>
          <v-list-item-subtitle>
            subtext
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />
    </v-navigation-drawer>
  </div>
</template>

<script>
import VueBarcode from 'vue-barcode'
export default {
  middleware: ['Auth'],
  layout: 'Dashboard',
  components: {
    barcode: VueBarcode
  },
  data () {
    return {
      products: [],
      id: '',
      img: '',
      headers: [
        { text: '#', align: 'start', value: 'index' },
        { text: 'Barcode', value: 'p_code' },
        { text: 'Name ', value: 'p_name ' },
        { text: 'Cost', value: 'p_cost' },
        { text: 'Price', value: 'p_price' },
        { text: 'Stock', value: 'p_stock' },
        { text: 'Category', value: 'cat_name' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'right' }
      ],
      search: '',
      confirm: false,
      barcode_dialog: false,
      barcode: '',
      add_drawer: false
    }
  },
  mounted () {
    this.fetch()
  },
  methods: {
    async fetch () {
      await this.$axios.$get('/stores/products').then((res) => {
        this.products = res.products
      })
    },
    Add () {
      this.$refs.productform.open('add')
    },
    async submitAdd (data) {
      const product = this.DataForm({
        p_code: data.p_code,
        p_name: data.p_name,
        cost_price: data.cost_price,
        sale_price: data.sale_price,
        stock: data.stock,
        p_details: data.p_details,
        p_img: data.p_img,
        category: data.category
      })
      await this.$axios.$post('/stores/addproduct', product,
        {
          headers: {
            'Content-type': 'multipart/form-data'
          }
        }).then((res) => {
        if (res.success) {
          this.$refs.Alert.SHOW('success', 'Add product success')
          this.$refs.productform.close()
          this.fetch()
        } else {
          this.$refs.Alert.SHOW('error', 'Can`t Add product ')
        }
      })
    },
    Edit (data) {
      this.id = data.p_id
      this.$refs.productform.open('edit', data)
    },
    async submitEdit (data) {
      this.loading_dialog = true
      await this.$axios.$put(`/stores/update/${this.id}`, data)
        .then((res) => {
          if (res.success) {
            this.$refs.Alert.SHOW('success', 'Update User success')
          } else {
            this.$refs.Alert.SHOW('error', 'Error Update')
          }
          this.fetch()
          this.$refs.productform.close()
          this.loading_dialog = false
        })
    },
    Delete (data) {
      this.id = data.p_id
      this.img = data.p_img
      this.confirm = true
    },
    async submitDelete () {
      this.confirm = false
      await this.$axios.$delete(`/stores/delete/${this.id}/${this.img}`)
        .then((res) => {
          if (res.success) {
            this.$refs.Alert.SHOW('success', 'Delete Product success')
          } else {
            this.$refs.Alert.SHOW('error', 'Error Delete')
          }
          this.id = ''
          this.img = ''
          this.fetch()
        })
    },
    SHOW_Barcode (item) {
      this.barcode = item.p_code
      this.barcode_dialog = true
    },
    imgproduct (img) {
      if (!img) {
        return 'img-no-product.png'
      } else {
        return img
      }
    },
    DataForm (obj) {
      const Data = new FormData()
      for (const key in obj) {
        Data.append(key, obj[key])
      }
      return Data
    }
  }
}
</script>
