<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
/**
 * 상태
 */

const router = useRouter()
const presidents = ref([])        // active & 회장/부회장
const staffs = ref([])            // active & 운영진
const historyPresident = ref([])  // retired (역대)

const loading = ref(false)
const errorMsg = ref('')

const showModal = ref(false)
const isCreate = ref(true)
const targetGroup = ref(null)   // 'presidents' | 'staffs' | 'historyPresident'
const targetIndex = ref(-1)

const form = reactive({
  id: null,
  name: '',
  role: '',
  photo: '',
  bio: '',
  status: 'active' // active | retired
})

function authHeaders() {
  const token = sessionStorage.getItem('adminToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}
/**
 * API 유틸
 */
const API_BASE = import.meta.env.VITE_STAFF_API

onMounted(async () => {
  const token = sessionStorage.getItem('adminToken')

  // 토큰 없으면 바로 리다이렉션
  if (!token) {
    router.push('/')
    return
  }

  try {
    const res = await fetch(import.meta.env.VITE_AUTH_API, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) throw new Error('Unauthorized')

    const data = await res.json()

    // 상태값 검사 예: {"state": "ACCEPTED"}
    if (!data.success) {
      alert("비정상 접근")
      router.push('/')
      return
    }

    // 인증 성공 시 데이터 fetch
    fetchStaffData()
  } catch (e) {
    console.error('인증 실패:', e)
    router.push('/')
  }
})


/**
 * Fetch
 */
async function fetchStaffData() {
  loading.value = true
  errorMsg.value = ''
  try {
    const res = await fetch(API_BASE, {
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders()
      }
    })
    if (!res.ok) throw new Error(`fetch failed: ${res.status}`)
    const data = await res.json()

    presidents.value = data.filter(
      (item) =>
        item.status === 'active' &&
        (item.role.includes('회장') || item.role.includes('부회장'))
    )

    staffs.value = data.filter(
      (item) =>
        item.status === 'active' &&
        item.role.includes('운영진')
    )

    historyPresident.value = data.filter(
      (item) => item.status === 'retired'
    )
  } catch (e) {
    console.error(e)
    errorMsg.value = '스태프 데이터를 불러오는 중 오류가 발생했습니다.'
  } finally {
    loading.value = false
  }
}


async function createStaff(payload) {
  const res = await fetch(import.meta.env.VITE_STAFF_ADD_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('adminToken')}`,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'create failed');
  }
  return res.json();
}

async function updateStaff(id, payload) {
  const res = await fetch(import.meta.env.VITE_STAFF_UPDATE_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('adminToken')}`,
    },
    body: JSON.stringify({ id, ...payload }),
  });
  if (!res.ok) throw new Error('update failed');
  return res.json();
}

