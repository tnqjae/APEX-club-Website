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
        <!-- 이름 -->
        <div>
          <label class="block mb-1 text-sm text-gray-400">이름</label>
          <input v-model="form.name" class="w-full p-3 rounded bg-gray-800 text-white border border-gray-600" placeholder="이름을 입력하세요" required />
        </div>

        <!-- 학과 -->
        <div>
          <label class="block mb-1 text-sm text-gray-400">학과</label>
          <input v-model="form.major" class="w-full p-3 rounded bg-gray-800 text-white border border-gray-600" placeholder="학과를 입력하세요" required />
        </div>

        <!-- 학번 -->
        <div>
          <label class="block mb-1 text-sm text-gray-400">학번</label>
          <input v-model="form.stuId" class="w-full p-3 rounded bg-gray-800 text-white border border-gray-600" placeholder="학번을 입력하세요" required />
        </div>

        <!-- 이메일 -->
        <div>
          <label class="block mb-1 text-sm text-gray-400">이메일</label>
          <input v-model="form.email" type="email" class="w-full p-3 rounded bg-gray-800 text-white border border-gray-600" placeholder="이메일을 입력하세요" required />
        </div>

        <!-- 약관 동의 -->
        <div class="space-y-4">
          <div class="flex items-start space-x-2">
            <input type="checkbox" v-model="form.agree_terms" class="mt-1" />
            <div class="text-sm">
              <span>이용약관에 동의합니다</span>
              <button type="button" @click="showTermsModal = true" class="ml-2 text-blue-400 underline">약관 보기</button>
            </div>
          </div>

          <div class="flex items-start space-x-2">
            <input type="checkbox" v-model="form.agree_privacy" class="mt-1" />
            <div class="text-sm">
              <span>개인정보 수집 및 이용에 동의합니다</span>
              <button type="button" @click="showPrivacyModal = true" class="ml-2 text-blue-400 underline">내용 보기</button>
            </div>
          </div>
        </div>

        <!-- 제출 버튼 -->
        <button type="submit" class="w-full bg-yellow-400 hover:bg-yellow-300 text-black py-3 rounded font-bold text-lg transition hover:scale-105 active:scale-95">
          회원가입
        </button>
      </form>

      <p v-if="error" class="text-red-400 text-center text-sm mt-4">{{ error }}</p>
    </div>
  </section>

  <!-- 모달 템플릿은 그대로 유지 -->
  <!-- ... -->
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const showTermsModal = ref(false)
const showPrivacyModal = ref(false)

const form = ref({
  kakaoId: '',
  name: '',
  major: '',
  email: '',
  stuId: '',
  agree_terms: false,
  agree_privacy: false,
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

const validateForm = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const studentIdRegex = /^[0-9]+$/
  const nameMajorRegex = /^[가-힣a-zA-Z0-9\s]+$/

  if (!emailRegex.test(form.value.email)) {
    error.value = '유효한 이메일 형식이 아닙니다.'
    return false
  }
  if (!studentIdRegex.test(form.value.stuId)) {
    error.value = '학번은 숫자만 입력해야 합니다.'
    return false
  }
  if (!nameMajorRegex.test(form.value.name)) {
    error.value = '이름에는 특수문자를 사용할 수 없습니다.'
    return false
  }
  if (!nameMajorRegex.test(form.value.major)) {
    error.value = '학과에는 특수문자를 사용할 수 없습니다.'
    return false
  }
  return true
}

const submitForm = async () => {
  error.value = ''

  if (!form.value.name || !form.value.major || !form.value.email || !form.value.stuId) {
    error.value = '모든 필드를 입력해 주세요.'
    return
  }
  if (!form.value.agree_terms || !form.value.agree_privacy) {
    error.value = '약관에 모두 동의해야 회원가입이 가능합니다.'
    return
  }
  if (!validateForm()) return

  const payload = {
    ...form.value,
    email: form.value.email,
    stuId: form.value.stuId,
  }

  try {
    const res = await fetch(import.meta.env.VITE_USER_REGISTER_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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

watch(() => form.value.name, (val) => {
  form.value.name = val.replace(/[^가-힣a-zA-Z0-9\s]/g, '')
})
watch(() => form.value.major, (val) => {
  form.value.major = val.replace(/[^가-힣a-zA-Z0-9\s]/g, '')
})
watch(() => form.value.stuId, (val) => {
  form.value.stuId = val.replace(/[^0-9]/g, '')
})
</script>
