<template>
  <div>
    <v-card class="pa-5">
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
      >
        <template v-slot:top>
          <v-card-title>
            <v-divider class="mx-4" vertical />

            <v-btn color="primary" dark @click="Add">
              <v-icon>mdi-plus-circle-outline</v-icon> NEW
            </v-btn>

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
            <v-btn icon @click="fetch">
              <v-icon>mdi-autorenew</v-icon>
            </v-btn>
          </v-card-title>
          <div class="py-2">
            <v-divider />
          </div>
        </template>

        <template v-slot:body="{ items }">
          <tbody>
            <tr v-for="(item,index) in items" :key="index">
              <td>{{ index+1 }}</td>
              <td>{{ item.id_card }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.u_name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.u_phone }}</td>
              <td width="120" align="right">
                <v-icon
                  small
                  class="mr-2"
                  @click="editItem(item)"
                >
                  mdi-pencil
                </v-icon>
                <v-icon
                  small
                  @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
              </td>
            </tr>
          </tbody>
        </template>

        <template v-slot:no-data>
          <v-btn color="primary" @click="fetchData">
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <user-form
      ref="UserForm"
      @add="submitAdd"
      @edit="submitEdit"
    />

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
  </div>
</template>

<script>
export default {
  middleware: ['Auth'],
  layout: 'Dashboard',
  data () {
    return {
      headers: [
        { text: '#', align: 'start', value: 'index' },
        { text: 'ID CARD', value: 'id_card' },
        { text: 'Username ', value: 'username ' },
        { text: 'Firstname', value: 'firstname' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' },
        { text: 'Actions', value: 'actions', sortable: false, align: 'end' }
      ],
      users: [],
      search: '',
      user_id: '',
      confirm: false
    }
  },
  mounted () {
    this.fetch()
  },

  methods: {
    async fetch () {
      await this.$axios.$get('/users').then((res) => {
        if (res.success) {
          this.users = res.users
        }
      })
    },
    // -----------------------------------------------------------------
    Add () {
      this.$refs.UserForm.open('add')
    },
    async submitAdd (data) {
      await this.$axios.$post('/user/add', data).then((res) => {
        if (res.success) {
          this.$refs.Alert.SHOW('success', 'Add User success')
          this.fetch()
          this.$refs.UserForm.close()
        } else {
          if (res.exituser) {
            this.$refs.UserForm.usernamefocus()
            this.$refs.Alert.SHOW('error', 'exit username')
          }
          if (res.exitemail) {
            this.$refs.UserForm.emailfocus()
            this.$refs.Alert.SHOW('error', 'exit email')
          }
          if (res.exitcard) {
            this.$refs.UserForm.idcardfocus()
            this.$refs.Alert.SHOW('error', 'exit idcard')
          }
        }
      })
    },
    // -----------------------------------------------------------------

    // -----------------------------------------------------------------
    editItem (item) {
      this.user_id = item.u_id
      this.$refs.UserForm.open('edit', item)
    },
    // async
    async submitEdit (data) {
      await this.$axios.$put(`/user/${this.user_id}`, data).then((res) => {
        if (res.success) {
          this.$refs.Alert.SHOW('success', 'Update User success')
        } else {
          this.$refs.Alert.SHOW('error', 'error')
        }
        this.$refs.UserForm.close()
        this.fetch()
      })
    },
    // -----------------------------------------------------------------

    // -----------------------------------------------------------------
    deleteItem (item) {
      this.user_id = item.u_id
      this.confirm = true
    },
    async submitDelete () {
      this.confirm = false
      await this.$axios.$delete(`/user/${this.user_id}`).then((res) => {
        if (res.success) {
          this.$refs.Alert.SHOW('success', 'Delete User success')
        } else {
          this.$refs.Alert.SHOW('error', 'error')
        }
        this.fetch()
      })
    }
    // --------------------------------------------------------------
  }
}
</script>

<style>

</style>
