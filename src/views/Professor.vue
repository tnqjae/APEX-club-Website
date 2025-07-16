<template>
  <!-- Section Header -->
  <section class="bg-[#1a2238] py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-[48px] sm:text-[64px] text-white tracking-tight">
        Professor
      </h1>
    </div>
  </section>

  <!-- Professor Info Card -->
  <section class="bg-[#0f131c] min-h-screen text-white py-20 px-4">
    <div class="max-w-5xl mx-auto bg-[#1a1f2c] border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
      <div class="grid md:grid-cols-2">

        <!-- Left: Profile Summary -->
        <div class="bg-[#223044] flex flex-col items-center text-center px-8 py-12 space-y-4">
          <div class="w-32 h-32 rounded-full overflow-hidden border-4 border-[#4174D9]">
            <img
              src="https://placehold.co/150x150?text=Photo"
              alt="Professor"
              class="w-full h-full object-cover"
            />
          </div>
          <h2 class="text-2xl font-bold">Dr. Sarah Chen</h2>
          <p class="text-gray-300">Professor of Computer Science</p>
          <p class="text-sm text-gray-400">Ph.D. Computer Science, MIT</p>
          <p class="text-sm text-gray-400">15+ years of research experience</p>
          <p class="text-sm text-gray-400">50+ published papers</p>
          <p class="text-sm text-gray-400">
            Email: <a href="mailto:s.chen@university.edu" class="text-blue-400 hover:underline">s.chen@university.edu</a>
          </p>
          <p class="text-sm text-gray-400">Room 305, CS Building</p>
        </div>

        <!-- Right: Details -->
        <div class="px-10 py-12 space-y-10">
          <!-- Research Interests -->
          <div>
            <h3 class="text-xl font-semibold mb-3">Research Interests</h3>
            <ul class="grid grid-cols-2 gap-y-2 text-sm text-gray-300">
              <li class="flex items-center gap-2">💡 Artificial Intelligence</li>
              <li class="flex items-center gap-2">💡 Cyber Security</li>
              <li class="flex items-center gap-2">💡 Forensic</li>
            </ul>
          </div>

          <!-- Biography -->
          <div>
            <h3 class="text-xl font-semibold mb-3">Biography</h3>
            <p class="text-gray-400 text-sm leading-relaxed">
              Dr. Sarah Chen is a leading expert in cyber security and AI, combining years of academic research with real-world applications. Her interdisciplinary approach connects machine learning with forensic analysis and privacy technologies.
            </p>
          </div>

          <!-- Education -->
          <div>
            <h3 class="text-xl font-semibold mb-3">Education</h3>
            <ul class="text-sm text-gray-300 space-y-1">
              <li><strong>Ph.D. Computer Science</strong> – Massachusetts Institute of Technology</li>
              <li><strong>M.S. Cybersecurity</strong> – Stanford University</li>
              <li><strong>B.S. Computer Engineering</strong> – UC Berkeley</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