async function deleteStaff(id) {
  const res = await fetch(import.meta.env.VITE_STAFF_DELETE_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${sessionStorage.getItem('adminToken')}`,
    },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) throw new Error('delete failed');
  return res.json();
}

/**
 * Modal actions
 */
function openCreate(group) {
  targetGroup.value = group
  targetIndex.value = -1
  isCreate.value = true
  resetForm()
  // group별 기본 status 지정(역대 추가한다면 retired)
  form.status = group === 'historyPresident' ? 'retired' : 'active'
  showModal.value = true
}

function openEdit(group, index) {
  targetGroup.value = group
  targetIndex.value = index
  isCreate.value = false
  const list = getList(group)
  resetForm()
  Object.assign(form, list[index])
  showModal.value = true
}

async function remove(group, index) {
  const list = getList(group)
  if (!list) return
  const item = list[index]

  if (confirm('정말 삭제하시겠습니까?')) {
    try {
      await deleteStaff(item.id)
      await fetchStaffData()
    } catch (e) {
      console.error(e)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }
}

async function save() {
  try {
    const payload = { ...form }
    if (isCreate.value) {
      await createStaff(payload)
    } else {
      await updateStaff(form.id, payload)
    }
    await fetchStaffData()
    closeModal()
  } catch (e) {
    console.error(e)
    alert('저장 중 오류가 발생했습니다.')
  }
}

function closeModal() {
  showModal.value = false
}

function resetForm() {
  form.id = null
  form.name = ''
  form.role = ''
  form.photo = ''
  form.bio = ''
  form.status = 'active'
}

function getList(group) {
  if (group === 'presidents') return presidents.value
  if (group === 'staffs') return staffs.value
  if (group === 'historyPresident') return historyPresident.value
  return null
}


</script>

<template>
  <!-- Section Header -->
  <section class="bg-[#1a2238] py-10 bg-gradient-to-br from-primary/10 to-secondary/10">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-[40px] sm:text-[56px] text-white tracking-tight">
        Staff Management
      </h1>
      <p class="text-gray-300 mt-2">운영진 및 회장단 관리</p>
    </div>
  </section>

  <section class="bg-[#0f131c] text-white py-16 px-6">
    <div class="max-w-6xl mx-auto space-y-12">

      <!-- 로딩/에러 -->
      <div v-if="loading" class="text-center text-gray-400">불러오는 중...</div>
      <div v-if="errorMsg" class="text-center text-red-400">{{ errorMsg }}</div>

      <!-- 회장단 -->
      <div v-if="!loading">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold border-b border-gray-600 pb-2">회장단</h2>
          <button class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold"
            @click="openCreate('presidents')">
            + 회장단 추가
          </button>
        </div>

        <div class="overflow-x-auto rounded-lg border border-gray-700">
          <table class="min-w-full text-sm">
            <thead class="bg-[#1a1f2c] text-gray-300">
              <tr>
                <th class="px-4 py-3 text-left">사진</th>
                <th class="px-4 py-3 text-left">이름</th>
                <th class="px-4 py-3 text-left">직책</th>
                <th class="px-4 py-3 text-left">소개</th>
                <th class="px-4 py-3 text-right">작업</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(member, idx) in presidents" :key="member.id"
                class="border-t border-gray-700 hover:bg-gray-800">
                <td class="px-4 py-3">
                  <img :src="member.photo || 'https://placehold.co/60x60?text=Photo'"
                    class="w-12 h-12 rounded-full object-cover" alt="profile" />
                </td>
                <td class="px-4 py-3">{{ member.name }}</td>
                <td class="px-4 py-3">{{ member.role }}</td>
                <td class="px-4 py-3 whitespace-pre-line">{{ member.bio }}</td>
                <td class="px-4 py-3 text-right space-x-2">
                  <button class="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs"
                    @click="openEdit('presidents', idx)">
                    수정
                  </button>
                  <button class="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs"
                    @click="remove('presidents', idx)">
                    삭제
                  </button>
                </td>
              </tr>
              <tr v-if="presidents.length === 0">
                <td class="px-4 py-6 text-center text-gray-400" colspan="5">
                  데이터가 없습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 운영진 -->
      <div v-if="!loading">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold border-b border-gray-600 pb-2">운영진</h2>
          <button class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-semibold"
            @click="openCreate('staffs')">
            + 운영진 추가
          </button>
        </div>

        <div class="overflow-x-auto rounded-lg border border-gray-700">
          <table class="min-w-full text-sm">
            <thead class="bg-[#1a1f2c] text-gray-300">
              <tr>
                <th class="px-4 py-3 text-left">사진</th>
                <th class="px-4 py-3 text-left">이름</th>
                <th class="px-4 py-3 text-left">직책</th>
                <th class="px-4 py-3 text-left">소개</th>
                <th class="px-4 py-3 text-right">작업</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(member, idx) in staffs" :key="member.id" class="border-t border-gray-700 hover:bg-gray-800">
                <td class="px-4 py-3">
                  <img :src="member.photo || 'https://placehold.co/60x60?text=Photo'"
                    class="w-12 h-12 rounded-full object-cover" alt="profile" />
                </td>
                <td class="px-4 py-3">{{ member.name }}</td>
                <td class="px-4 py-3">{{ member.role }}</td>
                <td class="px-4 py-3 whitespace-pre-line">{{ member.bio }}</td>
                <td class="px-4 py-3 text-right space-x-2">
                  <button class="bg-green-600 hover:bg-green-700 px-2 py-1 rounded text-xs"
                    @click="openEdit('staffs', idx)">
                    수정
                  </button>
                  <button class="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs" @click="remove('staffs', idx)">
                    삭제
                  </button>
                </td>
              </tr>
              <tr v-if="staffs.length === 0">
                <td class="px-4 py-6 text-center text-gray-400" colspan="5">
                  데이터가 없습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 역대 회장단 -->
      <div v-if="!loading">
        <h2 class="text-2xl font-bold border-b border-gray-600 pb-2 mb-6">
          역대 회장단
        </h2>
        <div class="overflow-x-auto rounded-lg border border-gray-700">
          <table class="min-w-full text-sm">
            <thead class="bg-[#1a1f2c] text-gray-300">
              <tr>
                <th class="px-4 py-3 text-left">사진</th>
                <th class="px-4 py-3 text-left">이름</th>
                <th class="px-4 py-3 text-left">직책</th>
                <th class="px-4 py-3 text-left">소개</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member in historyPresident" :key="member.id"
                class="border-t border-gray-700 hover:bg-gray-800">
                <td class="px-4 py-3">
                  <img :src="member.photo || 'https://placehold.co/60x60?text=Photo'"
                    class="w-12 h-12 rounded-full object-cover" alt="profile" />
                </td>
                <td class="px-4 py-3">{{ member.name }}</td>
                <td class="px-4 py-3">{{ member.role }}</td>
                <td class="px-4 py-3 whitespace-pre-line">{{ member.bio }}</td>
              </tr>
              <tr v-if="historyPresident.length === 0">
                <td class="px-4 py-6 text-center text-gray-400" colspan="4">
                  데이터가 없습니다.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </section>

  <!-- 모달 -->
  <teleport to="body">
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="absolute inset-0 bg-black/60" @click="closeModal"></div>

      <div class="relative bg-[#1a1f2c] w-full max-w-lg rounded-lg p-6 shadow-xl">
        <h3 class="text-xl font-bold mb-4 text-white">
          {{ isCreate ? '추가' : '수정' }}
        </h3>

        <div class="space-y-4">
          <div>
            <label class="block text-sm text-gray-300 mb-1">이름</label>
            <input v-model="form.name" type="text"
              class="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" />
          </div>
          <div>
            <label class="block text-sm text-gray-300 mb-1">직책</label>
            <select v-model="form.role" type="text"
              class="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white">
              <option value="회장">회장</option>
              <option value="부회장">부회장</option>
              <option value="운영진">운영진</option>
            </select>
          </div>

          <div>
            <label class="block text-sm text-gray-300 mb-1">소개</label>
            <textarea v-model="form.bio" rows="3"
              class="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"></textarea>
          </div>

          <div>
            <label class="block text-sm text-gray-300 mb-1">사진 URL</label>
            <input v-model="form.photo" type="text"
              class="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white" />
          </div>

          <div>
            <label class="block text-sm text-gray-300 mb-1">상태</label>
            <select v-model="form.status"
              class="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white">
              <option value="active">active (현직)</option>
              <option value="retired">retired (역대)</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end mt-6 space-x-2">
          <button class="px-4 py-2 rounded bg-gray-600 hover:bg-gray-700 text-sm text-white" @click="closeModal">
            취소
          </button>
          <button class="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-sm text-white" @click="save">
            저장
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
