<template>
  <section class="bg-[#1a2238] min-h-screen py-16 px-6 text-white">
    <div class="max-w-7xl mx-auto space-y-10">

      <!-- 페이지 제목 -->
      <div class="text-center">
        <h1 class="text-4xl font-bold tracking-wide">Admin Dashboard</h1>
        <p class="text-gray-400 mt-2">관리자 테스트 페이지</p>
      </div>

      <!-- 카드형 통계 요약 -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="bg-[#2a2f3a] p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 class="text-xl font-semibold">총 회원</h2>
          <p class="text-3xl font-bold mt-2">132</p>
        </div>
        <div class="bg-[#2a2f3a] p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 class="text-xl font-semibold">게시글 수</h2>
          <p class="text-3xl font-bold mt-2">58</p>
        </div>
        <div class="bg-[#2a2f3a] p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 class="text-xl font-semibold">갤러리 항목</h2>
          <p class="text-3xl font-bold mt-2">23</p>
        </div>
        <div class="bg-[#2a2f3a] p-6 rounded-xl shadow hover:shadow-lg transition">
          <h2 class="text-xl font-semibold">관리자 계정</h2>
          <p class="text-3xl font-bold mt-2">2</p>
        </div>
      </div>

      <!-- 주요 관리 기능 버튼 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <button class="bg-blue-600 hover:bg-blue-700 py-4 px-6 rounded-xl text-white font-semibold text-lg">
          프로젝트 관리
        </button>
        <button class="bg-green-600 hover:bg-green-700 py-4 px-6 rounded-xl text-white font-semibold text-lg">
          갤러리 관리
        </button>
        <button
          class="bg-yellow-500 hover:bg-yellow-600 py-4 px-6 rounded-xl text-white font-semibold text-lg"
          @click="goToStaff"
        >
          운영진 관리
        </button>
      </div>

    </div>
  </section>
</template>

<script setup>
import { SearchSlash } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const token = sessionStorage.getItem('adminToken')
const isAuthorized = ref(false)

const goToStaff = () => {
  router.push('/adminStaff')
}

onMounted(async () => {
  if (!token) {
    alert("관리자 권한이 없습니다. 로그인 해주세요.")
    return
  }

  try {
    const res = await fetch(import.meta.env.VITE_AUTH_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    const result = await res.json()

    if (res.ok && result.success) {
      isAuthorized.value = true
    } else {
      throw new Error('Invalid token')
    }
  } catch (err) {
    SearchSlash.removeItem('adminToken')
    router.push('/adminMain')
  }
})
</script>
