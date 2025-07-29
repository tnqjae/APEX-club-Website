<template>
  <!-- 헤더 -->
  <section class="bg-gradient-to-br from-[#1a2238] to-[#2c3e50] py-16 shadow-md">
    <div class="text-center text-white">
      <h1 class="text-5xl font-extrabold tracking-tight mb-2">Sign-Up</h1>
      <p class="text-lg opacity-70">회원 정보를 입력해 주세요</p>
    </div>
  </section>

  <!-- 회원가입 폼 -->
  <section class="bg-[#0f131c] text-white py-20 px-6 min-h-screen">
    <div class="bg-[#1f2a40] max-w-xl mx-auto p-10 rounded-2xl shadow-2xl space-y-10 transition-all">
      <h2 class="text-3xl font-bold text-center">회원가입</h2>

      <form @submit.prevent="submitForm" class="space-y-6">

        <div>
          <label class="block mb-1 text-sm text-gray-400">이름</label>
          <input
            v-model="form.name"
            class="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
            placeholder="이름을 입력하세요"
            required
          />
        </div>

        <div>
          <label class="block mb-1 text-sm text-gray-400">학과</label>
          <input
            v-model="form.major"
            class="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
            placeholder="학과를 입력하세요"
            required
          />
        </div>

        <div>
          <label class="block mb-1 text-sm text-gray-400">이메일</label>
          <input
            v-model="form.email"
            type="email"
            class="w-full p-3 rounded bg-gray-800 text-white border border-gray-600"
            placeholder="이메일을 입력하세요"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded font-bold text-lg transition hover:scale-105 active:scale-95"
        >
          회원가입
        </button>
      </form>

      <p v-if="error" class="text-red-400 text-center text-sm mt-4">{{ error }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const form = ref({
  kakaoId: '',
  name: '',
  major: '',
  email: '',
})

const error = ref('')

onMounted(() => {
  const kakaoId = route.query.kakaoId as string
  const name = route.query.name as string

  if (!kakaoId) {
    alert('잘못된 접근입니다.')
    router.replace('/login')
    return
  }

  form.value.kakaoId = kakaoId
  form.value.name = name || ''
})

const submitForm = async () => {
  if (!form.value.name || !form.value.major || !form.value.email) {
    error.value = '모든 필드를 입력해 주세요.'
    return
  }

  try {
    const res = await fetch(import.meta.env.VITE_USER_REGISTER_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    const result = await res.json()

    if (!res.ok || result.error) {
      throw new Error(result.error || '회원가입 실패')
    }

    alert('회원가입이 완료되었습니다!')
    router.push('/')
  } catch (err: any) {
    error.value = err.message || '오류가 발생했습니다.'
  }
}
</script>
