<template>
  <div class="min-h-screen bg-background">
    <Navigation />
    <!-- Hero Section -->
    <section class="bg-[#1a2238] pt-15 pb-5 bg-gradient-to-br from-primary/10 to-secondary/10">
      <div class="container mx-auto px-4 text-center">
        <img src="/src/assets/HeroImg/MainTitle.png" alt="Main HeroImg" class="mx-auto mb-8 max-w-xs sm:max-w-md md:max-w-lg" />
      
        <ul class="text-white pt-10 text-xl text-center max-w-3xl mx-auto">
          <li>Department of Computer Security Engineering</li>
          <li>School of AI and Software Convergence</li>
          <li>Myongji College</li>
        </ul>
      </div>
    </section>

    <!-- Notification Section -->
    <section class="bg-[#0f131c] flex flex-col items-center py-12 px-4 sm:py-10">
      <h1 class="text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-10 mt-1 text-center">
        공지사항
      </h1>
      <div class="max-w-3xl w-full">
        <ol class="text-white text-base text-center sm:text-lg space-y-4 list-decimal list-inside sm:pl-6 px-2">
          <li>
            이번 학기에는 신입 부원을 모집하지 않습니다. 지원하실 분은 다음 학기에 지원해주세요.
          </li>
          <li>
            지원을 원하시는 분은 구글 폼을 통해 지원서를 제출해주시면 됩니다.:
            <a
              href="#"
              target="_blank"
              rel="noopener"
              class="text-blue-500 hover:underline break-all"
            >
              APEX 동아리 지원서
            </a>
          </li>
        </ol>
      </div>
    </section>

    <section class="bg-[#0f131c] flex flex-col items-center py-12 px-4 sm:py-10">
      <div class="mx-auto px-4 text-center max-w-4xl mt-10">
        <h2 class="text-white text-3xl font-bold mb-6">Welcome to APEX Club</h2>
        <p class="text-white text-lg text-muted-foreground mb-8 leading-relaxed">
          우리 동아리는 A.I. / 보안 / 포렌식에 대해 공부하는 동아리입니다. 다양한 프로젝트를 통해 학습하며, 학술대회도 참가합니다.
        </p>
      </div>
    </section>



    <!-- Footer -->
    <footer class="bg-[#0f131c] bgborder-t py-8">
      <div class="bg-[#0f131c] container mx-auto px-4">
        <div class="text-white text-center text-sm text-muted-foreground">© 2025 Apex. All rights reserved.</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import HeroSection from '@/components/HeroSection.vue'
</script>
