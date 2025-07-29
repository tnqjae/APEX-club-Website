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
import loginBtn from '@/assets/kakao_login_large_wide.png'

const REST_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY as string
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI as string

const goKakaoLogin = () => {
  const state = crypto.randomUUID()
  sessionStorage.setItem('kakao_state', state)

  const url = new URL('https://kauth.kakao.com/oauth/authorize')
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('client_id', REST_KEY)
  url.searchParams.set('redirect_uri', REDIRECT_URI) // /kakao-callback
  url.searchParams.set('scope', 'profile_nickname')
  url.searchParams.set('state', state)

  window.location.href = url.toString()
}
</script>