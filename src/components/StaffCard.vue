<template>
  <div class="flex flex-col md:flex-row items-center gap-6 p-8 border-b border-gray-700 last:border-none">
    <img :src="photo" alt="Profile" class="w-32 h-32 object-cover rounded-full border-2 border-gray-600" />
    <div class="text-left">
      <h3 class="text-xl font-bold text-white">{{ name }}</h3>
      <p class="text-sm text-blue-400 mb-2">{{ role }}</p>
      <p class="text-gray-300 text-sm">{{ bio }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  role: String,
  photo: String,
  bio: String
})
</script>
