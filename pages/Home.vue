<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        sm="6"
        lg="3"
        class="mt-5"
      >
        <v-card>
          <v-card-text>
            <v-row class="justify-space-between">
              <div class="mt-n8 mb-5 pa-5 v-sheet primary ml-2">
                <v-icon
                  x-large
                  dark
                >
                  mdi-calendar-today
                </v-icon>
              </div>
              <div>
                <div class="pr-3 text-right">
                  <div class="grey--text font-weight-light">
                    ยอดขายวันนี้ / <span>฿</span>
                  </div>
                  <h3 class="display-1 font-weight">
                    {{ saletoday || 0 }}
                  </h3>
                </div>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
        class="mt-5"
      >
        <v-card>
          <v-card-text>
            <v-row class="justify-space-between">
              <div class="mt-n8 mb-5 pa-5 v-sheet success ml-2">
                <v-icon
                  x-large
                  dark
                >
                  mdi-calendar-month
                </v-icon>
              </div>
              <div>
                <div class="pr-3 text-right">
                  <div class="grey--text font-weight-light">
                    ยอดขายเดือนนี้ / <span>฿</span>
                  </div>
                  <h3 class="display-1 font-weight">
                    {{ saletomonth || 0 }}
                  </h3>
                </div>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
        class="mt-5"
      >
        <v-card>
          <v-card-text>
            <v-row class="justify-space-between">
              <div class="mt-n8 mb-5 pa-5 v-sheet info ml-2">
                <v-icon
                  x-large
                  dark
                >
                  mdi-barcode
                </v-icon>
              </div>
              <div>
                <div class="pr-3 text-right">
                  <div class="grey--text font-weight-light">
                    สินค้า / รายการ
                  </div>
                  <h3 class="display-1 font-weight">
                    {{ productall || 0 }}
                  </h3>
                </div>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
        class="mt-5"
      >
        <v-card>
          <v-card-text>
            <v-row class="justify-space-between">
              <div class="mt-n8 mb-5 pa-5 v-sheet orange ml-2">
                <v-icon
                  x-large
                  dark
                >
                  mdi-account-group
                </v-icon>
              </div>
              <div>
                <div class="pr-3 text-right">
                  <div class="grey--text font-weight-light">
                    พนักงาน / คน
                  </div>
                  <h3 class="display-1 font-weight">
                    {{ userall || 0 }}
                  </h3>
                </div>
              </div>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <!--------------// ROW Widget------------------->

    <!-------------- ROW CHART ------------------>
    <v-row>
      <v-container grid-list-xl>
        <v-layout wrap>
          <!--------------List ToDay ----------------->
          <v-flex md4>
            <v-card class="mt-5 mx-auto">
              <v-card-title>
                <span>สิ้นค้าขายดี</span>
              </v-card-title>
              <v-divider />
              <v-card-text>
                <v-simple-table>
                  <template v-slot:default>
                    <tbody>
                      <tr
                        v-for="(item , index) in Producttoday"
                        :key="index"
                      >
                        <td>{{ index+1 }}</td>
                        <td>{{ item.p_name }}</td>
                        <td>{{ item.product_numall }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
                <v-divider class="mb-2" />
              </v-card-text>
            </v-card>
          </v-flex>
          <!-------------- //List ToDay --------------->

          <!-------------- CHART Day  ----------------->
          <v-flex md8>
            <v-card class="mt-5 mx-auto">
              <v-card-text>
                <v-card-title>
                  <v-icon
                    large
                    left
                    style="color:#1f8ef1"
                  >
                    mdi-poll
                  </v-icon>
                  <span class="title font-weight-light">
                    สรุปยอดขายเดือนนี้
                  </span>
                  <v-spacer />
                  <h3 class="display-1 font-weight">
                    {{ saletomonth }} ฿
                  </h3>
                </v-card-title>
                <v-divider class="mb-4 mt-n4" />
                <chart
                  v-if="load_M_data"
                  :chart-data="Monthdata"
                  :label="Monthlabel"
                  :height="M_h"
                  border-color="#1f8ef1"
                  rgb1="rgba(29,140,248,0.2)"
                  rgb2="rgba(29,140,248,0.0)"
                  rgb3="rgba(29,140,248,0)"
                />
                <v-divider class="mx-2 mb-2" />
              </v-card-text>
            </v-card>
          </v-flex>
          <!-------------- // CHART Day ------------->
        </v-layout>
      </v-container>
    </v-row>
    <!-------------- //ROW ------------------>

    <!-------------- CHART Month ----------------->
    <v-row>
      <v-container grid-list-xl>
        <v-layout wrap>
          <v-flex>
            <v-card class="mt-5 mx-auto">
              <v-card-text>
                <v-card-title>
                  <v-icon
                    large
                    left
                    style="color:#00d6b4"
                  >
                    mdi-poll
                  </v-icon>
                  <span class="title font-weight-light">
                    สรุปยอดขายปีนี้
                  </span>
                  <v-spacer />
                  <h3 class="display-1 font-weight">
                    {{ saletoYear }} ฿
                  </h3>
                </v-card-title>
                <v-divider class="mb-4 mt-n4" />
                <chart
                  v-if="load_Y_data"
                  :chart-data="Yeardata"
                  :label="Yearlabel"
                  :height="Y_h"
                  rgb1="rgba(66,134,121,0.15)"
                  rgb2="rgba(66,134,121,0.05)"
                  rgb3="rgba(66,134,121,0)"
                />
                <v-divider class="mx-2 mb-2" />
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-row>
  </div>
</template>

<script>
export default {
  middleware: ['Auth'],
  layout: 'Dashboard',
  data () {
    return {
      load_M_data: false,
      Monthdata: [],
      Monthlabel: [],
      M_h: 115,
      load_Y_data: false,
      Yeardata: [],
      Yearlabel: [],
      Y_h: 100,
      Producttoday: [],
      userall: '',
      productall: '',
      saletoday: '',
      saletomonth: '',
      saletoYear: ''
    }
  },
  mounted () {
    this.Chart()
    this.Productsaletoday()
    this.All_user()
    this.All_Products()
    this.SaleDay()
    this.SaleMonth()
    this.SaleYear()
  },
  methods: {
    async Chart () {
      await this.$axios.$post('/home/chartmonth').then((res) => {
        if (res.success) {
          this.load_M_data = true
          for (const m in res.month) {
            this.Monthdata.push(res.month[m].total)
            this.Monthlabel.push(res.month[m].s_d)
          }
        }
      })
      await this.$axios.$post('/home/chartyear').then((res) => {
        if (res.success) {
          const month = []
          month['01'] = 'January'
          month['02'] = 'February'
          month['03'] = 'March'
          month['04'] = 'April'
          month['05'] = 'May'
          month['06'] = 'June'
          month['07'] = 'July'
          month['08'] = 'August'
          month['09'] = 'September'
          month['10'] = 'October'
          month['11'] = 'November'
          month['12'] = 'December'
          this.load_Y_data = true
          for (const y in res.year) {
            this.Yeardata.push(res.year[y].total)
            this.Yearlabel.push(month[res.year[y].s_m])
          }
        }
      })
    },

    async Productsaletoday () {
      await this.$axios.$post('/home/productsaletoday').then((res) => {
        if (res.success) {
          this.Producttoday = res.today
        }
      })
    },

    async All_user () {
      await this.$axios.$post('/home/all_user').then((res) => {
        if (res.success) {
          this.userall = res.user[0].user
        }
      })
    },

    async All_Products () {
      await this.$axios.$post('/home/all_products').then((res) => {
        if (res.success) {
          this.productall = res.product[0].product
        }
      })
    },

    async SaleDay () {
      await this.$axios.$post('/home/saletoday').then((res) => {
        if (res.success) {
          this.saletoday = res.sale_d[0].total
        }
      })
    },

    async SaleMonth () {
      await this.$axios.$post('/home/saletomonth').then((res) => {
        if (res.success) {
          this.saletomonth = res.sale_m[0].total
        }
      })
    },

    async SaleYear () {
      await this.$axios.$post('/home/saletoyear').then((res) => {
        if (res.success) {
          this.saletoYear = res.sale_y[0].total
        }
      })
    }
  }
}
</script>
