<template>
  <!-- Section Header -->
  <section class="bg-[#1a2238] py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
    <div class="container mx-auto px-4 text-center">
      <h1 class="text-[48px] sm:text-[64px] text-white tracking-tight">Projects</h1>
    </div>
  </section>

  <!-- Project Cards Section -->
  <section class="bg-[#0f131c] text-white py-20 px-4">
    <div class="max-w-6xl mx-auto space-y-20">
      
      <!-- 각 상태별 그룹 렌더링 -->
      <div v-for="(title, statusKey) in statusMap" :key="statusKey">
        <h2 class="text-2xl font-bold mb-6">{{ title }}</h2>
        <div class="grid md:grid-cols-2 gap-8">
          <ProjectCard
            v-for="project in filteredProjects(statusKey)"
            :key="project.id"
            :status="project.status"
            :title="project.title"
            :description="project.description"
            :category="project.category"
            :participants="project.participants"
            :date="project.date"
            :techStack="project.tech_stack"
            :tags="project.tags"
            :link="project.link"
            :supervisor="project.supervisor"
            :isTeamProject="project.is_team_project"
          />
        </div>
      </div>
    </div>

    <!-- Publication Section -->
    <div class="max-w-6xl mx-auto mt-20">
      <h2 class="text-2xl font-bold mb-6 border-b border-gray-600 pb-2">Publications</h2>
      <ul class="list-disc list-inside text-gray-300 space-y-2">
        <li>
          Lee SooBeom, Jung Sungmin (2025).
          <i>"Evaluating the Applicability of a Spiking Neural Network-Based 3D U-Net in the Medical Domain"</i>.
          ASK2025
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProjectCard from '@/components/ProjectCard.vue'

const projects = ref([])

const statusMap = {
  Active: 'Active Projects',
  Planning: 'Upcoming Projects',
  Completed: 'Completed Projects'
}

const filteredProjects = (status) => {
  return projects.value.filter(p => p.status === status)
}

onMounted(async () => {
  try {
    const res = await fetch('https://apexadmin.dothome.co.kr/projectAPI.php')
    const data = await res.json()
    projects.value = data
  } catch (error) {
    console.error('프로젝트 불러오기 실패:', error)
  }
})
</script>
