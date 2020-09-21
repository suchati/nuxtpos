<template>
  <v-dialog v-model="user_dialog" max-width="400">
    <v-card class="pa-5">
      <v-form ref="form_add_edit" @submit.prevent="save">
        <v-card-title>
          <span class="headline">{{ FormTitle }}</span>
          <v-spacer />
          <v-icon dark @click="user_dialog=false">
            mdi-close
          </v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                ref="id_card"
                v-model="user.id_card"
                v-mask="mask_IDcard"
                label="ID CARD"
                prepend-inner-icon="mdi-credit-card"
                :rules="[
                  v => !!v || 'enter_idcard',
                  v => (v && v.length >= 13) || 'Min 13 characters'
                ]"
                :disabled="mode=='add'?false:true"
                validate-on-blur
                filled
                dense
              />
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                ref="username"
                v-model="user.username"
                label="Username"
                prepend-inner-icon="mdi-account"
                :rules="[v => !!v||'enter_name']"
                dense
                filled
                validate-on-blur
                :disabled="mode=='add'?false:true"
              />
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs6 class="pr-1">
              <v-text-field
                v-model="user.u_name"
                label="Name"
                prepend-inner-icon="mdi-account"
                :rules="[v => !!v||'enter_name']"
                dense
                filled
                validate-on-blur
              />
            </v-flex>
            <v-flex xs6 class="pl-1">
              <v-text-field
                v-model="user.u_phone"
                v-mask="mask_phone"
                dense
                validate-on-blur
                label="Phone"
                filled
                prepend-inner-icon="mdi-phone"
                :rules="[
                  v => !!v || 'enter_phon',
                  v => (v && v.length >= 10) || '10'
                ]"
              />
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                ref="email"
                v-model="user.email"
                label="EmailAddress"
                prepend-inner-icon="mdi-at"
                :rules="emailRules"
                clearable
                dense
                filled
                :disabled="mode=='add'?false:true"
                validate-on-blur
              />
            </v-flex>
          </v-layout>

          <v-layout wrap>
            <v-flex xs12>
              <v-text-field
                v-model="user.u_address"
                label="address"
                filled
                prepend-inner-icon="mdi-home"
                dense
              />
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-divider />
        <v-card-actions>
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
      user_dialog: false,
      mode: '',
      user: {
        id_card: '',
        u_name: '',
        username: '',
        email: '',
        u_phone: '',
        u_address: ''
      },
      mask_IDcard: '#-####-#####-##-#',
      mask_phone: '###-####-####',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  computed: {
    FormTitle () {
      return this.mode === 'add' ? 'New User' : 'Edit User'
    }
  },
  watch: {
    mode (val) {
      if (val === 'add') {
        this.reset_form()
      }
    }
  },
  methods: {
    open (mode, data) {
      this.user_dialog = true
      this.mode = mode
      if (data) {
        this.user = { ...data }
      }
    },
    close () {
      this.user_dialog = false
      this.reset_form()
    },
    reset_form () {
      this.user = {
        id_card: '',
        u_name: '',
        username: '',
        email: '',
        u_phone: '',
        u_address: ''
      }
    },
    save () {
      if (this.$refs.form_add_edit.validate()) {
        this.$emit(this.mode, this.user)
      }
    },
    usernamefocus () {
      this.user.username = ''
      setTimeout(() => {
        this.$refs.username.focus()
      }, 50)
    },
    emailfocus () {
      this.user.email = ''
      setTimeout(() => {
        this.$refs.email.focus()
      }, 50)
    },
    idcardfocus () {
      this.user.id_card = ''
      setTimeout(() => {
        this.$refs.id_card.focus()
      }, 50)
    }
  }
}
</script>
