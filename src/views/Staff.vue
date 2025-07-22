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
      <div class="bg-[#1a1f2c] border border-gray-700 rounded-2xl shadow-2xl overflow-hidden mb-20">
        <div class="grid md:grid-cols-2">
          <StaffCard
            v-for="member in presidents"
            :key="member.name"
            :member="member"
          />
        </div>
      </div>

      <!-- 운영진 섹션 -->
      <h2 class="text-2xl font-bold mt-12 mb-8 border-b border-gray-600 pb-3">운영진</h2>
      <div class="bg-[#1a1f2c] border border-gray-700 rounded-2xl shadow-2xl overflow-hidden mb-20">
        <div class="grid md:grid-cols-2">
          <StaffCard
            v-for="member in staffs"
            :key="member.name"
            :member="member"
          />
        </div>
      </div>

      <!-- 역대 회장단 -->
      <h2 class="text-2xl font-bold mt-12 mb-8 border-b border-gray-600 pb-3">
        역대 회장단
      </h2>
      <div class="bg-[#1a1f2c] border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
        <div class="grid md:grid-cols-2">
          <StaffCard
            v-for="member in historyPresident"
            :key="member.name"
            :member="member"
          />
        </div>
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

    presidents.value = data.filter(member => member.role.includes('회장') && member.active)
    staffs.value = data.filter(member => member.role === '운영진' && member.active)
    historyPresident.value = data.filter(member => member.active === 0)
  } catch (err) {
    console.error('Staff API fetch failed:', err)
  }
})
</script>