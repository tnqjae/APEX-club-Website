<template>
  <div
    class="flex items-center gap-6 p-6 border border-gray-700 rounded-xl bg-[#1a1f2c] shadow-md transition"
    :class="{ 'opacity-50': member.status === 'retired' }"
  >
    <img
      :src="member.photo"
      alt="Profile"
      class="w-24 h-24 object-cover rounded-full border-2 border-gray-600"
    />
    <div class="text-left">
      <h3 class="text-lg font-bold text-white">{{ member.name }}</h3>
      <p
        class="text-sm font-semibold mb-1"
        :class="{
          'text-blue-400': member.role === '회장',
          'text-yellow-300': member.role === '부회장',
          'text-green-400': member.role === '운영진'
        }"
      >
        {{ member.role }}
      </p>
      <p class="text-gray-300 text-sm">{{ member.bio }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  member: Object
})
</script>
