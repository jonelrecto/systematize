<template>
  <q-layout view="lHh Lpr fFf">
    <q-page-container class="fit row wrap justify-start items-center content-start">
      <q-page padding>
        <q-card class="mycard" style="width: 500px">
          <q-card-section>
            <div class="text-h6">Login</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="email" filled type="email" hint="Email" />
            <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" hint="Password">
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>

            {{email}}
          </q-card-section>

          <q-separator dark />

          <q-card-actions>
            <q-btn :loading="isLoading" glossy color="positive" class="full-width q-mt-md" label="login" @click="login"></q-btn>
            <q-btn color="positive" class="full-width q-mt-md" @click="showRegisterDialog">Register</q-btn>
          </q-card-actions>
        </q-card>

        <q-dialog v-model="registerDialog" >
          <register></register>
        </q-dialog>

      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import Register from '../pages/Register.vue'

export default {
  components: {
    Register
  },
  data () {
    return {
      email: '',
      password: '',
      isPwd: false,
      registerDialog: false,
      isLoading: false
    }
  },
  methods: {
    login () {
      // console.log(this.$firebaseApp, 'firebaseApp')
      this.isLoading = true
      this.$firebaseApp.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(result => {
          console.log(result, 'result')
          this.isLoading = false
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err, 'error')
        })
    },
    showRegisterDialog () {
      this.registerDialog = true
    }
  }
}
</script>
<style lang="stylus">
#mycard {
  background-color: red
}
</style>
