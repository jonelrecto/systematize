<template>
  <q-page>
    <q-input color="orange" standout bottom-slots v-model="todo" label="Enter todo" clearable @keyup.enter="addTodo">
      <template v-slot:append>
        <q-icon name="mdi-send" />
      </template>
    </q-input>
    <q-list bordered padding class="rounded-borders">
      <q-item-label header>Todo List</q-item-label>

      <q-item clickable v-ripple v-for="(todo, index) in todos" :key="index">
        <q-item-section avatar top>
          <q-checkbox v-model="todo.isDone" @input="updateTask(todo)" :label="todo.todoName"/>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">{{todo.todoName}}</q-item-label>
          <q-item-label caption>Date created: February 22nd, 2019</q-item-label>
        </q-item-section>

        <q-item-section side>
          <div class="row">
            <q-btn round color="info" icon="mdi-pencil" @click="openEditDialog(todo)"></q-btn>
            <q-btn round color="negative" icon="mdi-delete-circle" @click="deleteTodo(todo)"></q-btn>
          </div>
        </q-item-section>
      </q-item>
    </q-list>

    <q-dialog v-model="editDialog" persistent>
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Edit Task</div>
        </q-card-section>

        <q-card-section>
          <q-input dense v-model="editTodoName" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Update Task" @click="setTask" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  mounted () {
    this.$binding('todos', this.$firestoreApp.collection('todos'))
      .then(todos => {
        console.log(todos, 'todos')
      })
  },
  data () {
    return {
      todo: '',
      isDone: false,
      todos: [],
      editDialog: false,
      editTodoId: '',
      editTodoName: ''
    }
  },
  methods: {
    addTodo () {
      var todo = {
        todoName: this.todo,
        isDone: this.isDone,
        createdAt: new Date()
      }

      // this.todos.push(todo)
      // console.log(this.todos, 'laman ng todos')
      this.$firestoreApp.collection('todos').add(todo)
      this.todo = ''
    },
    deleteTodo (task) {
      // this.todos.splice(index, 1)
      var id = task['.key']
      this.$firestoreApp.collection('todos').doc(id).delete()
    },
    updateTask (task) {
      var id = task['.key']
      this.$firestoreApp.collection('todos').doc(id).update({
        isDone: task.isDone
      })
    },
    openEditDialog (task) {
      this.editTodoId = task['.key']
      this.editTodoName = task.todoName
      this.editDialog = true
    },
    setTask () {
      var todoBago = {
        todoName: this.editTodoName,
        isDone: false,
        createdAt: new Date()
      }
      this.$firestoreApp.collection('todos').doc(this.editTodoId).set(todoBago)
      this.editDialog = false
    }
  }
}
</script>
