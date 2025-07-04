<template>
  <HeroSection image-src="src\assets\HeroImg\ProfHeroImg.jpg" alt-text="Professor Hero Img"/>
  <section class="bg-[#0f131c] min-h-screen text-white py-20 px-4">
    <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">

      <!-- 프로필 이미지 -->
      <div class="w-40 h-40 rounded-full overflow-hidden border-4 border-[#4174D9]">
        <img src="#" alt="Professor" class="w-full h-full object-cover" />
      </div>

      <!-- 정보 블록 -->
      <div class="flex-1 space-y-4">
        <h2 class="text-3xl font-bold">Prof. </h2>
        <p class="text-lg text-gray-300">
          Professor, Dept. of Computer Security, Myongji College
        </p>
        <p class="text-base text-gray-400">
         Research
        </p>
        <p class="text-base text-gray-400">
          Email: <a href="xxx@xxx.com" class="text-blue-400 hover:underline">kim@example.com</a>
        </p>
        <p class="text-base text-gray-400">
          Ph.D.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import HeroSection from '@/components/HeroSection.vue';
</script>