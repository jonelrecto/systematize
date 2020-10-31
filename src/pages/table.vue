<template>
  <q-page padding>
    <q-table
      :title="title"
      :data="data"
      :columns="columns"
      :filter="filter"
      row-key="name"
      binary-state-sort
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="name" :props="props">
            {{ props.row.name }}
            <q-popup-edit v-model="props.row.name" title="Edit the Name" @save="onSaveDessert(props.row)">
              <q-input v-model="props.row.name" dense autofocus counter />
            </q-popup-edit>
          </q-td>
          <q-td key="calories" :props="props">{{ props.row.calories }}</q-td>
          <q-td key="fat" :props="props">{{ props.row.fat }}</q-td>
          <q-td key="carbs" :props="props">{{ props.row.carbs }}</q-td>
          <q-td key="actions" :props="props">
            <q-btn @click="deleteDessert(props.row)" no-caps icon="delete" dense color="negative" label="Delete"></q-btn>
          </q-td>
        </q-tr>
      </template>
      <!-- search -->
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
      <!-- <q-td slot="body-cell-name" slot-scope="props"  :props="props">
        {{props.row.name}}
        <q-popup-edit v-model="props.row.name" title="Edit the Name">
          <q-input v-model="props.row.name" dense autofocus counter />
        </q-popup-edit>
      </q-td> -->
      <!-- action buttons -->
      <!-- <q-td slot="body-cell-actions" slot-scope="props" :key="props.row.name" :props="props">
        <q-btn no-caps icon="delete" dense color="negative" label="Delete"></q-btn>
      </q-td> -->
    </q-table>
    <!-- floating button -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="primary" @click="addDessertDialog = true"/>
    </q-page-sticky>
    <!-- dialog -->
    <q-dialog v-model="addDessertDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">New Dessert</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="newDessert.name" autofocus label="Dessert Name"/>
          <q-input type="number" dense v-model="newDessert.calories" label="Calories"/>
          <q-input type="number" dense v-model="newDessert.fat" label="Fat"/>
          <q-input type="number" dense v-model="newDessert.carbs" label="Carbs"/>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add Dessert" v-close-popup v-on:click="addDessert"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      newDessert: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0
      },
      addDessertDialog: false,
      filter: '',
      title: 'my Tables',
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'calories', align: 'left', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'actions', label: 'Action' }
      ],
      data: [
        {
          name: 'tinapay',
          calories: 100,
          fat: 100,
          carbs: 20
        }
      ]
    }
  }, // end of data
  methods: {
    addDessert () {
      this.data.push(this.newDessert)
      this.newDessert = {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0
      }
      this.addDessertDialog = false
    },
    deleteDessert (row) {
      console.log(row, 'row')
      this.data.splice(row.__index, 1)
    },
    onSaveDessert (row) {
      let id = row['.key']
      console.log(row, 'row')
      // console.log(value, 'value')
      // console.log(initialValue, 'initial value')
      this.$firestoreApp.collection('desserts').doc(id).update({
        name: row.name
      })
    }
  }
}
</script>
