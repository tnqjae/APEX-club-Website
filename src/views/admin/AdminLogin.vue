<template>
  <!-- Section Header -->
  <section class="bg-[#1a2238] py-10 bg-gradient-to-br from-primary/10 to-secondary/10">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-[48px] sm:text-[64px] text-white tracking-tight">
        Login
      </h1>
    </div>
  </section>

  <!-- Login Form -->
  <section class="bg-[#0f131c] min-h-screen text-white py-20 px-4">
    <div class="bg-[#1a2238] max-w-5xl mx-auto p-8 rounded-lg shadow-lg">
      <h2 class="text-3xl font-bold mb-6 text-center">Admin Login</h2>
      <form class="space-y-6" @submit.prevent="handleLogin">
        <div>
          <label for="username" class="block text-sm font-medium text-gray-300">ID</label>
          <input
            v-model="username"
            type="text"
            id="username"
            required
            class="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-300">Password</label>
          <input
            v-model="password"
            type="password"
            id="password"
            required
            class="mt-1 block w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-200"
        >
          Login
        </button>
        <p v-if="error" class="text-red-400 text-sm mt-4 text-center">{{ error }}</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')
const error = ref('')

const handleLogin = async () => {
  error.value = ''
  try {
    const response = await fetch(import.meta.env.VITE_ADLOGIN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: username.value, password: password.value }),
    })

    const data = await response.json()

    if (response.ok && data.success) {
      alert(`환영합니다, 관리자님`);
      sessionStorage.setItem('adminToken', data.token)
      //리다이렉션
      router.push('/adminMain');
    } else {
      error.value = data.error || '로그인 실패'
    }
  } catch (err) {
    error.value = '서버 오류 발생'
  }
}
</script>