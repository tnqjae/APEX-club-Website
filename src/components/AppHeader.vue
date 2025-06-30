<script setup>
import { ref } from 'vue'
const isOpen = ref(false)
</script>

<template>
  <header
    class="fixed top-0 left-0 w-full h-16 px-6 bg-transparent
         flex items-center justify-between z-50"
  >
    <!-- 로고 -->
    <h1 class="text-white text-2xl font-semibold whitespace-nowrap">APEX</h1>

    <!-- 모바일 메뉴 버튼 -->
    <button
      class="md:hidden text-white text-3xl focus:outline-none"
      @click="isOpen = !isOpen"
    >
      ☰
    </button>

    <!-- 데스크톱 메뉴 -->
    <nav class="hidden md:flex">
      <ul class="flex gap-8 list-none m-0 p-0">
        <li
          v-for="item in ['Home','Professor','Team','Student','Project', 'Gallery']"
          :key="item"
          class="text-white text-base cursor-pointer transition-colors
                 duration-200 hover:text-[#4174D9] whitespace-nowrap"
        >
          {{ item }}
        </li>
      </ul>
    </nav>
  </header>

  <!-- 모바일 드롭다운 메뉴 -->
  <transition name="fade">
    <nav
      v-if="isOpen"
      class="md:hidden fixed top-16 left-0 w-full bg-black/90 backdrop-blur
             p-6 space-y-4 z-40"
    >
      <ul>
        <li
          v-for="item in ['Home','Professor','Team','Student','Project','Contact']"
          :key="item"
          class="text-white text-lg py-1 border-b border-white/10
                 hover:text-[#4174D9] cursor-pointer"
          @click="isOpen=false"
        >
          {{ item }}
        </li>
      </ul>
    </nav>
  </transition>
</template>

<style scoped>
/* 간단한 fade 효과 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>