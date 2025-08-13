<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const { VITE_APP_BASEURL: baseUrl } = import.meta.env

const todos = ref([])
const getTodo = async () => {
  try {
    const res = await axios.get(`${baseUrl}/todos`)
    const { data } = res.data

    todos.value = data.map((item) => ({ ...item, editMode: false }))
  } catch (error) {
    alert(error.response.data.message || '系統有誤，請洽詢客服')
  }
}

const newTodo = ref('')
const addTodo = async () => {
  if (!newTodo.value) {
    alert('請輸入代辦事項')
    return
  }
  try {
    await axios.post(`${baseUrl}/todos`, {
      content: newTodo.value,
    })
    newTodo.value = ''
    getTodo()
  } catch (error) {
    alert(error.response.data.message || '系統有誤，請洽詢客服')
  }
}

const patchTodo = async (id) => {
  try {
    await axios.patch(`${baseUrl}/todos/${id}/toggle`)
  } catch (error) {
    alert(error.response.data.message + '，系統有誤，請洽詢客服')
  }
}

const delTodo = async (id) => {
  try {
    const res = await axios.delete(`${baseUrl}/todos/${id}`)
    alert(res.data.message)
    getTodo()
  } catch (error) {
    alert(error.response.data.message + '，系統有誤請重試或洽詢客服')
  }
}

const tempTodo = ref({})
const switchEditMode = (id) => {
  const targetIndex = todos.value.findIndex((todo) => todo.id === id)
  todos.value[targetIndex].editMode = !todos.value[targetIndex].editMode

  if (todos.value[targetIndex].editMode) {
    tempTodo.value[id] = todos.value[targetIndex].content
  }
}

const editTodo = async (id) => {
  const target = todos.value.filter((todo) => todo.id === id)
  if (tempTodo.value[id] === target[0].content) {
    alert('沒有更改代辦事項')
    return
  }
  try {
    const res = await axios.put(`${baseUrl}/todos/${id}`, {
      content: tempTodo.value[id],
    })
    alert(res.data.message)
    tempTodo.value[id] = ''
    switchEditMode(id)
    getTodo()
  } catch (error) {
    alert(error.response.data.message + '，系統有誤，請洽詢客服')
  }
}

// 初始載入 todo
onMounted(() => {
  getTodo()
})
</script>
<template>
  <div class="flex">
    <input
      type="text"
      class="block w-full rounded-l-md bg-gray-100 border-transparent ring-0 focus:bg-white focus:ring-3 focus:ring-primary-500 text-slate-900"
      placeholder="代辦事項..."
      v-model.trim="newTodo"
    />
    <button type="button" class="btn-md btn-info rounded-e-md" @click="addTodo">＋</button>
  </div>
  <template v-if="todos.length > 0">
    <div class="flex items-center" v-for="todo in todos" :key="todo.id">
      <template v-if="!todo.editMode">
        <label class="inline-flex items-center">
          <input
            type="checkbox"
            class="rounded bg-primary-500 border-transparent focus:border-transparent focus:bg-primary-900 focus:ring-1 focus:ring-offset-2 focus:ring-primary-500"
            v-model="todo.status"
            @click="patchTodo(todo.id)"
          />
          <span class="ml-2" :class="todo.status ? 'line-through' : ''">{{ todo.content }}</span>
        </label>
        <div class="flex ms-auto">
          <button
            type="button"
            class="btn-md btn-info rounded-s-md"
            @click="switchEditMode(todo.id)"
          >
            編
          </button>
          <button type="button" class="btn-md btn-danger rounded-e-md" @click="delTodo(todo.id)">
            刪
          </button>
        </div>
      </template>
      <template v-else>
        <div class="flex items-center w-full">
          <input
            type="text"
            class="rounded-md bg-gray-100 border-transparent ring-0 focus:bg-white focus:ring-3 focus:ring-primary-500 text-slate-900"
            v-model="tempTodo[todo.id]"
          />
          <div class="ms-4">
            <button class="btn-md btn-danger rounded-s-md" @click="switchEditMode(todo.id)">
              取消
            </button>
            <button class="btn-md btn-info rounded-e-md" @click="editTodo(todo.id)">確認</button>
          </div>
        </div>
      </template>
    </div>
  </template>
  <template v-else>
    <h3>目前沒有代辦</h3>
  </template>
</template>
<style></style>
