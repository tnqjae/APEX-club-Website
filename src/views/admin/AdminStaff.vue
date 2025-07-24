<template>
  <div class="text-white p-6">
    <h1 class="text-2xl font-bold">Admin Staff Page</h1>
    <p>추후 구현 예정입니다.</p>
  </div>
</template>

<script setup>
import { SearchSlash } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const token = sessionStorage.getItem('adminToken')
const isAuthorized = ref(false)

onMounted(async () => {
  if (!token) {
    alert("관리자 권한이 없습니다. 로그인 해주세요.")
    return
  }

  try {
    const res = await fetch(import.meta.env.VITE_ADVERIFY_URL, {
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
    router.push('/adminStaff')
  }
})
</script>