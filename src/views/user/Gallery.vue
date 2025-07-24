<template>
  <section class="bg-[#1a2238] py-20 bg-gradient-to-br">
    <div class="text-[50px] text-center text-white">Gallery</div>
  </section>

  <section class="bg-[#0f131c] min-h-screen text-white py-20 px-4">
    <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
      <GalleryCard
        v-for="item in galleries"
        :key="item.id"
        :gallery="item"
        @open="selected = item"
      />
    </div>
  </section>

  <!-- 모달 창 -->
  <div
    v-if="selected"
    class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
    @click.self="selected = null"
  >
    <div class="bg-[#1a1f2c] max-w-4xl w-full p-8 rounded-xl shadow-2xl overflow-y-auto max-h-[90vh]">
      <h2 class="text-xl text-white font-bold mb-4">{{ selected.title }}</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <img
          v-for="img in selected.images"
          :key="img"
          :src="`/Gallery/${selected.folder_name}/${img}`"
          class="rounded-lg border border-gray-600 object-cover"
        />
      </div>
      <button @click="selected = null" class="mt-6 text-blue-400 hover:underline">닫기</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import GalleryCard from '@/components/GalleryCard.vue'

const galleries = ref([])
const selected = ref(null)

onMounted(async () => {
  const res = await fetch(import.meta.env.VITE_GALLERY_API)
  const data = await res.json()
  galleries.value = data
})
</script>
