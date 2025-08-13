<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { getToken, keepToken } from '@/utils/cookieTool'
import TodoList from '@/components/TodoList.vue'

const { VITE_APP_BASEURL: baseUrl } = import.meta.env
const isLogin = ref(false)
const modeState = ref('login')

const userLogin = ref({
  email: '',
  password: '',
})

const userRegister = ref({
  email: '',
  password: '',
  nickname: '',
})

const signUp = async () => {
  if (!userRegister.value.email || !userRegister.value.password || !userRegister.value.nickname) {
    alert('請輸入完整註冊資訊')
    return
  }
  try {
    await axios.post(`${baseUrl}/users/sign_up`, userRegister.value)
    userRegister.value = {
      email: '',
      password: '',
      nickname: '',
    }
    alert('註冊成功')
    modeState.value = 'login'
  } catch (error) {
    alert(error.response?.data?.message || '註冊失敗，請重新註冊或洽詢客服')
  }
}
const signIn = async () => {
  if (!userLogin.value.email || !userLogin.value.password) {
    alert('請輸入完整 email 與 password')
    return
  }
  try {
    const res = await axios.post(`${baseUrl}/users/sign_in`, userLogin.value)
    const { token, exp } = res.data
    keepToken(token, exp)
    checkout()
  } catch (error) {
    userLogin.value.password = ''
    alert(error.response?.data?.message || '登入失敗，請重新登入或洽詢客服')
  }
}
const userNickname = ref('')
const checkout = async () => {
  try {
    const res = await axios.get(`${baseUrl}/users/checkout`, {
      headers: {
        authorization: getToken(),
      },
    })
    axios.defaults.headers['authorization'] = getToken()
    userNickname.value = res.data.nickname
    isLogin.value = true
  } catch (error) {
    alert(error.response?.data?.message + '，請重新登入或洽詢客服')
  }
}

const signOut = async () => {
  try {
    const res = await axios.post(
      `${baseUrl}/users/sign_out`,
      {},
      {
        headers: {
          authorization: getToken(),
        },
      },
    )
    alert(res.data.message)
    isLogin.value = false
  } catch (error) {
    alert(error.response?.data?.message || '登出失敗，請重新登出或洽詢客服')
  }
}

const switchMode = (mode) => {
  if (mode === 'login') {
    modeState.value = 'singup'
  } else {
    modeState.value = 'login'
  }
}

onMounted(() => {
  const token = getToken()
  if (token) {
    checkout()
  }
})
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <h2 class="text-3xl font-bold underline">Week2 練習</h2>
    <!-- 登入 / 註冊 -->
    <div class="flex flex-col">
      <template v-if="modeState === 'login'">
        <label class="block mb-4">
          <span class="text-primary-500">Email</span>
          <input
            type="email"
            class="block w-full rounded-md bg-gray-100 border-transparent ring-0 focus:bg-white focus:ring-3 focus:ring-primary-500 text-slate-900"
            placeholder="example@gmail.com"
            v-model.trim="userLogin.email"
            :disabled="isLogin"
          />
        </label>
        <label class="block mb-4">
          <span class="text-primary-500">Password</span>
          <input
            type="password"
            class="block w-full rounded-md bg-gray-100 border-transparent ring-0 focus:bg-white focus:ring-3 focus:ring-primary-500 text-slate-900"
            placeholder="password"
            v-model="userLogin.password"
            :disabled="isLogin"
          />
        </label>
        <div class="self-center flex flex-col gap-y-2">
          <button type="button" class="btn-md rounded btn-primary" @click="signIn">登入</button>
          <button type="button" class="btn-md rounded btn-primary" @click="switchMode(modeState)">
            前往註冊
          </button>
        </div>
      </template>
      <template v-else>
        <label class="block mb-4">
          <span class="text-primary-500">Email</span>
          <input
            type="email"
            class="block w-full rounded-md bg-gray-100 border-transparent ring-0 focus:bg-white focus:ring-3 focus:ring-primary-500 text-slate-900"
            placeholder="example@gmail.com"
            v-model.trim="userRegister.email"
          />
        </label>
        <label class="block mb-4">
          <span class="text-primary-500">Password</span>
          <input
            type="password"
            class="block w-full rounded-md bg-gray-100 border-transparent ring-0 focus:bg-white focus:ring-3 focus:ring-primary-500 text-slate-900"
            placeholder="password"
            v-model="userRegister.password"
          />
        </label>
        <label class="block mb-4">
          <span class="text-primary-500">Nickname</span>
          <input
            type="text"
            class="block w-full rounded-md bg-gray-100 border-transparent ring-0 focus:bg-white focus:ring-3 focus:ring-primary-500 text-slate-900"
            placeholder="example"
            v-model.trim="userRegister.nickname"
          />
        </label>
        <div class="self-center flex flex-col gap-y-2">
          <button type="button" class="btn-md rounded btn-primary" @click="signUp">註冊</button>
          <button type="button" class="btn-md rounded btn-primary" @click="switchMode(modeState)">
            前往登入
          </button>
        </div>
      </template>
    </div>
    <!-- TodoList -->

    <template v-if="isLogin">
      <div class="flex">
        <h3 class="text-[24px] me-auto">
          <span class="font-bold text-primary-500">{{ userNickname }}</span
          >'s TodoList
        </h3>
        <button type="button" class="btn-md rounded btn-danger" @click="signOut">登出</button>
      </div>
      <TodoList />
    </template>
    <template v-else>
      <div class="flex flex-col">
        <h3 class="block">TodoList</h3>
        <p>尚未登入</p>
      </div>
    </template>
  </div>
</template>
