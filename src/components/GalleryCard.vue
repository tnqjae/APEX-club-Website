<template>
  <div
    class="cursor-pointer flex items-center gap-6 p-6 border border-gray-700 rounded-xl bg-[#1a1f2c] shadow-md hover:bg-[#2a2f3a] transition"
    @click="$emit('open', gallery)"
  >
    <img
      :src="`/Gallery/${gallery.folder_name}/${gallery.represent_image}`"
      alt="대표 이미지"
      class="w-24 h-24 object-cover rounded-md border-2 border-gray-600"
    />
    <div class="text-left">
      <h3 class="text-lg font-bold text-white">{{ gallery.title }}</h3>
      <p class="text-gray-200 text-sm">{{ gallery.description }}</p>
      <p class="text-gray-400 text-sm">{{ gallery.created_at }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({ gallery: Object })
defineEmits(['open'])
</script>