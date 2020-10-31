<template>
  <q-page padding>
     <q-carousel
      animated
      v-model="slide"
      arrows
      navigation
      infinite
    >
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" >
        <div
          class="row flex items-end justify-center  q-pa-md"
          style="height: 100%"
        >
          <div>
            <q-btn no-caps rounded icon="events" label="Reserve Now" color="negative"></q-btn>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
    </q-carousel>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: 1
    }
  }
}
</script>
