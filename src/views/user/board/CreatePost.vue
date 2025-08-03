<template>
    <!-- Section Header -->
    <section class="bg-[#1a2238] py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div class="container mx-auto px-4 text-center">
            <h1 class="text-[36px] sm:text-[64px] text-white tracking-tight">
                게시판 글 작성
            </h1>
        </div>
    </section>

    <!-- Team Sections -->
    <section class="bg-[#0f131c] min-h-screen text-white py-20 px-4">
    </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  const token = sessionStorage.getItem('userToken')
  if (!token) {
    alert('동아리 회원만 작성 가능합니다.')
    router.push('/projectboard')
    return
  }

  try {
    const response = await axios.get(import.meta.env.VITE_USER_AUTH_API, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.data.success !== true) {
      alert('동아리 회원만 작성 가능합니다.')
      router.push('/projectboard')
    }
  } catch (error) {
    alert('동아리 회원만 작성 가능합니다.')
    router.push('/projectboard')
  }
})
</script>
