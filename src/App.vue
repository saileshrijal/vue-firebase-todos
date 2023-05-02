<script setup>
</script>

<template>
  <div class="min-h-screen bg-blue-100 p-5 ">
    <div class="sm:w-10/12 md:w-8/12 lg:w-6/12 mx-auto">

      <!-- header -->
      <form @submit.prevent="addTodo">
        <div class="text-center border-blue-600 rounded-lg">
          <h1 class="uppercase font-bold text-blue-600 text-3xl">Alive Todos</h1>
          <p class="mt-2">A simple todo app built with Vue 3 and firebase</p>
          <div class="flex justify-center mt-5">
            <input v-model="todoTitle" type="text"
              class="w-full p-2 rounded-s-lg focus:border-2 focus:border-blue-600 focus:outline-none focus:transition focus:duration-300"
              placeholder="Write your todo">
            <button :disabled="!todoTitle"
              class="bg-blue-600 text-white py-2 px-4 text-xl rounded-r-lg hover:bg-blue-700">&plus;</button>
          </div>
        </div>
      </form>
      <!-- line -->
      <hr class="border border-blue-400 my-4 mx-auto">

      <!-- todos -->
      <div>
        <div v-for="todo in todos" :key="todo.id" :class="{ 'bg-blue-200': todo.completed }"
          class="bg-white rounded-lg p-2 flex justify-between items-center mb-3 shadow-md">
          <p :class="{ 'line-through': todo.completed }">
            {{ todo.title }}
          </p>
          <div>
            <button @click="completeToggle(todo.id)"
              :class="todo.completed ? 'bg-white text-black hover:bg-gray-100' : 'bg-green-600 hover:bg-green-700'"
              class="py-1 px-2 rounded-l-lg text-white text-xl ">&check;</button>
            <button @click="deleteTodo(todo.id)"
              class="bg-red-600 py-1 px-2 rounded-r-lg text-white text-xl hover:bg-red-700">&cross;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2';
import { ref, onMounted } from 'vue';

const todos = ref([]);
const todoTitle = ref('');

onMounted(()=>{
  todos.value = [
    {id:1, title:'Learn Vue 3', completed: false},
    {id:2, title:'Learn React', completed: false},
    {id:3, title:'Learn Angular', completed: false},
  ]
})

const addTodo = () =>{
  const newTodo = {
    id: todos.value.length +1,
    title: todoTitle.value,
    completed: false
  }
  todos.value.unshift(newTodo)
  Swal.fire({
  position: 'top-end',
  icon: 'success',
  title: 'Your todo has been added',
  showConfirmButton: false,
  timer: 1500
})
  todoTitle.value = ''
}

const completeToggle = (id) => {
  const index = todos.value.findIndex(x=>x.id===id);
  todos.value[index].completed = !todos.value[index].completed;
}

const deleteTodo = (id)=>{
  Swal.fire({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      todos.value = todos.value.filter(x=>x.id!==id);
      Swal.fire(
        'Deleted!',
        'Your todo has been deleted.',
        'success'
      )
      return true;
    }
    return false;
  })
}
</script>
