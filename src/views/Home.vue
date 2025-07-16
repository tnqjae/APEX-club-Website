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
        Notification
      </h1>
      <div class="max-w-3xl w-full">
        <ol class="text-white text-base text-center sm:text-lg space-y-4 list-decimal list-inside sm:pl-6 px-2">
          <li>
            We are no longer looking for new members.
          </li>
          <li>
            To apply, please fill out the form:
            <a
              href="#"
              target="_blank"
              rel="noopener"
              class="text-blue-500 hover:underline break-all"
            >
              APEX Club Application Form
            </a>
          </li>
        </ol>
      </div>
    </section>

    <section class="bg-[#0f131c] flex flex-col items-center py-12 px-4 sm:py-10">
      <div class="mx-auto px-4 text-center max-w-4xl mt-10">
        <h2 class="text-white text-3xl font-bold mb-6">Welcome to Our Research Lab</h2>
        <p class="text-white text-lg text-muted-foreground mb-8 leading-relaxed">
          Our laboratory is dedicated to advancing the frontiers of computer science through cutting-edge research
          in artificial intelligence, machine learning, and emerging technologies.
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

<style scoped>
</style>
