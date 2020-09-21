<template>
  <v-row
    align="center"
    justify="center"
    style="height: calc(100vh - 50px)"
  >
    <language width="80px" class="Language" elevation="5" />

    <v-sheet class="rounded-lg">
      <v-card
        class="px-5 py-12 rounded-lg"
        tile
        max-width="400"
        min-width="320"
        min-height="355"
        elevation="5"
      >
        <v-window v-model="step">
          <!--------------------------------------------------------------->
          <v-window-item :value="1">
            <v-form ref="form_login_user" @submit.prevent="check_username">
              <v-card-title class="title justify-space-between px-5">
                <span class="display-1 font-weight-bold">
                  Username
                </span>
                <v-icon large>
                  mdi-account-outline
                </v-icon>
              </v-card-title>
              <v-card-text class="pt-5 pb-0">
                <v-text-field
                  ref="username"
                  v-model="username"
                  placeholder="Username"
                  single-line
                  filled
                  clearable
                  validate-on-blur
                  class="mb-n2"
                  :rules="[v => !!v || 'val_username']"
                >
                  <template v-slot:prepend-inner>
                    <v-icon>mdi-account</v-icon>
                    <v-divider class="mx-2" vertical />
                  </template>
                </v-text-field>
              </v-card-text>

              <v-divider class="mt-1" />

              <v-card-actions class="px-5 mt-2">
                <v-btn
                  text
                  small
                  class="grey--text caption"
                  @click="step=3"
                >
                  <v-icon small class="mr-1">
                    mdi-account-question-outline
                  </v-icon>
                  Lost_pass
                </v-btn>
                <v-spacer />
                <v-btn color="primary" type="submit">
                  Next
                  <v-icon class="ml-1">
                    mdi-arrow-right-bold-circle-outline
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-window-item>
          <!--/ END Stap1-->
          <!---------------------------------------------------------------->

          <!---------------------------------------------------------------->
          <v-window-item :value="2">
            <v-form ref="form_login_pass" @submit.prevent="check_password">
              <v-card-title class="title justify-space-between px-5">
                <span class="display-1 font-weight-bold">
                  Password
                </span>
                <v-icon large>
                  mdi-account-key-outline
                </v-icon>
              </v-card-title>
              <v-card-text class="pt-5 pb-0">
                <v-text-field
                  ref="password"
                  v-model="password"
                  placeholder="Password"
                  min="8"
                  filled
                  validate-on-blur
                  :append-icon="e1?'mdi-eye':'mdi-eye-off'"
                  :type="e1?'text':'password'"
                  :rules="[
                    v => !!v || 'val_password',
                    v=>v.length>= 8 || 'val_min8']"
                  counter
                  class="mb-n2"
                  @click:append="()=>(e1=!e1)"
                >
                  <template v-slot:prepend-inner>
                    <v-icon>mdi-key</v-icon>
                    <v-divider class="mx-2" vertical />
                  </template>
                </v-text-field>
              </v-card-text>

              <v-divider class="mt-1" />

              <v-card-actions class="px-5 mt-2">
                <v-btn text @click="Back">
                  <v-icon class="mr-1">
                    mdi-arrow-left-bold-circle-outline
                  </v-icon>
                  Back
                </v-btn>
                <v-spacer />
                <v-btn
                  color="primary"
                  type="submit"
                >
                  Login
                  <v-icon class="ml-1">
                    mdi-arrow-right-bold-circle-outline
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-window-item>
          <!--/ END Stap2-->
          <!---------------------------------------------------------------->

          <!---------------------------------------------------------------->
          <v-window-item :value="3">
            <v-card-title class="title justify-space-between">
              <span class="display-1 font-weight-bold">
                Forgot Password
              </span>
              <v-icon large>
                mdi-at
              </v-icon>
            </v-card-title>
            <v-form ref="form_email" @submit.prevent="forgotpassword">
              <v-card-text class="pt-5 pb-0">
                <v-text-field
                  ref="email"
                  v-model="email"
                  placeholder="Email"
                  clearable
                  single-line
                  filled
                  validate-on-blur
                  required
                  type="email"
                  class="mb-n2"
                  :rules="[
                    v=>!!v || 'val_data',
                    v => /.+@.+\..+/.test(v) || 'Login.val_email']"
                >
                  <template v-slot:prepend-inner>
                    <v-icon>mdi-at</v-icon>
                    <v-divider class="mx-2" vertical />
                  </template>
                </v-text-field>
                <span class="caption grey--text text--darken-1">
                  Login.sub_email
                </span>
              </v-card-text>

              <v-divider class="mt-1" />

              <v-card-actions class="px-5 mt-2">
                <v-btn text @click="Back">
                  <v-icon class="mr-1">
                    mdi-arrow-left-bold-circle-outline
                  </v-icon>
                  Back
                </v-btn>
                <v-spacer />
                <v-btn color="primary" type="submit">
                  Send
                  <v-icon class="ml-1">
                    mdi-send-outline
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-window-item>
          <!--/ END Stap3-->
          <!---------------------------------------------------------------->

          <!---------------------------------------------------------------->
          <v-window-item :value="4">
            <v-card-title class="title justify-center">
              <span class="display-1 font-weight-bold">
                Login.R_title
              </span>
            </v-card-title>
            <v-form ref="form_reset" @submit.prevent="reset_password">
              <v-card-text class="pt-5 pb-0">
                <div class="text--secondary body-1">
                  Login.code_hint
                </div>
                <v-row no-gutters class="mb-n4">
                  <v-col cols="2">
                    <v-text-field
                      id="code-1"
                      ref="code1"
                      v-model="code.c1"
                      v-mask="code_mask"
                      placeholder="0"
                      outlined
                      class="code-reset font-weight-black"
                      single-line
                      :rules="[v => !!v || '']"
                      @keyup="enter_code(code.c1,$refs.code2,$refs.code1)"
                    />
                  </v-col>

                  <v-col cols="2">
                    <v-text-field
                      id="code-2"
                      ref="code2"
                      v-model="code.c2"
                      v-mask="code_mask"
                      placeholder="0"
                      outlined
                      class="code-reset font-weight-black"
                      single-line
                      :rules="[v => !!v || '']"
                      @keyup="enter_code(code.c2,$refs.code3,$refs.code1)"
                    />
                  </v-col>

                  <v-col cols="2">
                    <v-text-field
                      id="code-3"
                      ref="code3"
                      v-model="code.c3"
                      v-mask="code_mask"
                      placeholder="0"
                      outlined
                      class="code-reset font-weight-black"
                      single-line
                      :rules="[v => !!v || '']"
                      @keyup="enter_code(code.c3,$refs.code4,$refs.code2)"
                    />
                  </v-col>

                  <v-col cols="2">
                    <v-text-field
                      id="code-4"
                      ref="code4"
                      v-model="code.c4"
                      v-mask="code_mask"
                      placeholder="0"
                      outlined
                      class="code-reset font-weight-black"
                      single-line
                      :rules="[v => !!v || '']"
                      @keyup="enter_code(code.c4,$refs.code5,$refs.code3)"
                    />
                  </v-col>

                  <v-col cols="2">
                    <v-text-field
                      id="code-5"
                      ref="code5"
                      v-model="code.c5"
                      v-mask="code_mask"
                      placeholder="0"
                      outlined
                      class="code-reset font-weight-black"
                      single-line
                      :rules="[v => !!v || '']"
                      @keyup="enter_code(code.c5,$refs.code6,$refs.code4)"
                    />
                  </v-col>

                  <v-col cols="2">
                    <v-text-field
                      id="code-6"
                      ref="code6"
                      v-model="code.c6"
                      v-mask="code_mask"
                      placeholder="0"
                      outlined
                      class="code-reset font-weight-black"
                      single-line
                      :rules="[v => !!v || '']"
                      @keyup="enter_code(code.c6,$refs.new_password,$refs.code5)"
                    />
                  </v-col>
                </v-row>

                <v-text-field
                  ref="new_password"
                  v-model="new_password"
                  placeholder="'Login.Pass_New"
                  :rules="[
                    v=>!!v || 'Login.val_password',
                    v => v.length >= 8 || 'Login.val_min8']"
                  :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_pass ? 'text' : 'password'"
                  min="8"
                  filled
                  counter
                  validate-on-blur
                  @click:append="show_pass = !show_pass"
                >
                  <template v-slot:prepend-inner>
                    <v-icon>mdi-key</v-icon>
                    <v-divider class="mx-2" vertical />
                  </template>
                </v-text-field>

                <v-text-field
                  ref="new_pass_try"
                  v-model="new_pass_try"
                  placeholder="'Login.Pass_again"
                  :rules="[
                    v => !!v || 'Login.val_password',
                    v => v.length >= 8 || 'Login.val_min8',
                    confirm_password || 'Login.some_value']"
                  :append-icon="show_pass_try ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show_pass_try ? 'text' : 'password'"
                  min="8"
                  validate-on-blur
                  filled
                  counter
                  @click:append="show_pass_try = !show_pass_try"
                >
                  <template v-slot:prepend-inner>
                    <v-icon>mdi-key</v-icon>
                    <v-divider class="mx-2" vertical />
                  </template>
                </v-text-field>
              </v-card-text>

              <v-divider />

              <v-card-actions class="px-5 my-2">
                <v-btn text @click="Back">
                  <v-icon class="mr-1">
                    mdi-arrow-left-bold-circle-outline
                  </v-icon>
                  Login.Back
                </v-btn>
                <v-spacer />
                <v-btn large color="primary" type="submit">
                  Login.Save
                  <v-icon class="ml-1">
                    mdi-content-save-outline
                  </v-icon>
                </v-btn>
              </v-card-actions>

              <v-card-actions class="px-5 mb-0">
                <v-spacer />
                <span class="caption grey--text">
                  {{ 'Login.times_left' + Time }}
                </span>
              </v-card-actions>
            </v-form>
          </v-window-item>
          <!--/ END Stap4-->
          <!---------------------------------------------------------------->
        </v-window>
      </v-card>
    </v-sheet>

    <snackbar ref="Alert" />

    <loading ref="loading" text="Home.Please_wait" />
  </v-row>
