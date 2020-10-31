<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        >
          <!-- <q-icon name="mdi_attachment" /> -->
        </q-btn>
        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <div>
           <q-btn
           rounded
           color="negative"
           icon-right="exit_to_app"
           label="Logout"
           @click="logout"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigations</q-item-label>
        <q-item clickable :to="{ name: 'todos' }">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Todos</q-item-label>
            <q-item-label caption>for todos</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="$router.push('/')">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Scheduling</q-item-label>
            <q-item-label caption>for scheduling</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="$router.push('/table')">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Table</q-item-label>
            <q-item-label caption>for table</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="$router.push('/carousel')">
          <q-item-section avatar>
            <q-icon name="school" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Carousel</q-item-label>
            <q-item-label caption>for carousel</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    logout () {
      this.$firebaseApp.auth().signOut()
        .then(() => {
          this.$router.push('/login')
        })
    }
  }
}
</script>

<style>
</style>
