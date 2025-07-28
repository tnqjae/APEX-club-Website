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
    <div class="bg-[#1a2238] max-w-5xl mx-auto p-8 rounded-lg shadow-lg text-center">
      <h2 class="text-3xl font-bold mb-6">카카오 로그인</h2>

      <div class="flex justify-center">
        <button @click="goKakaoLogin" class="focus:outline-none">
          <img
            :src="loginBtn"
            alt="카카오 로그인"
            class="h-14 hover:scale-105 active:scale-95 transition"
          />
        </button>
      </div>

      <p v-if="error" class="text-red-400 mt-4 text-sm">{{ error }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import loginBtn from '@/assets/kakao_login_large_wide.png'

const REST_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY as string
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI as string

const error = ref('')
const route = useRoute()
const router = useRouter()

// 1) 로그인 버튼 → 카카오 authorize URL로 이동
const goKakaoLogin = () => {
  const state = crypto.randomUUID()
  sessionStorage.setItem('kakao_state', state)

  const url = new URL('https://kauth.kakao.com/oauth/authorize')
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('client_id', REST_KEY)
  url.searchParams.set('redirect_uri', REDIRECT_URI)
  url.searchParams.set('scope', 'profile_nickname') // email 제거
  url.searchParams.set('state', state)

  window.location.href = url.toString()
}

// 2) redirect 후 code 처리
onMounted(async () => {
  const code = route.query.code as string | undefined
  const state = route.query.state as string | undefined

  if (!code) return

  const saved = sessionStorage.getItem('kakao_state')
  if (saved && state && saved !== state) {
    error.value = '잘못된 요청입니다. (state mismatch)'
    return
  }

  try {
    const token = await exchangeToken(code)
    const me = await fetchMe(token.access_token)

    const name = me.kakao_account?.profile?.nickname ?? 'Unknown'
    alert(`로그인 성공!\n닉네임: ${name}`)

    router.replace({ path: route.path, query: {} })
  } catch (e) {
    console.error(e)
    error.value = '로그인 처리 중 오류가 발생했어요.'
  }
})

// 토큰 교환
async function exchangeToken(code: string) {
  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: REST_KEY,
    redirect_uri: REDIRECT_URI,
    code,
  })

  const res = await fetch('https://kauth.kakao.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
    body: body.toString(),
  })
  const data = await res.json()
  if (!res.ok || data.error) {
    throw new Error(data.error_description || data.error || 'token error')
  }
  return data as {
    access_token: string
    refresh_token: string
    token_type: string
    expires_in: number
    scope?: string
  }
}

// 유저 정보 조회
async function fetchMe(accessToken: string) {
  const res = await fetch('https://kapi.kakao.com/v2/user/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error('me api error')
  return res.json()
}
</script>
