<template>
  <q-page class="flex flex-center">
     <q-stepper
      v-model="step"
      ref="stepper"
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Select Date of Reservation"
        icon="settings"
        :done="step > 1"
      >
      <div class="row">
        <q-date class="q-mr-md" v-model="date" mask="YYYY/MM/DD HH:mm" color="purple" />
        <q-time v-model="date" mask="YYYY/MM/DD HH:mm" color="purple" />
      </div>
      </q-step>

      <q-step
        :name="2"
        title="Personal Information"
        caption="Optional"
        icon="create_new_folder"
        :done="step > 2"
      >
        {{date}}
        <q-select
          filled
          v-model="selectEvent"
          :options="eventOptions"
          label="Events"
          emit-value
          map-options
        />
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn @click="$refs.stepper.next(), onContinue" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" />
          <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </q-page>
</template>

<style>
</style>

<script>
// import { date } from 'quasar'

export default {
  name: 'PageIndex',
  mounted () {
  },
  data () {
    return {
      selectEvent: '',
      step: 1,
      // date: date.formatDate(new Date(), 'YYYY/MM/DDTh:m:s A')
      date: new Date(),
      events: [
        {
          eventName: 'birthday',
          packageId: '10283'
        },
        {
          eventName: 'wedding',
          packageId: 'llkajsdf9823'
        }
      ]
    }
  },
  computed: {
    eventOptions () {
      let options = this.events.map(event => {
        return {
          label: event.eventName,
          value: event.packageId
        }
      })
      // options: [
      //   {
      //     label: 'birthday',
      //     value: '10293'
      //   },
      //   {
      //     label: 'wedding',
      //     value: '2831'
      //   }
      // ]
      return options
    }
  },
  methods: {
    onClickDate (value, reason, details) {
      // console.log(value, 'value')
      // console.log(reason, 'reason')
      // console.log(details, 'details' + 'more details')
      // this.$router.push(`/schedule/${value}`)
      // var test = '/schedule/' + value
      var test = {
        date: new Date(this.date),
        first: this.firstName
      }
      console.log(test, 'test')
    },
    onContinue () {
      console.log(new Date(this.date))
    }
  }
}
</script>
