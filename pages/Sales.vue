<template>
  <v-container fluid>
    <v-row class="my-n4">
      <v-col md="8" xs="6">
        <v-card height="97vh">
          <v-tabs v-model="tab" grow>
            <v-tab v-for="(item, i ) in items" :key="i">
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-divider />

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <v-card flat color="basil">
                <v-card-text>
                  <v-row class="mx-auto">
                    <v-col
                      v-for="product in products"
                      :key="product.p_code"
                      cols="4"
                      md="2"
                    >
                      <v-hover v-slot:default="{ hover }">
                        <v-card
                          :disabled="item_disabled"
                          tile
                          outlined
                          class="text-center pa-1"
                          :elevation="hover ? 2 : 0"
                          @click="get_product(product.p_code)"
                        >
                          <v-img
                            :src="imgproduct(product.p_img)"
                            height="80px"
                          />
                          <v-card-text>
                            <span class="caption">
                              {{ product.p_name }}
                            </span>
                            <div class="flex-grow-1" />
                            <span class="title">
                              {{ product.sale_price | currency('', 2, { decimalSeparator: '.', symbolOnLeft: false }) }}
                            </span>
                          </v-card-text>
                        </v-card>
                      </v-hover>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-row>
                    <v-col cols="12">
                      <v-container fluid>
                        <v-img
                          :src="AD"
                          aspect-ratio="1.8"
                          contain
                        />
                      </v-container>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-row class="fill-height" align="center" justify="center">
                    <template v-for="(item, i) in itemstest">
                      <v-col :key="i" cols="12" md="4">
                        <v-hover v-slot:default="{ hover }">
                          <v-card
                            class="card-hover"
                            :elevation="hover ? 12 : 2"
                            :class="{ 'on-hover': hover }"
                          >
                            <v-img :src="item.img" height="225px">
                              <v-card-title class="title white--text">
                                <v-row
                                  class="fill-height flex-column"
                                  justify="space-between"
                                >
                                  <p class="mt-4 subheading text-left">
                                    {{ item.title }}
                                  </p>
                                  <div>
                                    <p
                                      class="ma-0 body-1 font-weight-bold font-italic text-left"
                                    >
                                      {{ item.text }}
                                    </p>
                                    <p
                                      class="caption font-weight-medium font-italic text-left"
                                    >
                                      {{ item.subtext }}
                                    </p>
                                  </div>

                                  <div class="align-self-center">
                                    <v-btn
                                      v-for="(icon, index) in icons"
                                      :key="index"
                                      :class="{ 'show-btns': hover }"
                                      color="transparent"
                                      icon
                                    >
                                      <v-icon
                                        :class="{ 'show-btns': hover }"
                                        color="transparent"
                                      >
                                        {{ icon }}
                                      </v-icon>
                                    </v-btn>
                                  </div>
                                </v-row>
                              </v-card-title>
                            </v-img>
                          </v-card>
                        </v-hover>
                      </v-col>
                    </template>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
      <v-col md="4" xs="6">
        <v-card class="d-flex align-start flex-column pa-1" height="97vh">
          <v-card class="pa-2" flat width="100%">
            <v-form ref="form" @submit.prevent="find_barcode">
              <v-text-field
                id="barcode"
                ref="barcode"
                v-model="barcode"
                label="Barcode"
                :error-messages="error_msg"
                :disabled="item_disabled"
                outlined
              >
                <template v-slot:append>
                  <v-divider class="mx-2 my-n2" vertical />
                  <v-icon @click="find_barcode">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-text-field>
            </v-form>
          </v-card>

          <v-card class="pa-2 mb-auto mt-n5" flat width="100%">
            <v-divider />
            <v-list dense>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    <strong>
                      Name
                    </strong>
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                  <v-list-item-title>
                    <strong>
                      Num
                    </strong>
                  </v-list-item-title>
                </v-list-item-content>

                <v-list-item-action>
                  <strong>
                    Total
                  </strong>
                </v-list-item-action>

                <v-list-item-action />
              </v-list-item>

              <v-divider />

              <v-virtual-scroll
                :items="listsale"
                :item-height="50"
                bench="10"
                height="225"
              >
                <template v-slot="{ item, i}">
                  <v-list-item :key="i">
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.name }}
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-content>
                      <v-list-item-title>
                        {{ item.num }}
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-action>
                      <strong>
                        {{ (item.price * item.num) | currency('', 2, { decimalSeparator: '.' }) }}
                      </strong>
                    </v-list-item-action>

                    <v-list-item-action>
                      <v-icon
                        :disabled="item_disabled"
                        small
                        color="error"
                        @click="removeItem(item)"
                      >
                        mdi-close
                      </v-icon>
                    </v-list-item-action>
                  </v-list-item>
                  <v-divider />
                </template>
              </v-virtual-scroll>
            </v-list>
          </v-card>

          <v-card class="pa-2 mt-n3" flat width="100%">
            <v-divider />
            <v-row class="px-10">
              <v-col class="pa-2 text-left">
                <span class="font-weight-black title">
                  รวม
                </span>
              </v-col>

              <v-col class="pa-2 text-right">
                <span class="font-weight-black text-h5">
                  {{ total | currency('', 2, { decimalSeparator: '.', symbolOnLeft: false }) }}
                </span>
              </v-col>
            </v-row>

            <v-divider />

            <v-row v-if="!go_to" class="px-10">
              <v-col class="pa-2 text-left">
                <span class="font-weight-black title">
                  รับเงิน
                </span>
              </v-col>
              <v-col class="pa-2 text-right">
                <span class="font-weight-black text-h5 yellow--text">
                  {{ cash | currency('', 2, { decimalSeparator: '.', symbolOnLeft: false }) }}
                </span>
              </v-col>
            </v-row>

            <v-divider v-if="!go_to" />

            <v-row v-if="!go_to" class="px-10">
              <v-col class="pa-2 text-left">
                <span class="font-weight-black title">
                  เงินทอน
                </span>
              </v-col>
              <v-col class="pa-2 text-right">
                <span class="font-weight-black text-h4 success--text">
                  {{ chang_money | currency('', 2, { decimalSeparator: '.', symbolOnLeft: false }) }}
                </span>
              </v-col>
            </v-row>

            <v-divider v-if="!go_to" />
          </v-card>

          <v-card class="pa-2" flat width="100%">
            <v-row v-if="go_to" no-gutters>
              <v-col>
                <v-card
                  class="pa-3 mx-auto text-center"
                  color="primary"
                  dark
                  outlined
                  @click="Check_bill"
                >
                  <span class="headline font-weight-black">
                    <v-icon large>mdi-cash</v-icon> คิดเงิน (F9)
                  </span>
                </v-card>
              </v-col>
              <v-col cols="2">
                <v-card
                  class="pa-3 text-center mx-auto ml-2"
                  color="primary"
                  dark
                  outlined
                  @click="Clear_All"
                >
                  <span class="headline font-weight-black">
                    <v-icon large>mdi-cached</v-icon>
                  </span>
                </v-card>
              </v-col>
            </v-row>

            <v-row v-else no-gutters>
              <v-col cols="2" class="pr-1">
                <v-card class="pa-3 text-center" color="primary" dark>
                  <span class="headline font-weight-black">
                    <v-icon large>mdi-printer</v-icon>
                  </span>
                </v-card>
              </v-col>
              <v-col class="pl-1">
                <v-card
                  class="pa-3 text-center"
                  color="primary"
                  dark
                  @click="Clear_All"
                >
                  <span class="headline font-weight-black">
                    <v-icon large>mdi-cached</v-icon> Clear
                  </span>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-card>
      </v-col>

      <!----------------------------------------------------->
      <Snackbar ref="Alert" />
      <!----------------------------------------------------->

      <v-dialog v-model="cash_dialog" width="500" persistent>
        <v-card>
          <v-card-title>
            <span class="headline">Cash</span>
            <div class="flex-grow-1" />
            <v-btn icon @click="close_checkbill">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>

          <v-card-text>
            <v-row no-gutters class="mt-2 mx-8">
              <v-col cols="12">
                <v-form ref="form" @submit.prevent="Get_cash">
                  <v-text-field
                    id="cash"
                    ref="cash"
                    v-model="cash"
                    v-mask="cash_value"
                    placeholder="Cash"
                    outlined
                    single-line
                    class="display-1 font-weight-black align-center"
                    height="75"
                    maxlength="4"
                    :error-messages="cash_msg"
                  >
                    <template v-slot:append>
                      <v-divider class="mx-2 mt-n2 mb-n3" vertical />
                      <v-icon x-large @click="drop()">
                        mdi-backspace-outline
                      </v-icon>
                    </template>
                  </v-text-field>
                </v-form>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col cols="4" class="pa-1">
                <v-card
                  class="pa-5  text-center"
                  color="primary"
                  tile
                  outlined
                  @click="cash_clear()"
                >
                  <span class="headline font-weight-black">
                    Clear
                  </span>
                </v-card>
              </v-col>
              <v-col cols="8" class="pa-1">
                <v-card
                  class="pa-5 text-center"
                  color="primary"
                  tile
                  outlined
                  @click="Get_cash"
                >
                  <span class="headline Sarabun font-weight-black">
                    รับเงิน
                  </span>
                </v-card>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col class="pa-1">
                <v-card
                  class="pa-4 text-center"
                  color="primary"
                  tile
                  outlined
                  @click="addcash(0)"
                >
                  <span class="display-1 font-weight-black">
                    0
                  </span>
                </v-card>
              </v-col>
              <v-col class="pa-1">
                <v-card
                  class="pa-4 text-center banknote banknote-20"
                  tile
                  outlined
                  @click="addcash_bank(20)"
                >
                  <span class="display-1 font-weight-black transparent--text">
                    20
                  </span>
                </v-card>
              </v-col>

              <v-col class="pa-1">
                <v-card
                  class="pa-4 text-center banknote banknote-50"
                  tile
                  outlined
                  @click="addcash_bank(50)"
                >
                  <span class="display-1 font-weight-black transparent--text">
                    50
                  </span>
                </v-card>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col class="pa-1">
                <v-card
                  class="pa-4 text-center"
                  color="primary"
                  tile
                  outlined
                  @click="addcash(1)"
                >
                  <span class="display-1 font-weight-black">
                    1
                  </span>
                </v-card>
              </v-col>
              <v-col class="pa-1">
                <v-card
                  class="pa-4 text-center"
                  color="primary"
                  tile
                  outlined
                  @click="addcash(2)"
                >
                  <span class="display-1 font-weight-black">
                    2
                  </span>
                </v-card>
              </v-col>
              <v-col class="pa-1">
                <v-card
                  class="pa-4 text-center"
                  color="primary"
                  tile
                  outlined
                  @click="addcash(3)"
                >
                  <span class="display-1 font-weight-black">
                    3
                  </span>
                </v-card>
              </v-col>
              <v-col cols="4" class="pa-1">
                <v-card
                  class="pa-4 text-center banknote banknote-100"
                  tile
                  outlined
                  @click="addcash_bank(100)"
                >
                  <span class="display-1 font-weight-black transparent--text">
                    100
                  </span>
                </v-card>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col class="pa-1">
                <v-card
                  class="pa-4 text-center"
                  color="primary"
                  tile
                  outlined
                  @click="addcash(4)"
                >
                  <span class="display-1 font-weight-black">
                    4
                  </span>
                </v-card>
              </v-col>
              <v-col class="pa-1">
                <v-card
                  class="pa-4 text-center"
                  color="primary"
                  tile
                  outlined
                  @click="addcash(5)"
                >
                  <span class="display-1 font-weight-black ">
                    5
                  </span>
                </v-card>
              </v-col>
              <v-col class="pa-1">
                <v-card
                  class="pa-4 text-center"
                  color="primary"
                  tile
                  outlined
                  @click="addcash(6)"
                >
                  <span class="display-1 font-weight-black">
                    6
                  </span>
                </v-card>
              </v-col>
              <v-col cols="4" class="pa-1">
                <v-card
                  class="pa-4 text-center banknote banknote-500"
                  tile
                  outlined
                  @click="addcash_bank(500)"
                >
                  <span class="display-1 font-weight-black transparent--text">
                    500
                  </span>
                </v-card>
              </v-col>
            </v-row>

            <v-row no-gutters>
              <v-col class="pa-1">
                <v-card
                  class="pa-4 text-center"
                  color="primary"
                  tile
                  outlined
                  @click="addcash(7)"
                >
                  <span class="display-1 font-weight-black">
                    7
                  </span>
                </v-card>
              </v-col>
              <v-col class="pa-1">
                <v-card
                  class="pa-4 text-center"
                  color="primary"
                  tile
                  outlined
                  @click="addcash(8)"
                >
                  <span class="display-1 font-weight-black">
                    8
                  </span>
                </v-card>
              </v-col>
              <v-col class="pa-1">
                <v-card
                  class="pa-4 text-center"
                  color="primary"
                  tile
                  outlined
                  @click="addcash(9)"
                >
                  <span class="display-1 font-weight-black">
                    9
                  </span>
                </v-card>
              </v-col>
              <v-col cols="4" class="pa-1">
                <v-card
                  class="pa-4 text-center banknote banknote-1000 "
                  tile
                  outlined
                  @click="addcash_bank(1000)"
                >
                  <span class="display-1 font-weight-black transparent--text">
                    1000
                  </span>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      listsale: [],
      fab: false,
      tab: null,
      items: ['Products', 'AD', 'ADD CASH'],
      products: [],
      barcode: '',
      error_msg: '',
      cash: '',
      cash_msg: '',
      chang_money: '',
      cash_dialog: false,
      cash_value: '####',
      order_no: '',
      cus_id: '',
      user_id: '',
      item_disabled: false,
      go_to: true,
      list_height: '35vh',
      AD: require('~/assets/images/AD.jpg'),
      icons: ['mdi-rewind', 'mdi-play', 'mdi-fast-forward'],
      itemstest: [{
        title: 'New Releases',
        text: "It's New Release Friday",
        subtext: 'Newly released songs. Updated daily.',
        img: 'http://lorempixel.com/output/nightlife-q-c-640-480-5.jpg'
      },
      {
        title: 'Rock',
        text: 'Greatest Rock Hits',
        subtext: 'Lose yourself in rock tunes.',
        img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'
      },
      {
        title: 'Mellow Moods',
        text: 'Ambient Bass',
        subtext: 'Chill beats to mellow you out.',
        img: 'http://lorempixel.com/output/abstract-q-c-640-480-6.jpg'
      }
      ],
      transparent: 'rgba(255, 255, 255, 0)'

    }
  },
  computed: {
    total () {
      const all = this.listsale.reduce(function (value, data) {
        return value + Number(data.price * data.num)
      }, 0)
      return all
    }
  },
  watch: {
    'document.exitFullscreen' () {
      this.list_height = '45vh'
    }
  },
  mounted () {
    this.Show_products()
    window.addEventListener('keydown', (e) => {
      if (e.key === 'F9') {
        // console.log('F9')
      }
    })
  },
  methods: {
    openFullscreen () {
      this.list_height = '44vh'
      const elem = document.documentElement
      if (elem.requestFullscreen) {
        elem.requestFullscreen()
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen()
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen()
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen()
      }
    },
    closeFullscreen () {
      this.list_height = '35vh'
      if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      }
    },

    // ------------------------------------------------------------
    async Show_products () {
      await this.$axios.$get('/sale/products')
        .then(res => (this.products = res.products))
    },
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    imgproduct (img) {
      if (!img) {
        return require('~/assets/images/uploads/products/img-no-product.png')
      } else {
        return require(`~/assets/images/uploads/products/${img}`)
      }
    },
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    find_barcode () {
      if (this.barcode === '') {
        this.error_msg = 'errormessages'
        this.$refs.barcode.focus()
      } else {
        this.get_product(this.barcode)
      }
    },
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    async get_product (code) {
      await this.$axios.$post('/sale/findbarcode', { barcode: code })
        .then((res) => {
          if (res.success) {
            if (res.outstock) {
              this.$refs.Alert.SHOW('error', res.msg)
              return
            }
            this.barcode = ''
            this.$refs.barcode.focus()
            this.error_msg = ''
            let found = false

            for (let i = 0; i < this.listsale.length; i++) {
              if (this.listsale[i].barcode === res.products.p_code) {
                this.listsale[i].num++
                found = true
                break
              }
            }

            if (!found) {
              this.listsale.push({
                p_id: res.products.p_id,
                barcode: res.products.p_code,
                name: res.products.p_name,
                num: 1,
                price: res.products.sale_price
              })
            }
          } else {
            this.error_msg = res.msg
            this.barcode = ''
            this.$refs.barcode.focus()
          }
        })
    },
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    removeItem (Item) {
      for (let i = 0; i < this.listsale.length; i++) {
        if (this.listsale[i] === Item) {
          this.listsale.splice(i, 1)
          break
        }
      }
    },
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    Check_bill () {
      if (this.listsale === '') {
        this.error_msg = 'errormessages'
        this.$refs.barcode.focus()
      } else {
        this.cash_dialog = true
        setTimeout(() => {
          this.$refs.cash.focus()
        }, 20)
      }
    },
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    addcash (e) {
      if (Number.isInteger(this.cash) || this.cash === 0) {
        this.cash = ''
      }
      if (this.cash.length !== 4) {
        this.cash += e
        this.cash_msg = ''
        this.$refs.cash.focus()
      }
    },
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    addcash_bank (e) {
      this.cash = parseInt(e)
      this.cash_msg = ''
      this.$refs.cash.focus()
    },
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    cash_clear () {
      this.cash = ''
      this.cash_msg = ''
      this.$refs.cash.focus()
    },
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    drop () {
      if (this.cash === 20 || this.cash === 50 || this.cash === 100 || this.cash === 500 || this.cash === 1000) {
        this.cash = ''
        this.$refs.cash.focus()
      }
      if (this.cash !== 0) {
        this.cash = this.cash.slice(0, -1)
        this.$refs.cash.focus()
      }
    },
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    close_checkbill () {
      if (this.cash_dialog === true) {
        this.cash_dialog = false
        this.$refs.barcode.focus()
        this.cash = 0
        this.item_disabled = false
      } else {
        this.cash_dialog = true
      }
    },
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    Get_cash () {
      if (this.cash === '') {
        this.cash_msg = 'error cash'
      } else if (this.cash > 1000) {
        this.cash_msg = 'Not 1,000'
        this.cash = ''
      } else {
        this.cash_msg = ''
        if (this.cash < this.total) {
          this.$refs.Alert.SHOW('error', 'Not mout Totel')
        } else {
          this.Save_sale_Order()
        }
      }
    },
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    async Save_sale_Order () {
      this.order_no = moment().format('YMDWHmmss')
      this.chang_money = this.cash - this.total
      const Data = {
        order_no: this.order_no,
        cus: 1,
        total: this.total,
        chang_money: this.chang_money,
        cash: this.cash
      }
      await this.$axios.$post('/sale/savesale', Data)
        .then((res) => {
          if (res.success) {
            this.Save_sale_list()
          } else {
            this.$refs.Alert.SHOW('error', 'Not SAVE')
          }
        })
    },
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    async Save_sale_list () {
      for (let i = 0; i < this.listsale.length; i++) {
        const Data = {
          order_no: this.order_no,
          p_id: this.listsale[i].p_id,
          num: this.listsale[i].num,
          price: this.listsale[i].price
        }
        await this.$axios.$post('/sale/savesalelist', Data)
          .then(() => {
            this.cash_dialog = false
            this.go_to = false
            this.item_disabled = true
          })
      }
    },
    // ------------------------------------------------------------

    // ------------------------------------------------------------
    Clear_All () {
      this.listsale = []
      this.total = 0
      this.cash = 0
      this.go_to = true
      this.chang_money = 0
      this.item_disabled = false
      setTimeout(() => {
        this.$refs.barcode.focus()
      }, 20)
    }
  }

}
</script>
<style>
.card-hover {
  transition: opacity .4s ease-in-out;
}

.card-hover:not(.on-hover) {
  opacity: 0.6;
}

.v-card .show-btns {
  color: #eee !important;
}
</style>
