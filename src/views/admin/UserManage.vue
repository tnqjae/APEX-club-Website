<template>
  <div class="min-h-screen flex flex-col bg-[#0f131c] text-white">
    <!-- Header Section -->
    <section class="bg-[#1a2238] py-10 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div class="container mx-auto px-4 text-center">
        <h1 class="text-[40px] sm:text-[56px] text-white tracking-tight">
          User Management
        </h1>
        <p class="text-gray-300 mt-2">회원 관리</p>
      </div>
    </section>

    <!-- Main Content -->
    <main class="flex-grow px-6 pt-16 pb-0">
      <div class="max-w-6xl mx-auto space-y-12">
        <!-- 로딩 / 에러 -->
        <div v-if="loading" class="text-center text-gray-400">불러오는 중...</div>
        <div v-if="errorMsg" class="text-center text-red-400">{{ errorMsg }}</div>

        <!-- 가입 대기중 유저 -->
        <section v-if="!loading">
          <h2 class="text-2xl font-bold border-b border-gray-600 pb-2 mb-6">가입 대기중인 유저</h2>
          <table class="min-w-full text-sm border border-gray-700 rounded">
            <thead class="bg-[#1a1f2c] text-gray-300">
              <tr>
                <th class="px-4 py-3 text-left">이름</th>
                <th class="px-4 py-3 text-left">이메일</th>
                <th class="px-4 py-3 text-left">학과</th>
                <th class="px-4 py-3 text-left">가입일</th>
                <th class="px-4 py-3 text-left">액션</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, idx) in pendingUsers" :key="user.USER_ID" class="border-t border-gray-700 hover:bg-gray-800">
                <td class="px-4 py-3">{{ user.USER_NAME }}</td>
                <td class="px-4 py-3">{{ user.EMAIL }}</td>
                <td class="px-4 py-3">{{ user.MAJOR }}</td>
                <td class="px-4 py-3">{{ user.REG_DATE }}</td>
                <td class="px-4 py-3 space-x-2">
                  <button class="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs" @click="acceptUser(user.USER_ID)">수락</button>
                  <button class="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs" @click="rejectUser(user.USER_ID)">거절</button>
                </td>
              </tr>
              <tr v-if="pendingUsers.length === 0">
                <td class="px-4 py-6 text-center text-gray-400" colspan="5">
                  가입 대기중인 유저가 없습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        <!-- 등록된 유저 -->
        <section v-if="!loading">
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
        </section>
      </div>
    </main>

    <!-- Optional Footer -->
    <footer class="text-center py-4 text-gray-500 text-sm border-t border-gray-700">
      © 2025 APEX
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CryptoJS from 'crypto-js'

const router = useRouter()

const pendingUsers = ref([])
const approvedUsers = ref([])
const loading = ref(false)
const errorMsg = ref('')

const API_URL = import.meta.env.VITE_USER_LIST_API
const ACCEPT_API = import.meta.env.VITE_USER_ACCEPT_API
const REJECT_API = import.meta.env.VITE_USER_REJECT_API
const AUTH_API = import.meta.env.VITE_AUTH_API
const AES_KEY = import.meta.env.VITE_ENCRYPTION_KEY
const AES_IV = import.meta.env.VITE_ENCRYPTION_IV


function closeModal() {
  showModal.value = false
}

function authHeaders() {
  const token = sessionStorage.getItem('adminToken')
  return token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : {}
}

onMounted(async () => {
  const token = sessionStorage.getItem('adminToken')

  if (!token) {
    router.push('/')
    return
  }

  try {
    const res = await fetch(AUTH_API, {
      headers: authHeaders()
    })

    if (!res.ok) throw new Error('Unauthorized')

    const data = await res.json()

    if (!data.success) {
      alert('비정상 접근')
      router.push('/')
      return
    }

    fetchUsers()
  } catch (e) {
    console.error('인증 실패:', e)
    router.push('/')
  }
})

function decrypt(cipher: string): string {
  const key = CryptoJS.enc.Utf8.parse(AES_KEY)
  const iv = CryptoJS.enc.Utf8.parse(AES_IV)
  const decrypted = CryptoJS.AES.decrypt(cipher, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return decrypted.toString(CryptoJS.enc.Utf8)
}

async function fetchUsers() {
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await fetch(API_URL, {
      method: 'GET',
      headers: authHeaders()
    })
    if (!res.ok) throw new Error('유저 조회 실패')

    const data = await res.json()

    // EMAIL만 복호화
    const processedData = data.map(u => ({
      ...u,
      EMAIL: decrypt(u.EMAIL) // 이메일만 복호화
    }))

    pendingUsers.value = processedData.filter(u => u.state === 'PENDING')
    approvedUsers.value = processedData.filter(u => u.state === 'ACCEPTED')
  } catch (e) {
    console.error(e)
    errorMsg.value = '유저 목록을 불러오는 중 오류가 발생했습니다.'
  } finally {
    loading.value = false
  }
  
}
async function updateUserStatus(userId, isAccept) {
  const url = isAccept ? ACCEPT_API : REJECT_API
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ USER_ID: userId })
    })
    if (!res.ok) throw new Error(isAccept ? '수락 실패' : '거절 실패')
    await fetchUsers()
  } catch (e) {
    console.error(e)
    errorMsg.value = `유저 ${isAccept ? '수락' : '거절'} 중 오류 발생`
  }
}

function acceptUser(userId) {
  updateUserStatus(userId, true)
}
function rejectUser(userId) {
  updateUserStatus(userId, false)
}

</script>
