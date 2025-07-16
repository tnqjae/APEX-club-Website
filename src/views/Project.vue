<template>
  <!-- Section Header -->
  <section class="bg-[#1a2238] py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-[48px] sm:text-[64px] text-white tracking-tight">
        Projects
      </h1>
    </div>
  </section>

  <!-- Project Cards Section -->
  <section class="bg-[#0f131c] text-white py-20 px-4">
    <div class="max-w-6xl mx-auto space-y-20">

      <!-- Active Projects -->
      <div>
        <h2 class="text-2xl font-bold mb-6">Active Projects</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-[#1e2633] border border-gray-700 rounded-xl p-6 shadow-md">
            <span class="text-xs font-medium text-green-400 bg-green-900 px-2 py-1 rounded-full">Active</span>
            <h3 class="text-xl font-semibold mt-3 mb-1">Club Web Site Project</h3>
            <p class="text-sm text-gray-300">Club Website</p>
            <p class="text-gray-400 text-sm mt-2">
              Developing Club Website
            </p>
            <div class="flex flex-wrap gap-4 text-sm mt-4 text-gray-400">
              <span>👥 3 researchers</span>
              <span>⏱️ 2025.06</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Projects -->
      <div>
        <h2 class="text-2xl font-bold mb-6">Upcoming Projects</h2>
        <div class="bg-[#1e2633] border border-gray-700 rounded-xl p-6 shadow-md">
          <span class="text-xs font-medium text-yellow-400 bg-yellow-900 px-2 py-1 rounded-full">Planning</span>
          <h3 class="text-xl font-semibold mt-3 mb-1">Quantum Machine Learning</h3>
          <p class="text-sm text-gray-300">Exploring quantum algorithms for ML applications</p>
          <p class="text-gray-400 text-sm mt-2">
            Investigating quantum computing to accelerate machine learning algorithms and solve complex optimization problems.
          </p>
          <div class="flex flex-wrap gap-4 text-sm mt-4 text-gray-400">
            <span>👥 2 researchers</span>
            <span>⏱️ 2024–2026</span>
          </div>
        </div>
      </div>

      <!-- Completed Projects -->
      <div>
        <h2 class="text-2xl font-bold mb-6">Completed Projects</h2>
        <div class="bg-[#1e2633] border border-gray-700 rounded-xl p-6 shadow-md">
          <span class="text-xs font-medium text-gray-300 bg-gray-700 px-2 py-1 rounded-full">Completed</span>
          <h3 class="text-xl font-semibold mt-3 mb-1">Dummy Project</h3>
          <p class="text-sm text-gray-300">test</p>
          <p class="text-gray-400 text-sm mt-2">
            Test
          </p>
          <div class="flex flex-wrap gap-4 text-sm mt-4 text-gray-400">
            <span>👥 5 researchers</span>
            <span>⏱️ 2021–2023</span>
          </div>
        </div>
      </div>
    </div>

    <div>
        <h2 class="text-2xl font-bold mt-20 mb-6 border-b border-gray-600 pb-2">Publications</h2>
        <ul class="list-disc list-inside text-gray-300 space-y-2">
          <li>Lee SooBeom, Jung Sungmin(2025). "Evaluating the Applicability of a Spiking Neural Network-Based 3D U-Net in the Medical Domain". ASK2025</li>
        </ul>
    </div>
  </section>
</template>