</template>

<script>
export default {
  middleware: ['NoAuth'],
  data: () => ({
    step: 1,
    username: '',
    password: '',
    e1: false,
    email: '',
    code: {
      c1: '',
      c2: '',
      c3: '',
      c4: '',
      c5: '',
      c6: ''
    },
    code_mask: '#',
    new_password: '',
    new_pass_try: '',
    show_pass: false,
    show_pass_try: false,
    loading_dialog: false,
    id: '',
    Time: 120
  }),
  computed: {
    confirm_password () {
      return this.new_pass_try === this.new_password
    }
  },

  mounted () {
    setTimeout(() => {
      this.$refs.username.focus()
    }, 100)
  },
  methods: {
    // --------------------------------------------------------------
    Back () {
      this.step = 1
      this.username = ''
      setTimeout(() => {
        this.$refs.username.focus()
      }, 20)
    },
    // --------------------------------------------------------------

    // --------------------------------------------------------------
    async check_username () {
      if (this.$refs.form_login_user.validate()) {
        this.$refs.loading.SET_Loading(true)
        await this.$axios.$post('/login/check_username', { username: this.username })
          .then((res) => {
            setTimeout(() => {
              if (res.success) {
                this.step = 2
                setTimeout(() => {
                  this.$refs.password.focus()
                }, 500)
              } else {
                this.username = ''
                this.$refs.username.focus()
                this.$refs.Alert.SHOW('error', 'Login.Exit_user')
              }
              this.$refs.loading.SET_Loading(false)
            }, 1000)
          })
      }
    },
    // --------------------------------------------------------------

    // --------------------------------------------------------------
    async check_password () {
      if (this.$refs.form_login_pass.validate()) {
        this.$refs.loading.SET_Loading(true)
        const DATA = { username: this.username, password: this.password }
        await this.$axios.$post('/login/check_password', DATA).then((res) => {
          setTimeout(async () => {
            if (res.success) {
              await this.$auth.loginWith('local', { data: DATA })
              this.$router.push('/')
            } else {
              this.password = ''
              this.$refs.password.focus()
              this.$refs.Alert.SHOW('error', 'Login.P_no_match')
            }
            this.$refs.loading.SET_Loading(false)
          }, 1000)
        })
      }
    },
    // --------------------------------------------------------------

    // --------------------------------------------------------------
    enter_code (code, co1, co2) {
      const evt = (code) || window.event
      const Code = (evt.which) ? evt.which : evt.keyCode
      if ((Code > 31 && (Code < 48 || Code > 57)) && Code !== 46) {
        evt.preventDefault()
      } else if (code === '') {
        co2.focus()
      } else {
        co1.focus()
      }
    },
    // --------------------------------------------------------------

    // --------------------------------------------------------------
    async forgotpassword () {
      if (this.$refs.form_email.validate()) {
        this.$refs.loading.SET_Loading(true)
        const DATA = { email: this.email }
        await this.$axios.$post('/forgot/password', DATA).then((res) => {
          setTimeout(() => {
            if (res.success) {
              this.id = res.id
              this.step = 4
              setTimeout(() => {
                this.$refs.code1.focus()
                this.checkTime()
              }, 500)
            } else {
              if (res.Nosend) {
                this.$refs.Alert.SHOW('error', 'Login.No_Send')
              } else {
                this.$refs.Alert.SHOW('error', 'Login.NO_User')
              }
              this.email = ''
              this.$refs.email.focus()
            }
            this.$refs.loading.SET_Loading(false)
          }, 1000)
        })
      }
    },
    // --------------------------------------------------------------

    // --------------------------------------------------------------
    async reset_password () {
      if (this.$refs.form_reset.validate()) {
        this.$refs.loading.SET_Loading(true)
        const codereset = this.code.c1 + this.code.c2 + this.code.c3 + this.code.c4 + this.code.c5 + this.code.c6
        const Data = { id: this.id, code: codereset, new_pass: this.new_password }
        await this.$axios.$post('/reset/password', Data).then((res) => {
          setTimeout(() => {
            if (res.success) {
              this.step = 1
              this.id = ''
              this.$refs.Alert.SHOW('success', 'Reset Password Success')
              setTimeout(() => {
                this.$refs.username.focus()
              }, 500)
            } else {
              this.code.c1 = ''
              this.code.c2 = ''
              this.code.c3 = ''
              this.code.c4 = ''
              this.code.c5 = ''
              this.code.c6 = ''
              this.new_password = ''
              this.new_pass_try = ''
              this.$refs.code1.focus()
              this.$refs.Alert.SHOW('error', 'erroe code')
            }
            this.$refs.loading.SET_Loading(false)
          }, 1000)
        })
      }
    },
    // --------------------------------------------------------------

    // --------------------------------------------------------------
    checkTime () {
      if (this.Time > 0) {
        setTimeout(() => {
          this.Time -= 1
          this.checkTime()
        }, 1000)
      }
    }
  },
  head () {
    return {
      title: 'LOGIN'
    }
  }
}
</script>
<style>
.Language {
  position: absolute;
  top: 10px;
  right: 20px;
}
.code-reset {
  border-radius: 0;
  margin-left: 0.5px !important;
  margin-right: 0.5px !important;
}
input#code-1,
input#code-2,
input#code-3,
input#code-4,
input#code-5,
input#code-6 {
  text-align: center;
  font-size: 2rem;
}
</style>
