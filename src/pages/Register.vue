<template>
    <q-card class="my-card" style="width: 500px">
      <q-card-section>
        <div class="text-h6">Register</div>
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
        <q-input v-model="confirmPassword" filled :type="isPwd ? 'password' : 'text'" hint="Confirm Password">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
        <q-btn color="positive" class="full-width q-mt-md" @click="register">Register</q-btn>
      </q-card-actions>
    </q-card>
</template>
<script>
var actionCodeSettings = {
  url: 'localhost:8080/#/',
  handleCodeInApp: true
}

export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      isPwd: false,
      actionCodeSettings: actionCodeSettings
    }
  },
  methods: {
    register () {
      if (this.password === this.confirmPassword) {
        this.$firebaseApp.auth().createUserWithEmailAndPassword(this.email, this.password)
          .then(result => {
            console.log(result, 'result')
            let user = this.$firebaseApp.auth().currentUser
            console.log(user, 'users')
            user.sendEmailVerification()
              .then(() => {
                console.log('email verification send')
              })
              .catch(err => {
                console.log(err, 'email verify not send')
              })
              // superstyx017@gmail.com
          })
          .catch(err => {
            console.log(err, 'error')
          })
      } else {
        this.$q.notify('Password did not match')
      }
    }
  }
}
</script>
<style lang="stylus">
</style>
