<template>
  <!-- Section Header -->
  <section class="bg-[#1a2238] py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-[48px] sm:text-[64px] text-white tracking-tight">
        Staff
      </h1>
    </div>
  </section>

  <!-- Staff Sections -->
  <section class="bg-[#0f131c] text-white py-24 px-6">
    <div class="max-w-5xl mx-auto">

      <!-- 회장단 섹션 -->
      <h2 class="text-2xl font-bold mt-16 mb-8 border-b border-gray-600 pb-3">회장단</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <StaffCard
          v-for="member in presidents"
          :key="member.id"
          :member="member"
        />
      </div>

      <!-- 운영진 섹션 -->
      <h2 class="text-2xl font-bold mt-12 mb-8 border-b border-gray-600 pb-3">운영진</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
        <StaffCard
          v-for="member in staffs"
          :key="member.id"
          :member="member"
        />
      </div>

      <!-- 역대 회장단 -->
      <h2 class="text-2xl font-bold mt-12 mb-8 border-b border-gray-600 pb-3">
        역대 회장단
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <StaffCard
          v-for="member in historyPresident"
          :key="member.id"
          :member="member"
        />
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import StaffCard from '@/components/StaffCard.vue'

const presidents = ref([])
const staffs = ref([])
const historyPresident = ref([])

onMounted(async () => {
  try {
    const res = await fetch(import.meta.env.VITE_STAFF_API)
    const data = await res.json()

    presidents.value = data.filter(m => m.status === 'active' && (m.role === '회장' || m.role === '부회장'))
    staffs.value = data.filter(m => m.status === 'active' && m.role === '운영진')
    historyPresident.value = data.filter(m => m.status === 'retired')
  } catch (err) {
    console.error('Staff API fetch failed:', err)
  }
})
</script>
