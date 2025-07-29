<template>
  <!-- Section Header -->
  <section class="bg-[#1a2238] py-10 bg-gradient-to-br from-primary/10 to-secondary/10">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-[40px] sm:text-[56px] text-white tracking-tight">
        User Management
      </h1>
      <p class="text-gray-300 mt-2">회원 관리</p>
    </div>
  </section>

  <section class="bg-[#0f131c] text-white py-16 px-6">
    <div class="max-w-6xl mx-auto space-y-12">
      <!-- 로딩/에러 -->
      <div v-if="loading" class="text-center text-gray-400">불러오는 중...</div>
      <div v-if="errorMsg" class="text-center text-red-400">{{ errorMsg }}</div>

      <!-- 가입 대기중인 유저 -->
      <div v-if="!loading">
        <h2 class="text-2xl font-bold border-b border-gray-600 pb-2 mb-6">가입 대기중인 유저</h2>
        <table class="min-w-full text-sm border border-gray-700 rounded">
          <thead class="bg-[#1a1f2c] text-gray-300">
            <tr>
              <th class="px-4 py-3 text-left">이름</th>
              <th class="px-4 py-3 text-left">이메일</th>
              <th class="px-4 py-3 text-left">학과</th>
              <th class="px-4 py-3 text-left">가입일</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in pendingUsers" :key="user.USER_ID" class="border-t border-gray-700 hover:bg-gray-800">
              <td class="px-4 py-3">{{ user.USER_NAME }}</td>
              <td class="px-4 py-3">{{ user.EMAIL }}</td>
              <td class="px-4 py-3">{{ user.MAJOR }}</td>
              <td class="px-4 py-3">{{ user.REG_DATE }}</td>
            </tr>
            <tr v-if="pendingUsers.length === 0">
              <td class="px-4 py-6 text-center text-gray-400" colspan="4">
                가입 대기중인 유저가 없습니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 등록된 유저 -->
      <div v-if="!loading">
        <h2 class="text-2xl font-bold border-b border-gray-600 pb-2 mb-6">등록된 유저</h2>
        <table class="min-w-full text-sm border border-gray-700 rounded">
          <thead class="bg-[#1a1f2c] text-gray-300">
            <tr>
              <th class="px-4 py-3 text-left">이름</th>
              <th class="px-4 py-3 text-left">이메일</th>
              <th class="px-4 py-3 text-left">학과</th>
              <th class="px-4 py-3 text-left">가입일</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in approvedUsers" :key="user.USER_ID" class="border-t border-gray-700 hover:bg-gray-800">
              <td class="px-4 py-3">{{ user.USER_NAME }}</td>
              <td class="px-4 py-3">{{ user.EMAIL }}</td>
              <td class="px-4 py-3">{{ user.MAJOR }}</td>
              <td class="px-4 py-3">{{ user.REG_DATE }}</td>
            </tr>
            <tr v-if="approvedUsers.length === 0">
              <td class="px-4 py-6 text-center text-gray-400" colspan="4">
                등록된 유저가 없습니다.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const pendingUsers = ref([])
const approvedUsers = ref([])
const loading = ref(false)
const errorMsg = ref('')

const API_URL = import.meta.env.VITE_USER_LIST_API

onMounted(async () => {
  loading.value = true
  try {
    const res = await fetch(API_URL)
    const data = await res.json()
    pendingUsers.value = data.filter(u => u.state === 'PENDING')
    approvedUsers.value = data.filter(u => u.state === 'ACCEPTED')
  } catch (e) {
    console.error(e)
    errorMsg.value = '유저 목록을 불러오는 중 오류가 발생했습니다.'
  } finally {
    loading.value = false
  }
})
</script>
